/**
* Jenkins Pipepline Script for deploying CF Digital Farmer Dashboard to Kubernetes Cluster
* @Author Peter Yefi
* @Created November 27 2020
**/

node {
    def app

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
                slackSend(color: '#F01717', message: "Quality gate failed for ${env.JOB_NAME}")
                error "Pipeline aborted due to quality gate failure: ${qualityGate.status}"
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
    
    stage('Deploy To Production or Staging') {
        /**
        * Deploy to production or staging environment when the job is 
        * triggered by either master of dev branch
        */
        if (env.BRANCH_NAME == 'master') {
            echo 'Deploying to Production Environment...'
            sh 'helm lint ./src/cf-helm/'
            sh "helm upgrade --install --wait --timeout 120s --recreate-pods --set image.tag=digital-farmer-dashboard-build-${env.BUILD_NUMBER} cf-digital-farmer-dashboard ./src/cf-helm/ -n=dashboards"
            slackSend(color: 'good', message: "Successfully deployed Digital Farmer Dashboard to production environment View deployed changes at https://digitalfarmer.completefarmer.com")
        } else if (env.BRANCH_NAME == 'dev') {
            echo 'Deploying to Staging Environment'
            sh 'helm lint ./src/cf-helm/'
            sh "helm upgrade --install --wait --timeout 120s --recreate-pods --set image.tag=digital-farmer-dashboard-build-${env.BUILD_NUMBER} cf-digital-farmer-dashboard ./src/cf-helm/ -n=dashboards-stage"
            slackSend(color: 'good', message: "Successfully deployed Digital Farmer Dashboard to staging environment View deployed changes at https://digitalfarmer-test.completefarmer.com")
        }
        
    }
    
}
