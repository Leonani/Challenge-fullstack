import { PostFormContainer } from "../containers/PostFormContainer";

export const CreatePost = () => {
  const { title, setTitle, content, setContent, handleSubmit } = PostFormContainer();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Crear Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" className="border p-2 rounded"/>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Contenido" className="border p-2 rounded"/>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Crear</button>
      </form>
    </div>
  );
};
