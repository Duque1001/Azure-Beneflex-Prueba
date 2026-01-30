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
    clientId: 'c2118f1c-4ac4-4251-84de-10a4274ee244',
    tenantId: '7f32fcbe-7a03-45a9-a3d0-2beb0fa0aaf7'
  }
};

