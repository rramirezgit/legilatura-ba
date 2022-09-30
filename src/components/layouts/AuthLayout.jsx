import { Box } from "@mui/system";
import React from "react";

export const AuthLayout = ({ children, tilte }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        {children}
      </Box>
    </>
  );
};
