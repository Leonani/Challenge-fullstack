import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type AuthContextType = {
  token: string | null;
  userId: string | null;
  userName: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  userName: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicialización del auth desde localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(storedUserId);
    if (storedUserName) setUserName(storedUserName);

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();

      // ✅ Guardar token y datos del usuario correctamente
      setToken(data.accessToken);
      setUserId(data.user.id);
      setUserName(data.user.name);

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);

      return true;
    } catch {
      return false;
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      if (!res.ok) throw new Error("Registro fallido");

      return true;
    } catch {
      return false;
    }
  };

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
      value={{ token, userId, userName, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};



