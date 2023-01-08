import { Box, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import MyDocument from "../../components/common/myDocument";
import Table from "../../components/common/Table";
import AppLayout from "../../components/layouts/AppLayout";
import { AuthContextTheme } from "../../context/Auth";
import { inboxData } from "../../mock/data";
import { columnsInbox } from "./colums";
import { getListaTramites } from "./ListaTamitesLogica";

export default function ListaTramites() {
  const [PDFDocument, setPDFDocument] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(false);
  const { user } = useContext(AuthContextTheme);

  const handlePrint = useReactToPrint({
    content: () => (
      <MyDocument
        rows={PDFDocument.rows}
        currentDate={PDFDocument.currentDate}
        user={PDFDocument.user}
      />
    ),
  });

  const printPdf = (stringContentb64) => {
    const decodedString = atob(stringContentb64);
    setPDFDocument(JSON.parse(decodedString)?.referencia);
  };

  useEffect(() => {
    document.title = "Legislatura - Lista de Tramites";
    getListaTramites(user.Cuil, setRows);
    setColumns(columnsInbox(printPdf));
  }, []);

  useEffect(() => {
    if (PDFDocument) {
      handlePrint();
    }
  }, [PDFDocument]);

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
            <Table
              columns={columns}
              EmptyMessage="No hay datos"
              dataRows={rows}
              style={{ height: "calc(100vh - 130px)", width: "100%" }}
            />
          </Paper>
        </Box>
      </AppLayout>
    </>
  );
}
