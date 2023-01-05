import { Autocomplete, TextField } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import React, { useState } from "react";

// One time slot
const timeSlots = Array.from(new Array(24)).map((_, i) => {
  const hour = i < 10 ? `0${i}` : i;
  return `${hour}`;
});

export const DateRange = (row) => {
  const apiRef = useGridApiContext();
  return [
    <Autocomplete
      options={timeSlots}
      sx={{ width: 80 }}
      defaultValue={row?.horario.split("-")[0]}
      onChange={(e, value) => {
        console.log(value);
        row.horario = `${value}-${row?.horario.split("-")[1]}`;
        apiRef.current.setEditCellValue({
          id: row.id,
          field: "horario",
          value: row.horario,
        });
      }}
      disableClearable
      renderInput={(params) => (
        <TextField {...params} value={row?.horario.split("-")[0]} />
      )}
    />,
    <Autocomplete
      options={timeSlots}
      defaultValue={row?.horario.split("-")[1]}
      onChange={(e, value) => {
        console.log(value);
        row.horario = `${row?.horario.split("-")[0]}-${value}`;
        apiRef.current.setEditCellValue({
          id: row.id,
          field: "horario",
          value: row.horario,
        });
      }}
      sx={{ width: 80 }}
      disableClearable
      renderInput={(params) => (
        <TextField {...params} value={row?.horario.split("-")[1]} />
      )}
    />,
  ];
};
