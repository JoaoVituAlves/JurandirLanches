const baseUrl = "http://localhost:4000";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  return response.json();
};

const httpClient = {
  get: async (endpoint) => {
    const response = await fetch(baseUrl + endpoint, {
      method: "GET",
      headers: {
        "chaveapi": "PFSII"
      },
      credentials: "include"
    });
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const response = await fetch(baseUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "chaveapi": "PFSII"
      },
      body: JSON.stringify(data),
      credentials: "include"
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const response = await fetch(baseUrl + endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "chaveapi": "PFSII"
      },
      body: JSON.stringify(data),
      credentials: "include"
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(baseUrl + endpoint, {
      method: "DELETE",
      headers: {
        "chaveapi": "PFSII"
      },
      credentials: "include"
    });
    return handleResponse(response);
  }
};

export default httpClient;
