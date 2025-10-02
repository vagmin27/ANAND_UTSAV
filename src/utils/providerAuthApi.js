const BASE_URL = "https://anand-u.vercel.app/provider";

/**
 * A generic function to handle API POST requests.
 */
async function apiRequest(endpoint, payload) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const errorText = await response.text();
      console.error("Server response was not JSON:", errorText);
      return {
        success: false,
        message:
          "An unexpected error occurred. The server response was not in the correct format.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Server error: ${response.status}`,
      };
    }

    return data;
  } catch (error) {
    console.error(`API Request Error to ${endpoint}:`, error);
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

/**
 * Register a new service provider.
 */
export function registerServiceProvider(payload) {
  return apiRequest("/register", payload);
}

/**
 * Login as service provider.
 */
export function loginServiceProvider(payload) {
  return apiRequest("/login", payload);
}

/**
 * Send forgot password OTP to service provider's email.
 */
export function sendForgotPasswordOtp(email) {
  return apiRequest("/forgototp", { email });
}

/**
 * Reset service provider password with OTP.
 */
export function resetServiceProviderPassword(payload) {
  return apiRequest("/verifyOtp", payload);
}
