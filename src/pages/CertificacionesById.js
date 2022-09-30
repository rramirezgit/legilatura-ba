import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  useStepperContext,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import Table from "../components/common/Table";
import AppLayout from "../components/layouts/AppLayout";
import { AuthContextTheme } from "../context/Auth";

const columns = [
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
    type: "dateTime",
    width: 160,
    editable: true,
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

const dataRows = [
  {
    id: 0,
    nombre: "Perez Juan",
    dni: 12345678,
    legajo: 123,
    horario: "08:00 a 12:00",
    novedades: "Novedad 1",
    certificado: true,
  },
  {
    id: 1,
    nombre: "Gomez Maria",
    dni: 87654321,
    legajo: 456,
    horario: "08:00 a 12:00",
    novedades: "Novedad 2",
    certificado: false,
  },
  {
    id: 2,
    nombre: "Gonzalez Juan",
    dni: 12345678,
    legajo: 789,
    horario: "08:00 a 12:00",
    novedades: "Novedad 3",
    certificado: true,
  },
  {
    id: 3,
    nombre: "Perez Maria",
    dni: 87654321,
    legajo: 101,
    horario: "08:00 a 12:00",
    novedades: "Novedad 4",
    certificado: false,
  },
  {
    id: 4,
    nombre: "Gomez Juan",
    dni: 12345678,
    legajo: 112,
    horario: "08:00 a 12:00",
    novedades: "Novedad 5",
    certificado: true,
  },
];

export default function Certificaciones() {
  const [value, setValue] = useState(null);
  const [rows, setRows] = useState(false);
  const { user } = useContext(AuthContextTheme);

  return (
    <>
      <AppLayout>
        <Box paddingLeft={1} paddingBottom={1}>
          <DatePicker
            views={["year", "month"]}
            openTo="month"
            label="Período"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
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
              data={rows}
              from="admin-cert"
              columns={columns}
              dataRows={dataRows}
              style={{ height: "calc(100vh - 250px)", width: "100%" }}
            />
            {user.role === "RRHH" && (
              <FormControl style={{ width: 300 }}>
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Estado"
                >
                  <MenuItem value={10}>Aceptado</MenuItem>
                  <MenuItem value={20}>Rechazado</MenuItem>
                </Select>
              </FormControl>
            )}

            {user.role === "Director" && (
              <Button
                sx={{ float: "right", margin: "10px 5px" }}
                variant="contained"
              >
                Firmar
              </Button>
            )}
            <Button
              sx={{ float: "right", margin: "10px 5px" }}
              variant="contained"
            >
              Guardar
            </Button>
          </Paper>
        </Box>
      </AppLayout>
    </>
  );
}
