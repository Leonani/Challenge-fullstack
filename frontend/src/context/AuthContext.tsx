import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type AuthContextType = {
  token: string | null;
  userId: string | null;
  userName: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Contexto con valores por defecto
const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  userName: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

// Hook para consumir el contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicialización desde localStorage
  useEffect(() => {
    setToken(localStorage.getItem("token") || null);
    setUserId(localStorage.getItem("userId") || null);
    setUserName(localStorage.getItem("userName") || null);
    setLoading(false);
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();

      // Validar que la API devuelva user
      if (!data.accessToken || !data.user?.id || !data.user?.name) {
        throw new Error("Respuesta de login inválida");
      }

      // Guardar en state
      setToken(data.accessToken);
      setUserId(data.user.id);
      setUserName(data.user.name);

      // Guardar en localStorage
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);

      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // Registro
  const register = async (email: string, name: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      if (!res.ok) throw new Error("Registro fallido");

      return true;
    } catch (err) {
      console.error("Register error:", err);
      return false;
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserName(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        userName,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
