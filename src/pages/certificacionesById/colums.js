import { Autocomplete, TextField } from "@mui/material";

export const colums = [
  {
    field: "nombre",
    width: 230,
    headerName: "Apellido y Nombre",
    editable: true,
  },
  {
    field: "numeroDocumento",
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
        value={row?.horario.slice("-")[0]}
        disableClearable
        readOnly
        renderInput={(params) => (
          <TextField {...params} value={row?.horario.slice("-")[0]} />
        )}
      />,
      <Autocomplete
        options={timeSlots}
        value={row?.horario.slice("-")[2]}
        sx={{ width: 100 }}
        disableClearable
        readOnly
        renderInput={(params) => (
          <TextField {...params} value={row?.horario.slice("-")[2]} />
        )}
      />,
    ],
    width: 250,
  },
  {
    field: "novedad",
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

// One time slot
const timeSlots = Array.from(new Array(24)).map((_, i) => {
  const hour = i < 10 ? `0${i}` : i;
  return `${hour}`;
});
