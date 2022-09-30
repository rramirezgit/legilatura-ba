import { Box, Button, Paper, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { AuthLayout } from "../../components/layouts";
import * as Yup from "yup";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { AuthContextTheme } from "../../context/Auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContextTheme);

  const Users = [
    {
      username: "RRamirez",
      name: "Ricardo Ramirez",
      password: "123456",
      role: "Cargador",
      dependencias: "D.G Prensa - Difusión",
    },
    {
      username: "SCosta",
      name: "Sebastina Costa",
      password: "123456",
      role: "Director",
      dependencias: "D.G Prensa - Difusión",
    },
    {
      username: "SBerdia",
      name: "Sebastian Berdia",
      password: "123456",
      role: "RRHH",
      dependencias: "D.G Prensa - Difusión",
    },
  ];

  const validateUser = (values) => {
    const user = Users.find(
      (user) =>
        user.username === values.usuario && user.password === values.password
    );
    if (user) {
      login({
        username: values.usuario,
        password: values.password,
        role: user.role,
        dependencias: user.dependencias,
        name: user.name,
      });
      return true;
    }
    return false;
  };

  return (
    <AuthLayout>
      <Box
        width={{ xs: 354, sm: 400 }}
        sx={{
          display: "flex",
          "& > :not(style)": {
            width: 454,
            height: 504,
          },
        }}
      >
        <Paper elevation={3}>
          <Formik
            initialValues={{ usuario: "", password: "" }}
            onSubmit={(values, options) => {
              if (validateUser(values)) {
                navigate("/");
              } else {
                options.setErrors({
                  usuario: "Usuario o contraseña incorrectos",
                });
              }
            }}
            validationSchema={Yup.object({
              usuario: Yup.string().required("El usuario es requerido"),
              password: Yup.string().required("La contraseña es requerida"),
            })}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} autoComplete={false}>
                <Box
                  width={{ xs: 354, sm: 400 }}
                  height={{ xs: 504 }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  padding={4}
                  gap={4}
                >
                  <Box>
                    <svg
                      width="280"
                      height="100"
                      viewBox="0 0 280 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="280" height="100" fill="url(#pattern0)" />
                      <defs>
                        <pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_69_2502"
                            transform="scale(0.00357143 0.01)"
                          />
                        </pattern>
                        <image
                          id="image0_69_2502"
                          width="280"
                          height="100"
                          href="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                  </Box>
                  <Box>
                    <TextField
                      size="small"
                      fullWidth
                      variant="standard"
                      label="usuario"
                      name="usuario"
                      {...formik.getFieldProps("usuario")}
                    />
                    {formik.touched.usuario && formik.errors.usuario && (
                      <Box color={red[500]}>{formik.errors.usuario}</Box>
                    )}
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="Contraseña"
                      name="password"
                      type="password"
                      {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <Box color={red[500]}>{formik.errors.password}</Box>
                    )}
                  </Box>

                  <Button type="submit" variant="contained">
                    Ingresar
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </AuthLayout>
  );
};

export default Login;
