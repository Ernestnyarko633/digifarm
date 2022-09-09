/**
* Jenkins Pipepline Script for deploying CF Digital Farmer Dashboard to Kubernetes Cluster
* @Author Peter Yefi
* @Created November 27 2020
**/

node {
    def app
    // initiate build for dev or master branch onley
    if (env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'master'){
        try{
            stage('Clone repository') {
                /* Let's make sure we have the repository cloned to our workspace */

                checkout scm
                //Copy .env file from workspace to project
                sh 'cp ../cf_digital_farmer_dashboard.env .'
                sh 'mv cf_digital_farmer_dashboard.env .env'
        
            }

            stage('SonarQube Analysis'){
                withSonarQubeEnv('Sonarqube'){
                    sh "sonar-scanner \
                        -Dsonar.projectKey=cf-digital-farmer-dashboard \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=${env.SONARQUBE_URL} \
                        -Dsonar.login=${env.SONAR_API_LOGIN}"
                    }
            }

            stage('Quality Gateway'){
                timeout(time: 1, unit: 'HOURS'){
                    def qualityGate = waitForQualityGate()
                    if (qualityGate.status != 'OK'){
                        error "Digital Farmer Dashboard: Pipeline aborted due to quality gate failure: ${qualityGate.status}"
                    }
                }
            }

            stage('Build image') {
                /**
                * Choose deployment environment variable for run command in dockerfile
                * based on branch triggering the build process
                */
                def run_environment = 'PROD'
            
                if (env.BRANCH_NAME == 'dev') {
                    run_environment = 'DEV'
                }
                /* This builds the actual image; synonymous to
                * docker build on the command line */
                app = docker.build("749165515165.dkr.ecr.us-east-2.amazonaws.com/cf-server", "--build-arg REACT_APP_ENVIRONMENT=${run_environment} .")
            }

            stage('Push image') {
                /* Finally, we'll push the image with tag of the current build number
                * Pushing multiple tags is cheap, as all the layers are reused.
                */
                docker.withRegistry('https://749165515165.dkr.ecr.us-east-2.amazonaws.com', 'ecr:us-east-2:cf-aws-credentials') {
                    app.push("digital-farmer-dashboard-build-${env.BUILD_NUMBER}")
                    app.push("digital-farmer-dashboard-latest")
            
                }
            }
            def deploy_stage_title = env.BRANCH_NAME == 'dev' ? 'Staging' : 'Production'
            stage("Deploy To ${deploy_stage_title} Environment") {
                /**
                * Deploy to production or staging environment when the job is 
                * triggered by either master of dev branch
                */
                def url =  "https://digitalfarmer.completefarmer.com"
                // chose kubernetes context to us
                sh 'kubectl config use-context eks_cf-frontend-eks-cluster'
                sh 'helm lint ./src/cf-helm/'
                if (env.BRANCH_NAME == 'master') {
                    sh "helm upgrade --install --wait --timeout 120s --recreate-pods --set image.tag=digital-farmer-dashboard-build-${env.BUILD_NUMBER} cf-digital-farmer-dashboard ./src/cf-helm/ -n=auth"   
                } else if (env.BRANCH_NAME == 'dev') {
                    url = "https://digitalfarmer-test.completefarmer.com"
                    sh "helm upgrade --install --wait --timeout 120s --recreate-pods --set image.tag=digital-farmer-dashboard-build-${env.BUILD_NUMBER} cf-digital-farmer-dashboard ./src/cf-helm/ -n=auth-stage"
                }
                //Send teams and slack notification
                slackSend(color: 'good', message: "DigiFarmer dashboard deployed at ${url}")
                office365ConnectorSend webhookUrl: "${env.TEAM_WEBHOOK}", status: 'Success', message: "DigiFarmer dashboard deployed at ${url}"
                //Remove dangling images
                sh 'docker system prune -f'
            }
        }catch(err){
           sh 'docker system prune -f'
           slackSend(color: '#F01717', message: "${err}")
           office365ConnectorSend webhookUrl: "${env.TEAM_WEBHOOK}", message: "${err}"
           error "Build Failed ${err}"
        }
    }
    
}
