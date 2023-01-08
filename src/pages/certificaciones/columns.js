import { Autocomplete, TextField } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useReactToPrint } from "react-to-print";
import { DateRange } from "../../components/common/DateRange";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const PrintPdf = (stringContentb64) => {
  const decodedString = atob(stringContentb64);
  debugger;

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
};

export const colums = [
  {
    field: "idCerticicacion",
    width: 100,
    headerName: "id Cert.",
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
    renderEditCell: DateRange,
    editable: true,
    width: 180,
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
  {
    field: "actions",
    type: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<PictureAsPdfIcon />}
        label="Delete"
        onClick={PrintPdf(params.documentoPDF)}
        style={{ display: params?.documentoPDF?.length > 0 ? "block" : "none" }}
      />,
    ],
  },
];
