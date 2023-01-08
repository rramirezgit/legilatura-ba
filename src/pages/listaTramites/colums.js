import { GridActionsCellItem } from "@mui/x-data-grid";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";

const PrintPdf = (stringContentb64) => {
  const decodedString = atob(stringContentb64);

  const handlePrint = useReactToPrint({
    content: () => decodedString.referencia,
  });
};

export const columnsInbox = [
  {
    field: "tipoTramite",
    width: 130,
    headerName: "Tipo Tramite",
    editable: false,
  },
  {
    field: "id",
    width: 130,
    headerName: "ID Trámite",
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
    field: "descDependencia",
    headerName: "Dependencia ",
    width: 220,
    editable: false,
    type: "text",
  },
  {
    field: "fechaCreacion",
    headerName: "Fecha creacion ",
    type: "dateTime",
    width: 130,
    editable: false,
  },
  {
    field: "cuitCertificante",
    width: 140,
    headerName: "Cuit certificante ",
    editable: false,
  },
  {
    field: "fechaCertificacion",
    headerName: "Fecha certificacion ",
    width: 140,
    type: "dateTime",
    editable: false,
  },
  {
    field: "fechaDecision",
    width: 160,
    headerName: "Fecha Aprob./Rechazo",
    editable: false,
  },
  {
    field: "estado",
    headerName: "Estado",
    type: "text",
    editable: false,
  },
  {
    field: "actions",
    type: "actions",
    width: 80,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<PrintIcon color={"primary"} />}
        label="Delete"
        onClick={() => PrintPdf(params.row.documentoPDF)}
      />,
    ],
  },
];
