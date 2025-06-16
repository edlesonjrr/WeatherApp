pipeline {
    agent any
    environment {
        GH_TOKEN = credentials('GH_TOKEN')
        GH_USER = credentials('GH_USER')
    }
    stages {
        stage('Init') {
            steps {
                bat 'bash init.sh'
            }
        }
        stage('Build') {
            parallel {
                stage('Security') {
                    steps {
                        bat 'bash security-check.sh'
                    }
                }
                stage('Quality') {
                    steps {
                        bat 'bash code-quality.sh'
                    }
                }
                stage('Package') {
                    steps {
                        bat 'bash package.sh'
                    }
                }
            }
        }
        stage('Validation') {
            steps {
                bat 'bash test.sh'
            }
        }
        stage('Deploy') {
            steps {
                bat 'bash deploy.sh'
            }
        }
    }
}