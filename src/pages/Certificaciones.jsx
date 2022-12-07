import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import Table from "../components/common/Table";
import AppLayout from "../components/layouts/AppLayout";
import { AuthContextTheme } from "../context/Auth";
import { dataCertificaciones } from "../mock/data";

export default function Certificaciones() {
  const [periodo, setPeriodo] = useState(null);
  const [rows, setRows] = useState(false);
  const { user } = useContext(AuthContextTheme);

  // One time slot every 30 minutes.
  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${
        index % 2 === 0 ? "00" : "30"
      }`
  );

  const colums = [
    {
      field: "nombre",
      width: 230,
      headerName: "Apellido y Nombre",
      editable: true,
    },
    {
      field: "dni",
      width: 100,
      headerName: "DNI",
      editable: true,
      type: "number",
    },
    {
      field: "legajo",
      headerName: "Legajo",
      width: 130,
      editable: true,
      type: "number",
    },
    {
      field: "horario",
      headerName: "Horario",
      type: "actions",
      getActions: ({ row }) => [
        <Autocomplete
          options={timeSlots}
          sx={{ width: 100 }}
          value={row?.from}
          readOnly={new Date().getMonth() !== new Date(periodo).getMonth()}
          disableClearable
          renderInput={(params) => <TextField {...params} value={row?.from} />}
        />,
        <Autocomplete
          options={timeSlots}
          value={row?.to}
          readOnly={new Date().getMonth() !== new Date(periodo).getMonth()}
          sx={{ width: 100 }}
          disableClearable
          renderInput={(params) => <TextField {...params} value={row?.to} />}
        />,
      ],
      width: 250,
    },
    {
      field: "novedades",
      width: 240,
      headerName: "Novedades",
      editable: true,
    },
    {
      field: "certificado",
      headerName: "Certificado",
      type: "boolean",
      editable: true,
    },
  ];

  return (
    <>
      <AppLayout>
        <Box
          paddingLeft={1}
          paddingBottom={1}
          display="flex"
          alignItems="flex-end"
          gap="20px"
        >
          <DatePicker
            views={["year", "month"]}
            openTo="month"
            label="Período de la Certificación"
            value={periodo}
            onChange={(newValue) => {
              setPeriodo(newValue);
              setRows(true);
            }}
            renderInput={(params) => (
              <TextField variant="standard" {...params} />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            "& > :not(style)": {
              m: 1,
              width: { xs: "100%", md: "100%" },
              height: "max-content",
            },
          }}
        >
          <Paper elevation={3}>
            <Table
              from="admin-cert"
              columns={colums}
              isCellEditable={() =>
                new Date().getMonth() === new Date(periodo).getMonth()
              }
              dataRows={rows ? dataCertificaciones : []}
              style={{ height: "calc(100vh - 250px)", width: "100%" }}
            />
            {user.role === "RRHH" &&
              new Date().getMonth() === new Date(periodo).getMonth() && (
                <FormControl style={{ width: 400 }}>
                  <InputLabel id="demo-simple-select-label">
                    Acción Certificación
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Acción Certificación"
                  >
                    <MenuItem value={10}>Aceptar</MenuItem>
                    <MenuItem value={20}>Rechazar</MenuItem>
                  </Select>
                </FormControl>
              )}

            {user.role === "Director" &&
              new Date().getMonth() === new Date(periodo).getMonth() && (
                <Button
                  sx={{ float: "right", margin: "10px 5px" }}
                  variant="contained"
                >
                  Firmar
                </Button>
              )}
            {new Date().getMonth() === new Date(periodo).getMonth() && (
              <Button
                sx={{ float: "right", margin: "10px 5px" }}
                variant="contained"
              >
                Guardar
              </Button>
            )}
          </Paper>
        </Box>
      </AppLayout>
    </>
  );
}
