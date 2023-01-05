import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { DateRange } from "../../components/common/DateRange";

export const colums = [
  {
    field: "idCerticicacion",
    width: 100,
    headerName: "id Certificacion",
  },
  {
    field: "id",
    width: 100,
    headerName: "id ",
  },
  {
    field: "nombre",
    width: 230,
    headerName: "Apellido y Nombre",
  },
  {
    field: "numeroDocumento",
    width: 130,
    headerName: "DNI",
    type: "number",
  },
  {
    field: "legajo",
    headerName: "Legajo",
    width: 130,
    type: "number",
  },
  {
    field: "horario",
    headerName: "Horario",
    renderEditCell: (params) => <DateRange params={params} />,
    editable: true,
    width: 180,
    type: "number",
  },
  {
    field: "novedad",
    width: 240,
    headerName: "Novedades",
    editable: true,
  },
  {
    field: "estado",
    headerName: "Estado",
  },
];
