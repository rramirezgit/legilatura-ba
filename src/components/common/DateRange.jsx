import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

// One time slot every 30 minutes.
const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) =>
    `${index < 20 ? "0" : ""}${Math.floor(index / 2)}:${
      index % 2 === 0 ? "00" : "30"
    }`
);

export const DateRange = (row) => {
  const [from, setFrom] = useState(row?.from);
  const [to, setTo] = useState(row?.to);

  return [
    <Autocomplete
      options={timeSlots}
      sx={{ width: 100 }}
      defaultValue={from}
      disableClearable
      onChange={(event, newValue) => {
        setFrom(newValue);
      }}
      renderInput={(params) => <TextField {...params} />}
    />,
    <Autocomplete
      options={timeSlots}
      sx={{ width: 100 }}
      defaultValue={to}
      disableClearable
      onChange={(event, newValue) => {
        setTo(newValue);
      }}
      renderInput={(params) => <TextField {...params} />}
    />,
  ];
};
