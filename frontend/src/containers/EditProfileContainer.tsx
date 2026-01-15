import { useEditProfile } from "../hooks/useEditProfile";
import { useForm } from "react-hook-form";

export type EditProfileForm = {
  name: string;
  email: string;
  password?: string;
};

export const EditProfileContainer = () => {
  const { submit, loading, error, success } = useEditProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<EditProfileForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: EditProfileForm) => {
    await submit({
      name: data.name,
      email: data.email,
      password: data.password || undefined,
    });

    if (!error) {
      reset({ ...data, password: "" });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    loading,
    error,
    success,
    onSubmit,
  };
};
