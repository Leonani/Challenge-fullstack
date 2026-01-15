import { useState } from "react";
import { updateProfile } from "../api/user.api";

export const useEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateProfile(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, success };
};
