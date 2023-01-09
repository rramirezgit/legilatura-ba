import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../components/common/Table";
import AppLayout from "../../components/layouts/AppLayout";
import { AuthContextTheme } from "../../context/Auth";
import usePermissions from "../../hook/usePermissions";
import { colums } from "./colums";
import {
  getDetailCertificationList,
  handleSave,
  handleSign,
} from "./certificacionesByIdLogica";
import { getMasterCertificationList } from "../certificaciones/certificacionesLogica";
import MyDocument from "../../components/common/myDocument";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";

export default function Certificaciones() {
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const { user } = useContext(AuthContextTheme);
  const [periodo, setPeriodo] = useState(new Date(location.state.data.periodo));
  const [selectedRows, setSelectedRows] = useState([]);
  const [state, setState] = useState(location.state.data.estado);
  const permissions = usePermissions(location.state.data.estado);
  const navigate = useNavigate();
  const documentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
  });

  useEffect(() => {
    switch (location.state.data.estado) {
      case "B":
        setState("Borrador");
        break;
      case "I":
        setState("Ingresado");
        break;
      case "A":
        setState("Aprobado");
        break;
      case "R":
        setState("Rechazado");
        break;
      default:
    }

    getDetailCertificationList(location.state.data.id, setRows);
  }, [location.state.data]);

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
          {/* <DatePicker
            views={["year", "month"]}
            openTo="month"
            label="Período de la Certificación"
            value={periodo}
            disabled
            onChange={(newValue) => {
              getMasterCertificationList({
                cuil: user.Cuil,
                periodo: newValue,
                fnSetPeriodo: setPeriodo,
                fnSetRows: setRows,
              });
            }}
            renderInput={(params) => (
              <TextField variant="standard" {...params} />
            )}
          /> */}
          <Typography variant="h6" component="div">
            {`Periodo: ${new Date(periodo).toLocaleDateString()}`}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Estado: ${state}`}
          </Typography>
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
                setSelectedRows(ids);
              }}
              onCellEditCommit={(params) => {
                let rowsNew = [...rows];
                let data = rowsNew.map((row) => {
                  if (params.id === row.id) {
                    return {
                      ...row,
                      [params.field]: params.value,
                    };
                  } else {
                    return row;
                  }
                });
                setSelectedRows([...selectedRows, params.id]);
                setRows(data);
              }}
              EmptyMessage="No hay datos"
              from="admin-cert"
              columns={colums}
              dataRows={rows}
              isCellEditable={() => permissions.canEdit}
              style={{ height: "calc(100vh - 250px)", width: "100%" }}
            />
            {rows.length > 0 && permissions.canChangeState && (
              <FormControl style={{ width: 200 }}>
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Acción"
                >
                  <MenuItem value={10}>Aceptar</MenuItem>
                  <MenuItem value={20}>Rechazar</MenuItem>
                </Select>
              </FormControl>
            )}

            {rows.length > 0 && permissions.canSign && (
              <Button
                sx={{ float: "right", margin: "10px 5px" }}
                variant="contained"
                onClick={() => handleSign(navigate, handlePrint)}
              >
                Firmar
              </Button>
            )}
            {rows.length > 0 && (
              <Button
                sx={{ float: "right", margin: "10px 5px" }}
                variant="contained"
                onClick={() => {
                  if (selectedRows.length) {
                    let dataChange = [];
                    selectedRows.forEach((row) => {
                      rows.forEach((item) => {
                        if (item.id === row) {
                          dataChange.push({
                            ...item,
                          });
                        }
                      });
                    });
                    handleSave({
                      navigate,
                      data: dataChange,
                      fnSetRows: setRows,
                      periodo,
                      cuil: user.Cuil,
                    });
                  } else {
                    Swal.fire({
                      title:
                        "Seleccione un detalle de certificación para guardar",
                      icon: "warning",
                      showCloseButton: true,
                      showCancelButton: false,
                      confirmButtonText: "Ok",
                      focusCancel: true,
                    });
                  }
                }}
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
        <MyDocument referencia={documentRef} rows={rows} user={user} />
      </div>
    </>
  );
}
