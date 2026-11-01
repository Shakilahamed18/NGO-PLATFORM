
pipeline {
    agent any

    environment {
        MYSQLDATABASE = 'ngo_db'
        MYSQLUSER = 'ngo_user'
        DOCKER_HOST = 'npipe:////./pipe/dockerDesktopLinuxEngine'

        MYSQLPASSWORD = credentials('ngo-mysql-app-password')
        MYSQL_ROOT_PASSWORD = credentials('ngo-mysql-root-password')
        JWT_SECRET = credentials('ngo-jwt-secret')
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out NGO project from GitHub'
                checkout scm
            }
        }

        stage('Validate Docker Compose') {
            steps {
                echo 'Validating Docker configuration'
                bat 'docker compose config -q'
            }
        }

        stage('Verify Docker Engine Connection') {
    steps {
        echo 'Checking Docker Engine connection from Jenkins'
        bat 'docker info --format "{{.ServerVersion}}"'
    }
}

        stage('Run Backend Tests') {
    steps {
        echo 'Running backend tests and compiling Java classes'

        bat '''
        docker run --rm ^
          -v "%CD%\\ngo-project:/source" ^
          -w /source ^
          maven:3.9-eclipse-temurin-21 ^
          mvn -B clean verify
        '''
    }
}
        stage('SonarQube Analysis') {
    steps {
        echo 'Running SonarCloud analysis using Docker'

        withCredentials([
            string(
                credentialsId: 'sonarqube-token',
                variable: 'SONAR_TOKEN'
            )
        ]) {
            bat '''
            docker run --rm ^
              -e SONAR_HOST_URL=https://sonarcloud.io ^
              -e SONAR_TOKEN=%SONAR_TOKEN% ^
              -v "%CD%:/usr/src" ^
              -w /usr/src ^
              sonarsource/sonar-scanner-cli:latest ^
              -Dproject.settings=sonar-project.properties ^
              -Dsonar.java.binaries=ngo-project/target/classes
            '''
        }
    }
}


        stage('SonarCloud Quality Gate') {
    steps {
        echo 'Checking SonarCloud Quality Gate status'

        withCredentials([
            string(
                credentialsId: 'sonarqube-token',
                variable: 'SONAR_TOKEN'
            )
        ]) {
            powershell '''
                $ErrorActionPreference = "Stop"

                $reportFile = ".scannerwork/report-task.txt"

                if (!(Test-Path $reportFile)) {
                    throw "SonarCloud report-task.txt not found"
                }

                $properties = Get-Content $reportFile |
                    Where-Object { $_ -match "=" } |
                    ConvertFrom-StringData

                $ceTaskUrl = $properties["ceTaskUrl"]

                if (!$ceTaskUrl) {
                    throw "SonarCloud Compute Engine task URL not found"
                }

                $tokenBytes = [System.Text.Encoding]::ASCII.GetBytes(
                    $env:SONAR_TOKEN + ":"
                )

                $encodedToken = [Convert]::ToBase64String($tokenBytes)

                $headers = @{
                    Authorization = "Basic $encodedToken"
                }

                $task = $null

                for ($i = 1; $i -le 60; $i++) {
                    $taskResponse = Invoke-RestMethod `
                        -Uri $ceTaskUrl `
                        -Headers $headers

                    $task = $taskResponse.task

                    if ($task.status -eq "SUCCESS") {
                        break
                    }

                    if ($task.status -eq "FAILED" -or
                        $task.status -eq "CANCELED") {
                        throw "SonarCloud analysis failed: $($task.status)"
                    }

                    Write-Host "Waiting for SonarCloud analysis..."
                    Start-Sleep -Seconds 5
                }

                if ($task.status -ne "SUCCESS") {
                    throw "SonarCloud analysis timed out"
                }

                $analysisId = $task.analysisId

                $qualityUrl = "https://sonarcloud.io/api/qualitygates/project_status?analysisId=$analysisId"

                $qualityResponse = Invoke-RestMethod `
                    -Uri $qualityUrl `
                    -Headers $headers

                $gateStatus = $qualityResponse.projectStatus.status

                Write-Host "SonarCloud Quality Gate: $gateStatus"

                if ($gateStatus -ne "OK") {
                    throw "SonarCloud Quality Gate failed: $gateStatus"
                }

                Write-Host "SonarCloud Quality Gate passed!"
            '''
        }
    }
}

        stage('Build Docker Images') {
            steps {
                echo 'Building NGO application Docker images'
                bat 'docker compose -p ngo-platform build backend frontend'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                echo 'Scanning NGO backend image for vulnerabilities'

                bat '''
                "C:\\ProgramData\\Trivy\\trivy.exe" image ^
                --scanners vuln ^
                --severity HIGH,CRITICAL ^
                --exit-code 1 ^
                ngo-platform-backend:latest
                '''

                echo 'Scanning NGO frontend image for vulnerabilities'

                bat '''
                "C:\\ProgramData\\Trivy\\trivy.exe" image ^
                --scanners vuln ^
                --severity HIGH,CRITICAL ^
                --exit-code 1 ^
                ngo-platform-frontend:latest
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying updated NGO application'

                bat 'docker compose -p ngo-platform up -d --no-deps backend frontend'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking NGO application containers'

                bat 'docker compose -p ngo-platform ps'

                echo 'Checking frontend availability'

                bat '''
                @echo off
                powershell -NoProfile -ExecutionPolicy Bypass -Command ^
                "$ready = $false; for ($i = 1; $i -le 12; $i++) { try { $r = Invoke-WebRequest -Uri 'http://localhost:3000/' -UseBasicParsing -TimeoutSec 5; if ($r.StatusCode -eq 200) { $ready = $true; Write-Host 'Frontend is responding'; break } } catch { }; Write-Host 'Waiting for frontend...'; Start-Sleep -Seconds 5 }; if (-not $ready) { Write-Error 'Frontend verification failed'; exit 1 }"
                '''

                echo 'Waiting for Spring Boot backend health'

                bat '''
                @echo off
                powershell -NoProfile -ExecutionPolicy Bypass -Command ^
                "$ready = $false; for ($i = 1; $i -le 18; $i++) { try { $r = Invoke-RestMethod -Uri 'http://localhost:8082/actuator/health' -TimeoutSec 5; if ($r.status -eq 'UP') { $ready = $true; Write-Host 'Backend is healthy'; break } } catch { }; Write-Host 'Backend not ready. Retrying in 5 seconds...'; Start-Sleep -Seconds 5 }; if (-not $ready) { Write-Error 'Backend did not become healthy'; exit 1 }"
                '''

                echo 'Checking Swagger UI'

                bat 'curl.exe -f http://localhost:8082/swagger-ui/index.html'

                echo 'All deployment verification checks passed!'
            }
        }
    }

    post {
        success {
            echo 'NGO Platform CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'NGO Platform CI/CD pipeline failed. Check the console output.'
        }
    }
}
