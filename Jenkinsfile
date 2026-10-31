
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
        bat 'docker run --rm -v "%CD%\\ngo-project:/app" -w /app maven:3.9-eclipse-temurin-21 mvn -B test'
    }
}

        stage('Build Docker Images') {
            steps {
                echo 'Building NGO frontend and backend images'
                bat 'docker compose build backend frontend'
            }
        }

        stage('Deploy Application') {
    steps {
        echo 'Docker images built successfully.'
        echo 'Deployment will be configured separately.'
    }
}

        stage('Verify Deployment') {
            steps {
                echo 'Checking Docker containers'
                bat 'docker compose ps'
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
