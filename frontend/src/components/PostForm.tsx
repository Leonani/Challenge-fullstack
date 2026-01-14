export const PostForm = ({
  title,
  content,
  setTitle,
  setContent,
  handleSubmit,
  loading,
  error,
  success,
}: any) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
    <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Contenido" />

    <button disabled={loading}>Guardar</button>

    {error && <p className="text-red-600">{error}</p>}
    {success && <p className="text-green-600">Post actualizado</p>}
  </form>
);
