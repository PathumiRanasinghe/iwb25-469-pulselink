import Cookies from "js-cookie";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:9090/api";
const TOKEN_COOKIE_NAME = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME || "pulselink_token";
const HOSPITAL_COOKIE_NAME = process.env.NEXT_PUBLIC_HOSPITAL_COOKIE_NAME || "pulselink_hospital";

export type Hospital = {
  hospitalName: string;
  contactEmail: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  token?: string;
  hospital?: Hospital;
};

export async function loginUser(
  contactEmail: string,
  password: string
): Promise<LoginResponse> {
  try {
    // Use the constant defined above, not process.env directly
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactEmail, password }),
    });

    const data: LoginResponse = await response.json();

    if (data.success && data.hospital) {
      // Store hospital info in cookie - use constants instead of process.env
      Cookies.set(HOSPITAL_COOKIE_NAME, JSON.stringify(data.hospital), {
        expires: 7,
        secure: process.env.NODE_ENV === "production", // Only use secure in production
        sameSite: "strict",
      });

      // If your backend is updated to return a token, store it too
      if (data.token) {
        Cookies.set(TOKEN_COOKIE_NAME, data.token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production", // Only use secure in production
          sameSite: "strict",
        });
      }
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Network error occurred. Please try again.",
    };
  }
}

export function getHospital(): Hospital | null {
  const hospitalCookie = Cookies.get(HOSPITAL_COOKIE_NAME);
  if (hospitalCookie) {
    try {
      return JSON.parse(hospitalCookie);
    } catch (e) {
      console.error("Error parsing hospital cookie:", e);
    }
  }
  return null;
}

export function getToken(): string | null {
  return Cookies.get(TOKEN_COOKIE_NAME) || null;
}

export function isLoggedIn(): boolean {
  return !!getHospital();
}

export function logout(): void {
  Cookies.remove(HOSPITAL_COOKIE_NAME);
  Cookies.remove(TOKEN_COOKIE_NAME);
}