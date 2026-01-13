import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const RegisterContainer = () => {
  const { register, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(email, name, password);
    if (success) {
      alert("Registro exitoso! Ahora puedes loguearte.");
      setEmail("");
      setName("");
      setPassword("");
    }
  };

  return { email, setEmail, name, setName, password, setPassword, handleSubmit, loading, error };
};
