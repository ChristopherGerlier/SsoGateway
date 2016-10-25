/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  info: { // API informations (required)
    title: 'SSO Gateway', // Title (required)
    version: '0.0.1', // Version (required)
    description: `When a principal (or user) tries to access a resource 
    (like a web-based interface),she is directed to authenticate with an 
    identity provider. This may ask her to provide a username and password, 
    or might do something mode advanced like two-factor authentication. 
    Once the identifty provider is satisfied that the principal has been 
    authenticated, it goves information to the service provider, allowing it 
    to decide whether to grant her access to the resource.`,
  },
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/restRouter.js'],
};

export default options;
