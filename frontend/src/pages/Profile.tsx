import { useState, useEffect } from "react";
import { ProfileContainer } from "../containers/ProfileContainer";
import { updateProfile } from "../api/user.api";
import { useForm } from "react-hook-form";

type ProfileForm = {
  name: string;
  email: string;
  password?: string;
};

export const Profile = () => {
  const { user, loading } = ProfileContainer();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProfileForm>({
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email, password: "" });
    }
  }, [user, reset]);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>Usuario no encontrado</p>;

  const onSubmit = async (data: ProfileForm) => {
    setSaving(true);
    try {
      await updateProfile({
        name: data.name,
        email: data.email,
        password: data.password || undefined,
      });
      setEditing(false);
      reset({ ...data, password: "" });
      window.location.reload(); // simple para este challenge
    } catch (err) {
      alert("Error al actualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4 text-center">Perfil</h1>

      {!editing ? (
        <>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button
            onClick={() => setEditing(true)}
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Editar perfil
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* NOMBRE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Nombre</label>
            <input
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Email</label>
            <input
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* CONTRASEÑA */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Nueva contraseña (opcional)</label>
            <input
              type="password"
              placeholder="Opcional"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                maxLength: { value: 20, message: "Máximo 20 caracteres" },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* BOTONES */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!isValid || saving}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex-1 border px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;

