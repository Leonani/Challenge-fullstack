import { EditProfileContainer } from "../containers/EditProfileContainer";
import { ProfileForm } from "../components/ProfileForm";

export const EditProfile = () => {
  const container = EditProfileContainer();
  return <ProfileForm {...container} />;
};
