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
    type: "actions",
    editable: true,
    getActions: ({ row }) => {
      return [
        <Autocomplete
          options={timeSlots}
          sx={{ width: 80 }}
          defaultValue={row?.horario.split("-")[0]}
          onChange={(e, value) => {
            console.log(value);
            row.horario = `${value}-${row?.horario.split("-")[1]}`;
          }}
          disableClearable
          renderInput={(params) => (
            <TextField {...params} value={row?.horario.split("-")[0]} />
          )}
        />,
        <Autocomplete
          options={timeSlots}
          defaultValue={row?.horario.split("-")[1]}
          onChange={(e, value) => {
            console.log(value);
            row.horario = `${row?.horario.split("-")[0]}-${value}`;
          }}
          sx={{ width: 80 }}
          disableClearable
          renderInput={(params) => (
            <TextField {...params} value={row?.horario.split("-")[1]} />
          )}
        />,
      ];
    },
    width: 250,
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

// One time slot
const timeSlots = Array.from(new Array(24)).map((_, i) => {
  const hour = i < 10 ? `0${i}` : i;
  return `${hour}`;
});
