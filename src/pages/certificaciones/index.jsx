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
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import MyDocument from "../../components/common/myDocument";
import Table from "../../components/common/Table";
import AppLayout from "../../components/layouts/AppLayout";
import { AuthContextTheme } from "../../context/Auth";
import { dataCertificaciones } from "../../mock/data";
import {
  editDetailCertificationList,
  editMasterCertificationList,
  persistCertification,
} from "../../services";
import {
  getMasterCertificationList,
  handleSave,
  postMasterCertification,
} from "./certificacionesLogica";
import { colums } from "./columns";

export default function Certificaciones() {
  const [periodo, setPeriodo] = useState(new Date());
  const [columnsData, setColumnsData] = useState([]);
  const [rows, setRows] = useState([]);
  const { user } = useContext(AuthContextTheme);
  const [selectedRows, setSelectedRows] = useState([]);
  const componentRef = useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
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

      const allEditMasterCertificationList = rows.map((r) => {
        return editMasterCertificationList(r.idCerticicacion, {
          id: r.idCerticicacion,
          fechaCertificacion: new Date(),
          fechaDecision: null,
          estado: "I",
          documentoPDF: stringContengPDF,
        });
      });

      Promise.all(allEditMasterCertificationList).then((res) => {
        if (res.length > 0) {
          Promise.all(
            rows.map((item) => {
              let body = {
                id: item.id,
                horario: item.horario,
                novedad: item.novedad,
                estado: item.estado,
              };

              return editDetailCertificationList(item.id, body);
            })
          ).then((res) => {
            if (res.length > 0) {
              getMasterCertificationList({
                cuil: user.Cuil,
                periodo: new Date(periodo).toISOString().slice(0, 10),
                fnSetRows: setRows,
              });
            }
          });
        }
      });
    },
    onAfterPrint: () => {
      navigate("/");
    },
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

  useEffect(() => {
    getMasterCertificationList({
      cuil: user.Cuil,
      periodo,
      fnSetRows: setRows,
    });
    setColumnsData(
      colums(
        user.ProfileDesc === "Asistente" || user.ProfileDesc === "Director"
          ? true
          : false
      )
    );
  }, []);

  const onCellEditCommit = (params) => {
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
    if (params.field !== "estado") {
      setSelectedRows([...selectedRows, params.id]);

      setRows(data);
    } else {
      Swal.fire({
        title: "Seguro que desea certificar?",
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
          let rowCertificated = data.filter((row) => row.id === params.id)[0];

          let body = {
            id: rowCertificated.id,
            horario: rowCertificated.horario,
            novedad: rowCertificated.novedad,
            estado: rowCertificated.estado ? "1" : "0",
          };
          editDetailCertificationList(rowCertificated.id, body);
        }
      });
    }
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
                    periodo: new Date(periodo).toISOString().slice(0, 10),
                    dependencia: user.IdDependency,
                    cuitCertificante: user.Cuil,
                    estado: "B",
                    tipoTramite: "Certificación",
                    fechaCreacion: periodo,
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
                setSelectedRows(ids);
              }}
              onCellEditCommit={onCellEditCommit}
              selectionModel={selectedRows}
              from="admin-cert"
              EmptyMessage="No hay datos"
              columns={colums}
              isCellEditable={(params) =>
                new Date().getMonth() === new Date(periodo).getMonth() &&
                !params.row.estado
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
                    onChange={(e) => {
                      handleActionCertification(e.target.value);
                    }}
                  >
                    <MenuItem value={"A"}>Aceptar</MenuItem>
                    <MenuItem value={"R"}>Rechazar</MenuItem>
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
                        data: dataChange,
                        fnSetRows: setRows,
                        periodo,
                        cuil: user.Cuil,
                      });
                    } else {
                      Swal.fire({
                        title:
                          "Seleccione un detalle de certificación para certificar",
                        icon: "warning",
                        showCloseButton: true,
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                        focusCancel: true,
                      });
                    }
                  }}
                >
                  Certificar Seleccionados
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
        <MyDocument referencia={componentRef} rows={rows} user={user} />
      </div>
    </>
  );
}
