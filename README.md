## Note App Demo

The demo app is a single page application powered by a serverless API written completely in TypeScript.

It's my practice project for React, so there may be some mistakes, and the technology selection and back-end architecture mainly comes from the sst-dev's [guide](https://sst.dev/guide).

![alt image](/screenshot/homepage.png)
![alt image](/screenshot/signup.png)
![alt image](/screenshot/login.png)
![alt image](/screenshot/notelist.png)
![alt image](/screenshot/phone-homepage.png)

## Authenticated API Architecture

![alt image](/screenshot/serverless-auth-api-architecture.png)

## Features:

- Account Signup and login
- Create / modify / delete notes
- Add credit card payment
- Served over HTTPS on a AWS's CloudFront domain
- Responsive design

## Technologies & Services

- Bootstrap for the UI Kit
- Certificate Manager for SSL
- CloudFront for serving out our app
- Cognito for user authentication and securing our APIs
- DynamoDB for our database
- GitHub for hosting our project repos
- Lambda & API Gateway for our serverless API
- React Router for routing
- React.js for our single page app
- Route 53 for our domain
- S3 for hosting our app and file uploads
- Seed for automating serverless deployments
- Stripe for processing credit card payments

## Requirements

- Node v18+ installed on your machine.
- PNPM v8+ installed on your machine.
- A free GitHub account.
- Basic knowledge of JavaScript and TypeScript.
- And basic knowledge of how to use the command line.

## Run

1. run `pnpm sst dev` in root path;
2. in another terminal tab, run `pnpm run dev` in packages/frontend directory;
3. navigate to the ApiEndpoint link in browser, the link is in the output of the first terminal tab;
