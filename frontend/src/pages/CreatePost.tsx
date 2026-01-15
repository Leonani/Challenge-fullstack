import { useForm } from "react-hook-form";
import { apiFetch } from "../api/api";

type PostForm = {
  title: string;
  content: string;
};

export const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PostForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (data: PostForm) => {
    try {
      await apiFetch("/posts", {
        method: "POST",
        body: JSON.stringify(data),
      });
      reset(); // limpiar formulario después de crear post
      alert("Post creado exitosamente"); // opcional
    } catch (err: any) {
      console.error(err);
      alert("Error al crear post");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4 text-center">Crear Post</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        noValidate
      >
        {/* TÍTULO */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Título"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", {
              required: "El título es obligatorio",
              minLength: { value: 3, message: "Mínimo 3 caracteres" },
            })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* CONTENIDO */}
        <div className="flex flex-col gap-1">
          <textarea
            placeholder="Contenido"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            {...register("content", {
              required: "El contenido es obligatorio",
              minLength: { value: 5, message: "Mínimo 5 caracteres" },
            })}
          />
          {errors.content && (
            <span className="text-red-500 text-sm">{errors.content.message}</span>
          )}
        </div>

        {/* BOTÓN */}
        <button
          type="submit"
          disabled={!isValid}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
