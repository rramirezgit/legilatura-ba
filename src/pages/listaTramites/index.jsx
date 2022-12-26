import { Box, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Table from "../../components/common/Table";
import AppLayout from "../../components/layouts/AppLayout";
import { AuthContextTheme } from "../../context/Auth";
import { columnsInbox, inboxData } from "../../mock/data";
import { getListaTramites } from "./ListaTamitesLogica";

export default function ListaTramites() {
  const [rows, setRows] = useState(false);
  const { user } = useContext(AuthContextTheme);

  useEffect(() => {
    document.title = "Legislatura - Lista de Tramites";
    getListaTramites(user.Cuil, setRows);
  }, []);

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
              columns={columnsInbox}
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
