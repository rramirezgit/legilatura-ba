import { Autocomplete, TextField } from "@mui/material";

export const colums = [
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
        disableClearable
        readOnly
        renderInput={(params) => <TextField {...params} value={row?.from} />}
      />,
      <Autocomplete
        options={timeSlots}
        value={row?.to}
        sx={{ width: 100 }}
        disableClearable
        readOnly
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

// One time slot every 30 minutes.
const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) =>
    `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${
      index % 2 === 0 ? "00" : "30"
    }`
);
