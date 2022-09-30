import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "./CustomComponentTable";
import { useNavigate } from "react-router-dom";

export default function Table({ data, from, columns, dataRows, style }) {
  const navigate = useNavigate();
  return (
    <div style={style}>
      <DataGrid
        disableDensitySelector
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
          if (params.row.estado === "B") {
            navigate(`/administracion_certificaciones/${params.row.id}`);
          }
        }}
      />
    </div>
  );
}
