
export const environment = {
  production: false,
  //apiUrl: 'http://localhost:3000/api/v1',
  functionsApiBaseUrl: 'https://funciones-beneflex-c5a7hhfpe6gjcxbj.canadacentral-01.azurewebsites.net/api',
  meApiUrl: 'https://funciones-beneflex-c5a7hhfpe6gjcxbj.canadacentral-01.azurewebsites.net/api/get-me',
  benefitsApiUrl: 'https://funciones-beneflex-c5a7hhfpe6gjcxbj.canadacentral-01.azurewebsites.net/api/get-user-benefits',
  createBenefitApiUrl: 'https://funciones-beneflex-c5a7hhfpe6gjcxbj.canadacentral-01.azurewebsites.net/api/create-benefit-request',
  myRequestsApiUrl: 'https://funciones-beneflex-c5a7hhfpe6gjcxbj.canadacentral-01.azurewebsites.net/api/get-my-requests',
  approvalsApiUrl: 'https://funciones-beneflex-c5a7hhfpe6gjcxbj.canadacentral-01.azurewebsites.net/api/get-my-requests',
  pendingRequestsApiUrl: 'https://funciones-beneflex-c5a7hhfpe6gjcxbj.canadacentral-01.azurewebsites.net/api/get-pending-requests',
  updateRequestStatusApiUrl: 'https://funciones-beneflex-c5a7hhfpe6gjcxbj.canadacentral-01.azurewebsites.net/api/update-request-status',

  msal: {
    // clientId: '7d035349-8064-4ad8-82a6-631255cde4a4',
    // tenantId: 'd3852f48-3c9a-48c2-afc9-1d4bf09fb882'
    clientId: '55e1c5ee-d3cd-43be-803d-37ddc81ab90a',
    tenantId: 'beb07c45-7a81-495d-8fc2-475a31cd7831'
  }
};

