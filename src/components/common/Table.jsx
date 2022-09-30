import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "./CustomComponentTable";
import { useLocation, useNavigate } from "react-router-dom";

export default function Table({
  data,
  from,
  columns,
  dataRows,
  style,
  isCellEditable,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={style}>
      <DataGrid
        disableDensitySelector
        isCellEditable={isCellEditable}
        localeText={{
          toolbarColumns: "Columnas",
          toolbarFilters: "Filtros",
          toolbarExport: "Exportar",
        }}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          Toolbar: from === "admin-cert" ? undefined : GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        rows={dataRows}
        columns={columns}
        disableSelectionOnClick={from === "admin-cert"}
        onRowClick={(params) => {
          if (location.pathname === "/") {
            navigate(`/administracion_certificaciones/${params.row.id}`, {
              state: { data: params.row },
            });
          }
        }}
      />
    </div>
  );
}
