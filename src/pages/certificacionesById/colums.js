import { Autocomplete, TextField } from "@mui/material";

export const colums = [
  {
    field: "nombre",
    width: 230,
    headerName: "Apellido y Nombre",
  },
  {
    field: "numeroDocumento",
    width: 100,
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
    getActions: ({ row }) => [
      <Autocomplete
        options={timeSlots}
        sx={{ width: 100 }}
        value={row?.horario.split("-")[0]}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} value={row?.horario.split("-")[0]} />
        )}
      />,
      <Autocomplete
        options={timeSlots}
        value={row?.horario.split("-")[1]}
        sx={{ width: 100 }}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} value={row?.horario.split("-")[1]} />
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
    field: "estado",
    headerName: "Estado",
  },
];

// One time slot
const timeSlots = Array.from(new Array(24)).map((_, i) => {
  const hour = i < 10 ? `0${i}` : i;
  return `${hour}`;
});
