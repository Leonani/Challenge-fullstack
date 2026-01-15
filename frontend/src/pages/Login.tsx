import { LoginContainer } from "../containers/LoginContainer";

export const Login = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    isValid,
  } = LoginContainer();

  return (
    <div className="h-full overflow-hidden flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Iniciar sesión
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="
                border rounded-lg px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                transition
              "
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                border rounded-lg px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                transition
              "
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
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className="
              mt-2 bg-blue-600 text-white py-2 rounded-lg font-medium
              hover:bg-blue-700
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            {loading ? "Cargando..." : "Login"}
          </button>

          {/* ERROR BACKEND */}
          {errors.root && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errors.root.message}
            </p>
          )}
        </form>
      </div>
    </div>

  );
};

export default Login;