pipeline {
    agent any

    environment {
        REGION = 'ap-northeast-2'
        FRONT_IMAGE_NAME = '339713037008.dkr.ecr.ap-northeast-2.amazonaws.com/logi_front'
        ECR_PATH = '339713037008.dkr.ecr.ap-northeast-2.amazonaws.com'
        AWS_CREDENTIAL_NAME = 'aws-key'
    }

    stages {
        stage('Pull Codes from Github') {
            steps {
                checkout scm
            }
        }
    
        // AWS EKS 클러스터에 로그인
        stage('Update Kubeconfig') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-key']]) {
                        bat '''
                        aws eks update-kubeconfig --region %REGION% --name test-eks-cluster
                        '''
                    }
                }
            }
        }

        // 서비스 URL을 가져와서 .env 파일 업데이트
        stage('Get Backend Service URL and Update .env') {
            steps {
                script {
                    // 백엔드 서비스의 URL 가져오기
                    def backend_service_url = powershell(script: "kubectl get service backend-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'", returnStdout: true).trim()

                    // .env 파일의 API URL 업데이트
                    bat """
                    powershell -Command "(Get-Content 'E:/docker_dev/logi_react_front_cloud/.env') -replace 'REACT_APP_DOCKER_API_URL=.*', 'REACT_APP_DOCKER_API_URL=http://$backend_service_url:9102' | Set-Content 'E:/docker_dev/logi_react_front_cloud/.env'"
                    """
                }
            }
        }

        // 프론트엔드 Docker 이미지 빌드 및 ECR 푸시
        stage('Build and Push Frontend Docker Image') {
            steps {
                dir('E:/docker_dev/logi_react_front_cloud') { 
                    script {
                        bat """
                        docker build -t ${FRONT_IMAGE_NAME}:latest .
                        docker push ${FRONT_IMAGE_NAME}:latest
                        """
                    }
                }
            }
        }

        // 프론트엔드 디플로이먼트 적용
        stage('Apply Frontend Deployment') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-key']]) {
                        bat 'kubectl apply -f E:/docker_Logi/logi-front-deployment.yaml'
                    }
                }
            }
        }
    }
}
