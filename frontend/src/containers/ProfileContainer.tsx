// import { useState } from "react";
import { useProfile } from "../hooks/useProfile";

export const ProfileContainer = () => {
  const { user, loading } = useProfile();

  return { user, loading };
};
