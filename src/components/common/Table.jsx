import * as React from "react";
import {
  DataGrid,
  GridCellEditStopReasons,
  GridToolbar,
} from "@mui/x-data-grid";
import CustomNoRowsOverlay from "./CustomComponentTable";
import { useLocation, useNavigate } from "react-router-dom";

export default function Table({
  from,
  columns,
  onSelectionModelChange,
  dataRows,
  style,
  EmptyMessage,
  isCellEditable,
  onCellEditCommit = () => {},
}) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={style}>
      <DataGrid
        disableDensitySelector
        hideFooterSelectedRowCount
        checkboxSelection={location.pathname !== "/"}
        isCellEditable={isCellEditable}
        localeText={{
          toolbarColumns: "Columnas",
          toolbarFilters: "Filtros",
          toolbarExport: "Exportar",
        }}
        components={{
          NoRowsOverlay: () => CustomNoRowsOverlay({ Message: EmptyMessage }),
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
        onCellEditCommit={onCellEditCommit}
        disableSelectionOnClick={from === "admin-cert"}
        onRowClick={(params) => {
          if (location.pathname === "/") {
            navigate(`/administracion_certificaciones/${params.row.id}`, {
              state: { data: params.row },
            });
          }
        }}
        onSelectionModelChange={onSelectionModelChange}
        experimentalFeatures={{ newEditingApi: true }}
        onCellEditStop={(params, event) => {
          if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            event.defaultMuiPrevented = true;
          }
        }}
      />
    </div>
  );
}
