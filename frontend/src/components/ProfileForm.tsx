export const ProfileForm = ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  handleSubmit,
  loading,
  error,
  success,
}: any) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" />
    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nueva contraseña" />

    <button disabled={loading}>Guardar</button>

    {error && <p className="text-red-600">{error}</p>}
    {success && <p className="text-green-600">Perfil actualizado</p>}
  </form>
);
