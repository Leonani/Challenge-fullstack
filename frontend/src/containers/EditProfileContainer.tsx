import { useState } from "react";
import { useEditProfile } from "../hooks/useEditProfile";

export const EditProfileContainer = () => {
  const { submit, loading, error, success } = useEditProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ name, email, password });
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    loading,
    error,
    success,
  };
};
