pipeline {
    agent any

    stages {
        // Terraform을 사용해 클러스터 자원 관리
        stage('Terraform Apply') {
            steps {
                dir('E:/docker_dev/terraform-codes') {
                    script {
                        sh '''
                        terraform apply -auto-approve
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
                    def backend_service_url = sh(script: "kubectl get service backend-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'", returnStdout: true).trim()

                    // .env 파일의 API URL 업데이트
                    sh """
                    sed -i 's|REACT_APP_DOCKER_API_URL=.*|REACT_APP_DOCKER_API_URL=http://${backend_service_url}:9102|' E:/docker_dev/logi_react_front_cloud/.env
                    """
                }
            }
        }

        // 프론트엔드 Docker 이미지 빌드 및 ECR 푸시
        stage('Build and Push Frontend Docker Image') {
            steps {
                dir('E:/docker_dev/logi_react_front_cloud') { 
                    script {
                        sh """
                        docker build -t 339713037008.dkr.ecr.ap-northeast-2.amazonaws.com/logi_front:latest .
                        docker push 339713037008.dkr.ecr.ap-northeast-2.amazonaws.com/logi_front:latest
                        """
                    }
                }
            }
        }

        // 프론트엔드 디플로이먼트 적용
        stage('Apply Frontend Deployment') {
            steps {
                script {
                    sh 'kubectl apply -f E:/docker_Logi/logi-front-deployment.yaml'
                }
            }
        }
    }
}
