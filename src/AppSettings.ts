// Export all environment values from here

export function getBaseUrl() {
    if (process.env.REACT_APP_BASE_URL != null) {
      return process.env.REACT_APP_BASE_URL;
    }
  
    // return 'https://prohire-service.central.sleevesup.com.au';
    return 'http://localhost:8080';
  }
  