import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 

export const LoginContainer = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await login(email, password);
    setLoading(false);

    if (!success) {
      setError("Credenciales inválidas");
    }
  };

  return { email, setEmail, password, setPassword, handleSubmit, loading, error };
};

