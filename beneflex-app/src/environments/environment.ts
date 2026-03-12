export const environment = {
  production: false,
  //apiUrl: 'http://localhost:3000/api/v1',
  functionsApiBaseUrl: 'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api',
  meApiUrl: 'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/get-me',
  benefitsApiUrl: 'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/get-user-benefits',
  createBenefitApiUrl: 'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/create-benefit-request',
  myRequestsApiUrl: 'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/get-my-requests',
  approvalsApiUrl: 'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/get-my-requests',
  pendingRequestsApiUrl: 'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/get-pending-requests',
  updateRequestStatusApiUrl: 'https://beneflex-functions-ajfsbxbfetexc9cu.canadacentral-01.azurewebsites.net/api/update-request-status',

  msal: {
    clientId: 'e29998d4-12f7-4400-a69d-2b3268db9650',
    tenantId: 'd3852f48-3c9a-48c2-afc9-1d4bf09fb882'
  }
};

