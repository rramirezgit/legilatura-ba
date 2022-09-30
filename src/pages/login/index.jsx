import { Box, Button, Paper, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { AuthLayout } from "../../components/layouts";
import * as Yup from "yup";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { AuthContextTheme } from "../../context/Auth";
import { Users } from "../../mock/data";
import logo from "../../imgs/logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContextTheme);

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
                  gap={"10px"}
                >
                  <Box display="flex" justifyContent="center">
                    <img
                      style={{ position: "relative", top: " -50px" }}
                      src={logo}
                      alt="logo"
                    />
                  </Box>
                  <Box height={{ xs: 74 }}>
                    <TextField
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
                  <Box height={{ xs: 74 }}>
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
