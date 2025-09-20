pipeline {
    agent any
    environment {
        GH_TOKEN = credentials('GH_TOKEN')
        GH_USER = credentials('GH_USER')
    }
    stages {
        stage('Init') {
            steps {
                bat 'bash scripts/init.sh'
            }
        }
        stage('Build') {
            parallel {
                stage('Security') {
                    steps {
                        bat 'bash scripts/security-check.sh'
                    }
                }
                stage('Quality') {
                    steps {
                        bat 'bash scripts/code-quality.sh'
                    }
                }
                stage('Package') {
                    steps {
                        bat 'bash scripts/package.sh'
                    }
                }
            }
        }
        stage('Validation') {
            steps {
                bat 'bash scripts/test.sh'
            }
        }
        stage('Deploy and push') {
            steps {
                bat 'bash scripts/deploy.sh'
            }
        }
    }
}
