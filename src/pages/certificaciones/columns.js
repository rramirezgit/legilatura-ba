import { DateRange } from "../../components/common/DateRange";

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
    getActions: ({ row }) => DateRange(row),
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
