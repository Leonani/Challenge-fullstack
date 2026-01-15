import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type PostFormProps = {
  defaultTitle?: string;
  defaultContent?: string;
  onSubmit: (data: { title: string; content: string }) => void;
  loading?: boolean;
  error?: string;
  success?: boolean;
};

export const PostForm = ({
  defaultTitle = "",
  defaultContent = "",
  onSubmit,
  loading = false,
  error,
  success,
}: PostFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: defaultTitle,
      content: defaultContent,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 space-y-4"
      noValidate
    >
      <h1 className="text-xl font-bold mb-4">Editar Post</h1>

      {/* TÍTULO */}
      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Título"
          className="border p-2 rounded"
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
          className="border p-2 rounded h-40 resize-none"
          {...register("content", {
            required: "El contenido es obligatorio",
            minLength: { value: 10, message: "Mínimo 10 caracteres" },
          })}
        />
        {errors.content && (
          <span className="text-red-500 text-sm">{errors.content.message}</span>
        )}
      </div>

      {/* BOTONES */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!isValid || loading}
          className="bg-green-500 text-white p-2 rounded disabled:opacity-50 hover:bg-green-600 transition-colors flex-1"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition-colors flex-1"
        >
          Cancelar
        </button>
      </div>

      {/* ERROR BACKEND */}
      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

      {/* ÉXITO */}
      {success && <p className="text-green-500 text-sm text-center mt-2">Post actualizado</p>}
    </form>
  );
};

