
pipeline {
    agent any

    environment {
        MYSQLDATABASE = 'ngo_db'
        MYSQLUSER = 'ngo_user'

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

        stage('Run Backend Tests') {
            steps {
                echo 'Running Spring Boot backend tests using H2'

                bat '''
                docker run --rm ^
                  -v "%CD%\\ngo-project:/source:ro" ^
                  -w /tmp ^
                  maven:3.9-eclipse-temurin-21 ^
                  sh -c "mkdir -p /tmp/ngo-project && cp /source/pom.xml /tmp/ngo-project/ && cp -r /source/src /tmp/ngo-project/ && cd /tmp/ngo-project && mvn -B test"
                '''
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
