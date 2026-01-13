const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token"); // o donde lo guardes
};

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error en la API");
  }

  return res.json();
};
