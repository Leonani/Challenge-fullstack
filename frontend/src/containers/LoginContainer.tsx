import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export const LoginContainer = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm<LoginForm>({
    mode: "onChange", // validación reactiva
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    const success = await login(data.email, data.password);

    if (!success) {
      setError("root", {
        type: "manual",
        message: "Credenciales inválidas",
      });
      return;
    }

    navigate("/");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading: isSubmitting,
    isValid,
  };
};
