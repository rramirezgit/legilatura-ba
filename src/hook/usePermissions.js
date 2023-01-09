import { useContext, useEffect, useState } from "react";
import { AuthContextTheme } from "../context/Auth";

const usePermissions = (state, periodo) => {
  const {
    user: { ProfileDesc },
  } = useContext(AuthContextTheme);
  const [permissions, setPermissions] = useState({
    canEdit: false,
    canChangeState: false,
    cnaSee: false,
  });

  useEffect(() => {
    setPermissions({
      canEdit: ProfileDesc !== "RRHH" && state === "B",
      canChangeState: ProfileDesc === "RRHH" && state === "I",
      canSee: ProfileDesc === "RRHH" && state !== "B",
      canSign:
        ProfileDesc === "Director" &&
        state === "B" &&
        new Date(periodo).toISOString().slice(0, 7) ===
          new Date().toISOString().slice(0, 7),
    });
  }, [ProfileDesc, state]);

  return permissions;
};

export default usePermissions;
