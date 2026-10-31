
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

        stage('Build Docker Images') {
            steps {
                echo 'Building NGO frontend and backend images'
                bat 'docker compose build backend frontend'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying NGO application'
                bat 'docker compose up -d backend frontend'
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
