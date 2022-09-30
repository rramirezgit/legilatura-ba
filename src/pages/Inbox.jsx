import { Box, Paper } from "@mui/material";
import Table from "../components/common/Table";
import AppLayout from "../components/layouts/AppLayout";
import { columnsInbox, inboxData } from "../mock/data";

export default function Inbox() {
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
              dataRows={inboxData}
              style={{ height: "calc(100vh - 130px)", width: "100%" }}
            />
          </Paper>
        </Box>
      </AppLayout>
    </>
  );
}
