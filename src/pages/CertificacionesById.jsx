import {
  Autocomplete,
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
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../components/common/Table";
import AppLayout from "../components/layouts/AppLayout";
import { AuthContextTheme } from "../context/Auth";
import { certificacionesByIdData } from "../mock/data";
import usePermissions from "../hook/usePermissions";
import Swal from "sweetalert2";

/*+-----------------------------------------------------------------------------------------+
  Este componente es el que se encarga de mostrar la tabla de certificaciones por id
  se eliminara en el momento que se conecte con la api...
+-------------------------------------------------------------------------------------------+*/

export default function Certificaciones() {
  const location = useLocation();
  const [rows, setRows] = useState(false);
  const { user } = useContext(AuthContextTheme);
  const [periodo, setPeriodo] = useState(new Date(location.state.data.periodo));
  const [state, setState] = useState(location.state.data.estado);
  const permissions = usePermissions(location.state.data.estado);
  const navigate = useNavigate();

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
  }, [location.state.data.estado]);

  // One time slot every 30 minutes.
  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${
        index % 2 === 0 ? "00" : "30"
      }`
  );

  const colums = [
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
      getActions: ({ row }) => [
        <Autocomplete
          options={timeSlots}
          sx={{ width: 100 }}
          value={row?.from}
          disableClearable
          readOnly
          renderInput={(params) => <TextField {...params} value={row?.from} />}
        />,
        <Autocomplete
          options={timeSlots}
          value={row?.to}
          sx={{ width: 100 }}
          disableClearable
          readOnly
          renderInput={(params) => <TextField {...params} value={row?.to} />}
        />,
      ],
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
        console.log("yes");
        // console.log("navegadok")
      }
    });
  };

  const handleSave = () => {
    Swal.fire({
      title: "Seguro que desea Guardar?",
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
        setState("I");
        navigate("/");
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
          <DatePicker
            views={["year", "month"]}
            openTo="month"
            label="Período de la Certificación"
            value={periodo}
            onChange={(newValue) => {
              setPeriodo(newValue);
              setRows(true);
            }}
            renderInput={(params) => (
              <TextField variant="standard" {...params} />
            )}
          />
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
              data={rows}
              EmptyMessage="No hay datos"
              from="admin-cert"
              columns={colums}
              dataRows={certificacionesByIdData}
              isCellEditable={() => permissions.canEdit}
              style={{ height: "calc(100vh - 250px)", width: "100%" }}
            />
            {permissions.canChangeState && (
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

            {permissions.canSign && (
              <Button
                sx={{ float: "right", margin: "10px 5px" }}
                variant="contained"
                onClick={handleSign}
              >
                Firmar
              </Button>
            )}
            <Button
              sx={{ float: "right", margin: "10px 5px" }}
              variant="contained"
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Paper>
        </Box>
      </AppLayout>
    </>
  );
}
