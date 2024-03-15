#!/bin/bash
# apig-test aws-api-gateway-cli-test \
# --user-pool-id='<us-east-2_YZEZ8ZKBe>' \
# --app-client-id='<3qho94aecta2rbs5r8uum0aovh>' \
# --cognito-region='<us-east-2>' \
# --identity-pool-id='<us-east-2:239a1160-89fa-48b0-8ae9-5b02b52babce>' \
# --invoke-url='<https://akvyi659wj.execute-api.us-east-2.amazonaws.com>' \
# --api-gateway-region='<us-east-2>' \
# --username='admin@example.com' \
# --password='Passw0rd!' \
# --path-template='/notes' \
# --method='POST' \
# --body='{"content":"hello world","attachment":"hello.jpg"}'

apig-test aws-api-gateway-cli-test --username admin@example.com --password Passw0rd! --user-pool-id "us-east-2_YZEZ8ZKBe" --app-client-id "3qho94aecta2rbs5r8uum0aovh" --cognito-region "us-east-2" --identity-pool-id "us-east-2:239a1160-89fa-48b0-8ae9-5b02b52babce" --invoke-url "https://akvyi659wj.execute-api.us-east-2.amazonaws.com" --api-gateway-region "us-east-2" --path-template /notes --method POST --body "{\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}"