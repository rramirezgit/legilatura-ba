import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import MyDocument from "../../components/common/myDocument";
import Table from "../../components/common/Table";
import AppLayout from "../../components/layouts/AppLayout";
import { AuthContextTheme } from "../../context/Auth";
import {
  getMasterCertificationList,
  handleSave,
  postMasterCertification,
} from "./certificacionesLogica";
import { colums } from "./columns";

export default function Certificaciones() {
  const [periodo, setPeriodo] = useState(new Date());
  const [rows, setRows] = useState([]);
  const { user } = useContext(AuthContextTheme);
  const [selectedRows, setSelectedRows] = useState([]);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSign = () => {
    Swal.fire({
      title: "Seguro que desea Firmar?",
      icon: "warning",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      focusCancel: true,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonAriaLabel: "Thumbs down",
    }).then((result) => {
      if (result.isConfirmed) {
        // setState("I");
        // navigate("/");
        handlePrint();
      }
    });
  };

  useEffect(() => {
    getMasterCertificationList({
      cuil: user.Cuil,
      periodo,
      fnSetRows: setRows,
    });
  }, []);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  return (
    <>
      <AppLayout>
        <Box
          paddingLeft={1}
          paddingBottom={1}
          display="flex"
          alignItems="flex-end"
          gap="20px"
        >
          <DatePicker
            views={["year", "month"]}
            openTo="month"
            label="Período de la Certificación"
            value={periodo}
            onChange={(newValue) =>
              getMasterCertificationList({
                cuil: user.Cuil,
                periodo: newValue,
                fnSetPeriodo: setPeriodo,
                fnSetRows: setRows,
              })
            }
            renderInput={(params) => (
              <TextField variant="standard" {...params} />
            )}
          />
          {rows.length === 0 && (
            <Button
              variant="contained"
              onClick={() => {
                postMasterCertification({
                  data: {
                    periodo: new Date().toISOString().slice(0, 7),
                    dependencia: user.IdDependency,
                    cuitCertificante: user.Cuil,
                    estado: "B",
                    tipoTramite: "prueba",
                    fechaCreacion: new Date().toISOString(),
                  },
                  fnSetRows: setRows,
                });
              }}
            >
              Nueva Certificacion
            </Button>
          )}
        </Box>
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
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = rows.filter((row) =>
                  selectedIDs.has(row.id)
                );
                setSelectedRows(selectedRows);
              }}
              from="admin-cert"
              EmptyMessage="No hay datos"
              columns={colums}
              isCellEditable={() =>
                new Date().getMonth() === new Date(periodo).getMonth()
              }
              dataRows={rows}
              style={{ height: "calc(100vh - 250px)", width: "100%" }}
            />
            {user.ProfileDesc === "RRHH" &&
              new Date().getMonth() === new Date(periodo).getMonth() && (
                <FormControl style={{ width: 400 }}>
                  <InputLabel id="demo-simple-select-label">
                    Acción Certificación
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Acción Certificación"
                  >
                    <MenuItem value={10}>Aceptar</MenuItem>
                    <MenuItem value={20}>Rechazar</MenuItem>
                  </Select>
                </FormControl>
              )}

            {rows.length > 0 &&
              user.ProfileDesc === "Director" &&
              new Date().getMonth() === new Date(periodo).getMonth() && (
                <Button
                  sx={{ float: "right", margin: "10px 5px" }}
                  variant="contained"
                  onClick={handleSign}
                >
                  Firmar
                </Button>
              )}
            {rows.length > 0 &&
              new Date().getMonth() === new Date(periodo).getMonth() && (
                <Button
                  sx={{ float: "right", margin: "10px 5px" }}
                  variant="contained"
                  onClick={() => handleSave(selectedRows)}
                >
                  Guardar
                </Button>
              )}
          </Paper>
        </Box>
      </AppLayout>
      <div
        style={{
          display: "none",
        }}
      >
        <MyDocument referencia={componentRef} rows={rows} />
      </div>
    </>
  );
}
