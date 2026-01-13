import { RegisterContainer } from "../containers/RegisterContainer";

export const Register = () => {
  const { email, setEmail, name, setName, password, setPassword, handleSubmit, loading, error } = RegisterContainer();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Registro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="border p-2 rounded"/>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded"/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 rounded"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Cargando..." : "Registrarse"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
