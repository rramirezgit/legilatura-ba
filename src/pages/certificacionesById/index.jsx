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
import {
  editDetailCertificationList,
  editMasterCertificationList,
  persistCertification,
} from "../../services";

export default function Certificaciones() {
  const location = useLocation();
  const [rows, setRows] = useState([]);
  const { user } = useContext(AuthContextTheme);
  const [periodo, setPeriodo] = useState(new Date(location.state.data.periodo));
  const [selectedRows, setSelectedRows] = useState([]);
  const [state, setState] = useState(location.state.data.estado);
  const permissions = usePermissions(
    location.state.data.estado,
    location.state.data.periodo
  );
  const navigate = useNavigate();
  const documentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    onBeforePrint: () => {
      const stringContengPDF = btoa(
        JSON.stringify({
          referencia: {
            rows,
            currentDate: new Date().toLocaleDateString(),
            user: { name: user.name },
          },
        })
      );
      const idsCertificaciones = [
        ...new Set(rows.map((row) => row.idCerticicacion)),
      ];

      const allEditMasterCertificationList = idsCertificaciones.map(
        (idCerticicacion) => {
          return editMasterCertificationList(idCerticicacion, {
            id: idCerticicacion,
            fechaCertificacion: new Date(),
            fechaDecision: null,
            estado: "I",
            documentoPDF: stringContengPDF,
          });
        }
      );

      Promise.all(allEditMasterCertificationList).then((res) => {
        console.log(res);
      });
    },
    onAfterPrint: () => {
      navigate("/");
    },
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

  const handleActionCertification = (value) => {
    Swal.fire({
      title: "Seguro que desea cambiar el estado?",
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
        const idsCertificaciones = [
          ...new Set(rows.map((row) => row.idCerticicacion)),
        ];

        if (idsCertificaciones.length > 0) {
          const allCertifications = idsCertificaciones.map(
            (idCerticicacion) => {
              return persistCertification(idCerticicacion, {
                id: idCerticicacion,
                fechaCertificacion: rows.filter(
                  (row) => row.idCerticicacion === idCerticicacion
                )[0].fechaCertificacion,
                fechaDecision: new Date(),
                estado: value,
              });
            }
          );
          Promise.all(allCertifications).then((res) => {
            if (res.length > 0) {
              getMasterCertificationList({
                cuil: user.Cuil,
                periodo: new Date(periodo).toISOString().slice(0, 10),
                fnSetRows: setRows,
              });
            }
          });
        }
      }
    });
  };

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
            {`Periodo de la Certificación: ${new Date(periodo)
              .toISOString()
              .slice(0, 7)}`}
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
                if (params.field !== "estado") {
                  setSelectedRows([...selectedRows, params.id]);

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

                  setRows(data);
                }
              }}
              selectionModel={selectedRows}
              EmptyMessage="No hay datos"
              from="admin-cert"
              columns={colums}
              dataRows={rows}
              isCellEditable={(params) =>
                permissions.canEdit && params.row.estado !== "1"
              }
              style={{ height: "calc(100vh - 250px)", width: "100%" }}
            />
            {rows.length > 0 && permissions.canChangeState && (
              <FormControl style={{ width: 200 }}>
                <InputLabel id="demo-simple-select-label">
                  Acción Certificación
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Acción Certificación"
                  onChange={(e) => {
                    handleActionCertification(e.target.value);
                  }}
                >
                  <MenuItem value={"A"}>Aceptar</MenuItem>
                  <MenuItem value={"R"}>Rechazar</MenuItem>
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
