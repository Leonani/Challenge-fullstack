import { LoginContainer } from "../containers/LoginContainer";

export const Login = () => {
  const { email, setEmail, password, setPassword, handleSubmit, loading, error } = LoginContainer();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded"/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border p-2 rounded"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? "Cargando..." : "Login"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
