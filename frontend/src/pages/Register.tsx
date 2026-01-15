import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<RegisterForm>({
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterForm) => {
    const success = await registerUser(
      data.email,
      data.name,
      data.password
    );

    if (!success) {
      setError("root", {
        message: "No se pudo completar el registro",
      });
      return;
    }

    navigate("/login");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-xl font-bold mb-4 text-center">Registro</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        noValidate
      >
        {/* NOMBRE */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Nombre"
            className="border p-2 rounded"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Formato de email inválido",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
              maxLength: {
                value: 8,
                message: "Máximo 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>

        {/* ERROR BACKEND */}
        {errors.root && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errors.root.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;

