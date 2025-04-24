import axios from "axios";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export function setTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  // Actualiza header por defecto
  authApi.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  delete authApi.defaults.headers.common["Authorization"];
}
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // Para enviar y recibir cookies httpOnly
  // withCredentials: true,
});

// ——————————————
// Interceptor de petición
// ——————————————
authApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error.message ?? "Request error"))
);

authApi.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(new Error(error.message ?? "Request error"))
);

// ——————————————
// Interceptor de respuesta para Refresh Token
// ——————————————
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si es 401 y no venimos de /auth/refresh ni hemos reintentado ya:
    if (
      error.response?.status === 401 &&
      originalRequest.url !== "/auth/refresh" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No hay refresh token");

        // Pedimos nuevos tokens al backend
        const { data } = await authApi.post("/auth/refresh", null, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        // Guardamos los nuevos tokens
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        // Actualizamos el header de la petición original y la reintentamos
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError instanceof Error ? refreshError : new Error(String(refreshError)));
      }
    }

    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);
