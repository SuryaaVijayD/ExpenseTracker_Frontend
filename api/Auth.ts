// api/Auth.ts

const BASE_URL = 'https://expensetracker-backend-5dac.onrender.com';

export interface RegisterPayload {
  email: string;
  username: string;
  phone: string;
  salary: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    console.log('[DEBUG] authService.login started:', payload.username);

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Login failed');
    }

    // ✅ BACKEND RETURNS JSON NOW
    const data: { token: string } = await response.json();

    console.log('[DEBUG] Parsed login response:', data);

    return {
      success: true,
      message: 'Login successful',
      token: data.token,
    };
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    console.log('[DEBUG] authService.register started:', payload.username);

    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.phone,
        salary: payload.salary,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Registration failed');
    }

    const data: { message: string } = await response.json();

    return {
      success: true,
      message: data.message,
    };
  },
};

