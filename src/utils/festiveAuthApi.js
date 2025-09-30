// src/services/festiveAuthApi.js
const BASE_URL = "https://anand-u.vercel.app";

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

        // ✅ Always return server message, even if not ok (400, 401, etc.)
        if (!response.ok) {
            return {
                success: false,
                message: data.message || `Server error: ${response.status}`,
            };
        }

        return data; // success case
    } catch (error) {
        console.error(`API Request Error to ${endpoint}:`, error);
        return {
            success: false,
            message: "Network error. Please check your connection.",
        };
    }
}

/**
 * Sends user details to get an OTP.
 */
export function sendOtpRequest(tab, formData) {
    const isLogin = tab === "login";
    const endpoint = isLogin
        ? "/auth/login/enteremail"
        : "/auth/register/enterdetails";

    const payload = isLogin
        ? { email: formData.email }
        : {
            email: formData.email,
            username: formData.username,
            fullName: formData.fullName,
            phone: formData.phone,
            location: formData.location,
            gender: formData.gender,
        };

    return apiRequest(endpoint, payload);
}

/**
 * Sends the email and OTP for verification.
 */
export function verifyOtpRequest(tab, formData) {
    const endpoint =
        tab === "login"
            ? "/auth/login/verifyotp"
            : "/auth/register/verifyotp";

    const payload = {
        email: formData.email,
        userOtp: formData.otp,
    };

    return apiRequest(endpoint, payload);
}
