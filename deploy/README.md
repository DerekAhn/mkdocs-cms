###Ansible Project Deployment Seed

####Installation
1. Clone this repo in your project root with the following command:

`git clone git@bitbucket.org:sudokrew/ansible-project-playbook-seed.git deploy && rm -Rf deploy/.git`

2. Make the proper configuration settings in:
  * deploy/uat
  * deploy/staging
  * deploy/production
  * deploy/deploy-vars.yml

3. Make any per instance deployment changes to deploy/deploy.yml