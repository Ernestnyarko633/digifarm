/**
* Jenkins Pipepline Script for deploying CF Digital Farmer Dashboard to Kubernetes Cluster
* @Author Peter Yefi
* @Created November 27 2020
**/

node {
    def app
    // initiate build for dev or master branch onley
        try{
            stage('Clone repository') {
                /* Let's make sure we have the repository cloned to our workspace */

                checkout scm
                //Copy .env file from workspace to project
                sh 'cp ../cf_digital_farmer_dashboard.env .'
                sh 'mv cf_digital_farmer_dashboard.env .env'
        
            }

            // stage('SonarQube Analysis'){
            //     withSonarQubeEnv('Sonarqube'){
            //         sh "sonar-scanner \
            //             -Dsonar.projectKey=cf-digital-farmer-dashboard \
            //             -Dsonar.sources=. \
            //             -Dsonar.host.url=${env.SONARQUBE_URL} \
            //             -Dsonar.login=${env.SONAR_API_LOGIN}"
            //         }
            // }

            // stage('Quality Gateway'){
            //     timeout(time: 1, unit: 'HOURS'){
            //         def qualityGate = waitForQualityGate()
            //         if (qualityGate.status != 'OK'){
            //             error "Digital Farmer Dashboard: Pipeline aborted due to quality gate failure: ${qualityGate.status}"
            //         }
            //     }
            // }
            if (env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'demo'){
                stage('Build image') {
                    /**
                    * Choose deployment environment variable for run command in dockerfile
                    * based on branch triggering the build process
                    */
                    lock('EnvironmentTagging'){
                        def run_environment = 'PROD'
            
                        if (env.BRANCH_NAME == 'dev') {
                            run_environment = 'DEV'
                        } else if (env.BRANCH_NAME == 'demo') {
                            run_environment = 'DEMO'
                        }
                        /* This builds the actual image; synonymous to
                        * docker build on the command line */
                        app = docker.build("263926175602.dkr.ecr.us-west-2.amazonaws.com/cf-server", "--build-arg REACT_APP_ENVIRONMENT=${run_environment} .")
                    }
                }

                stage('Push image') {
                    /* Finally, we'll push the image with tag of the current build number
                    * Pushing multiple tags is cheap, as all the layers are reused.
                    */
                    def tag = "digital-farmer-dashboard-prod-latest"
                    
                    if (env.BRANCH_NAME == 'demo'){
                        tag = "digital-farmer-dashboard-demo-latest"
                    } else if(env.BRANCH_NAME == 'dev'){
                        tag = "digital-farmer-dashboard-dev-latest"
                    }
                   
                    if (env.BRANCH_NAME == 'demo' || env.BRANCH_NAME == 'dev'){
                        sh "sed -i 's/IMAGE_TAG/${tag}/' src/helm-charts/values.yaml"
                    }
                    docker.withRegistry('263926175602.dkr.ecr.us-west-2.amazonaws.com/cf-server', 'ecr:us-west-2:cf-aws-credentials') {
                        app.push(tag)
                    }
                }

                def deploy_title = ''
                def ns = ''
                def url = ''
                def charts = ''

                switch(env.BRANCH_NAME) {
                    case 'dev':
                        deploy_title = 'Staging'
                        ns = 'staging'
                        url = "https://digitalfarmer-test.completefarmer.com" 
                        charts = "./src/helm-charts/"
                    break
                    case 'master':
                        deploy_title = 'Production'
                        ns = 'production'
                        url = "https://digitalfarmer.completefarmer.com"
                        charts = "./src/cf-helm/"
                    break
                    case 'demo':
                        deploy_title = 'Demo'
                        ns = 'demo'
                        url = "https://digitalfarmer-demo.completefarmer.com"
                        charts = "./src/helm-charts/"
                    break
                }
            
                stage("Deploy To ${deploy_title} Environment") {
                    /**
                    * Deploy to production or staging environment when the job is 
                    * triggered by either master of dev branch
                    */
                    sh "kubectl config use-context ${env.FRONTEND_CLUSTER_CONTEXT_V2}"
                    sh 'helm lint ./src/cf-helm/'
                    sh "helm upgrade --install --wait --timeout 360s --force cf-digital-farmer-dashboard ${charts} -n=${ns}"   
                    //Send teams and slack notification
                    slackSend(color: 'good', message: "DigiFarmer dashboard deployed at ${url}")
                    office365ConnectorSend webhookUrl: "${env.TEAM_WEBHOOK}", status: 'Success', message: "DigiFarmer dashboard deployed at ${url}"
                   
                }
            }
        }catch(err){
           slackSend(color: '#F01717', message: "${err}")
           office365ConnectorSend webhookUrl: "${env.TEAM_WEBHOOK}", message: "${err}"
           error "Build Failed ${err}"
        } finally{
            if (env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'demo'){
                def envName = env.BRANCH_NAME == 'dev' ? 'staging' : 'production'
                if (env.BRANCH_NAME == 'demo') {
                    envName = 'testing'
                }
                if (currentBuild.currentResult == 'SUCCESS'){
                    jiraSendDeploymentInfo environmentId: "${envName}", environmentName: "${envName}", environmentType: "${envName}", state: "successful"
                }
            }
            //Remove dangling images
            sh 'docker system prune -f'
        }

    
}
