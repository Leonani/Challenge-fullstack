import { ProfileContainer } from "../containers/ProfileContainer";

export const Profile = () => {
  const { user, loading } = ProfileContainer();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>Usuario no encontrado</p>;

  return (
    <div className="max-w-md mx-auto mt-10 border p-4 rounded shadow">
      <h1 className="text-xl font-bold mb-2">Perfil</h1>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};
