import { useState } from "react";
import { ProfileContainer } from "../containers/ProfileContainer";
import { updateProfile } from "../api/user.api";

export const Profile = () => {
  const { user, loading } = ProfileContainer();
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>Usuario no encontrado</p>;

  const startEdit = () => {
    setName(user.name);
    setEmail(user.email);
    setEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile({
        name,
        email,
        password: password || undefined,
      });

      setEditing(false);
      setPassword("");
      window.location.reload(); // simple y efectivo para este challenge
    } catch (err) {
      alert("Error al actualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-4 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Perfil</h1>

      {!editing ? (
        <>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <button
            onClick={startEdit}
            className="mt-4 px-4 py-2 border rounded hover:bg-gray-100"
          >
            Editar perfil
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm">Nombre</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Nueva contraseña</label>
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              placeholder="Opcional"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 border rounded"
            >
              Guardar
            </button>

            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 border rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

