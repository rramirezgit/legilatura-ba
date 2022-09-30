import { useContext, useEffect, useState } from "react";
import { AuthContextTheme } from "../context/Auth";

const usePermissions = (state) => {
  const {
    user: { role },
  } = useContext(AuthContextTheme);
  const [permissions, setPermissions] = useState({
    canEdit: false,
    canChangeState: false,
    cnaSee: false,
  });

  useEffect(() => {
    setPermissions({
      canEdit: role !== "RRHH" && state === "B",
      canChangeState: role === "RRHH" && state === "I",
      canSee: role === "RRHH" && state !== "B",
      canSign: role === "Director" && state === "B",
    });
  }, [role, state]);

  return permissions;
};

export default usePermissions;
