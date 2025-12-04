const API_CONFIG = {
  BASE_URL:  'https://testing-backend-f9ot.onrender.com/api',
  TIMEOUT: 10000,
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      DASHBOARD: '/auth/dashboard',
      FORGOT_PASSWORD: '/auth/forgotpassword',
      RESET_PASSWORD: '/auth/resetpassword',
    }
  }
}

export default API_CONFIG