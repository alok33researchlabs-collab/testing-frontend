import API_CONFIG from '../../config/api.config'


const request = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`
  const token = localStorage.getItem('token')
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
  
      ...(token && { Authorization: `Bearer ${token}` }),
     
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()
    

    if (!response.ok) {
     
      throw new Error(data.message || 'Request failed')
    }
    
    return data
  } catch (error) {
  
    console.error('API Error:', error)
   
    throw error
  }
}

// --- Auth Service Functions ---
const AuthService = {
 
  register: (name, email, password) => {
    return request(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  },

 
  login: (email, password) => {
    return request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  
  getCurrentUser: () => {
    // This endpoint usually requires the 'Authorization' header handled by the request function
    return request(API_CONFIG.ENDPOINTS.AUTH.ME)
  },


  forgotPassword: (email) => {
    return request(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },


  resetPassword: (token, password) => {
    return request(`${API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD}/${token}`, {
      method: 'PUT',
      body: JSON.stringify({ password }),
    })
  },

 
  logout: () => {
    localStorage.removeItem('token')
  },
}

export default AuthService