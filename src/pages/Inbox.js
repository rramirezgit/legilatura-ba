import { Box, Paper } from "@mui/material";
import { useState } from "react";
import Table from "../components/common/Table";
import AppLayout from "../components/layouts/AppLayout";

const columns = [
  {
    field: "id_certificacion",
    width: 130,
    headerName: "ID Certificación",
    editable: false,
  },
  {
    field: "periodo",
    width: 100,
    headerName: "Periodo",
    editable: false,
    type: "text",
  },
  {
    field: "dependencia",
    headerName: "Dependencia ",
    width: 130,
    editable: false,
    type: "text",
  },
  {
    field: "fecha_creacion",
    headerName: "Fecha creacion ",
    type: "dateTime",
    width: 130,
    editable: false,
  },
  {
    field: "cuit_certificante",
    width: 140,
    headerName: "Cuit certificante ",
    editable: false,
  },
  {
    field: "fecha_certificacion",
    headerName: "Fecha certificacion ",
    width: 140,
    type: "dateTime",
    editable: false,
  },
  {
    field: "fecha_aprobacion_hr",
    width: 145,
    headerName: "Fecha aprobacion hr",
    type: "dateTime",
    editable: false,
  },
  {
    field: "estado",
    headerName: "Estado",
    type: "text",
    editable: false,
  },
  {
    field: "claves",
    headerName: "Claves",
    type: "text",
    editable: false,
  },
];

const dataRows = [
  {
    id: 0,
    id_certificacion: "prueba",
    periodo: "2021-01",
    dependencia: "D.G Prensa - Difusión",
    fecha_creacion: "2021-01-01",
    cuit_certificante: "123456789",
    fecha_certificacion: "2021-01-01",
    fecha_aprobacion_hr: "2021-01-01",
    estado: "I",
    claves: "12345678",
  },
  {
    id: 1,
    id_certificacion: "12345678",
    periodo: "2021-01",
    dependencia: "D.G Prensa - Difusión",
    fecha_creacion: "2021-01-01",
    cuit_certificante: "123456789",
    fecha_certificacion: "2021-01-01",
    fecha_aprobacion_hr: "2021-01-01",
    estado: "I",
    claves: "12345678",
  },
  {
    id: 2,
    id_certificacion: "12345678",
    periodo: "2021-01",
    dependencia: "D.G Prensa - Difusión",
    fecha_creacion: "2021-01-01",
    cuit_certificante: "123456789",
    fecha_certificacion: "2021-01-01",
    fecha_aprobacion_hr: "2021-01-01",
    estado: "B",
    claves: "12345678",
  },
  {
    id: 3,
    id_certificacion: "12345678",
    periodo: "2021-01",
    dependencia: "D.G Prensa - Difusión",
    fecha_creacion: "2021-01-01",
    cuit_certificante: "123456789",
    fecha_certificacion: "2021-01-01",
    fecha_aprobacion_hr: "2021-01-01",
    estado: "R",
    claves: "12345678",
  },
  {
    id: 4,
    id_certificacion: "12345678",
    periodo: "2021-01",
    dependencia: "D.G Prensa - Difusión",
    fecha_creacion: "2021-01-01",
    cuit_certificante: "123456789",
    fecha_certificacion: "2021-01-01",
    fecha_aprobacion_hr: "2021-01-01",
    estado: "B",
    claves: "12345678",
  },
  {
    id: 5,
    id_certificacion: "12345678",
    periodo: "2021-01",
    dependencia: "D.G Prensa - Difusión",
    fecha_creacion: "2021-01-01",
    cuit_certificante: "123456789",
    fecha_certificacion: "2021-01-01",
    fecha_aprobacion_hr: "2021-01-01",
    estado: "B",
    claves: "12345678",
  },
  {
    id: 6,
    id_certificacion: "12345678",
    periodo: "2021-01",
    dependencia: "D.G Prensa - Difusión",
    fecha_creacion: "2021-01-01",
    cuit_certificante: "123456789",
    fecha_certificacion: "2021-01-01",
    fecha_aprobacion_hr: "2021-01-01",
    estado: "A",
    claves: "12345678",
  },
  {
    id: 7,
    id_certificacion: "12345678",
    periodo: "2021-01",
    dependencia: "D.G Prensa - Difusión",
    fecha_creacion: "2021-01-01",
    cuit_certificante: "123456789",
    fecha_certificacion: "2021-01-01",
    fecha_aprobacion_hr: "2021-01-01",
    estado: "B",
    claves: "12345678",
  },
];

export default function Inbox() {
  const [value, setValue] = useState(null);
  const [rows, setRows] = useState(false);

  return (
    <>
      <AppLayout>
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
            <Table columns={columns} dataRows={dataRows} style={{ height: "calc(100vh - 130px)", width: "100%" }} />
          </Paper>
        </Box>
      </AppLayout>
    </>
  );
}
