import { Autocomplete, Input, TextField } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { useState } from "react";
import { IMaskInput } from "react-imask";
// One time slot
const timeSlots = Array.from(new Array(24)).map((_, i) => {
  const hour = i < 10 ? `0${i}` : i;
  return `${hour}`;
});

const TextMaskCustom = (props) => {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#0-#0"
      definitions={{
        "#": /[0-2]/,
        0: /[0-9]/,
      }}
      onAccept={(value) => {
        let from = parseInt(value.split("-")[0]);
        let to = parseInt(value.split("-")[1]);
        if (from > 23) {
          from = "23";
        }
        if (to > 23) {
          to = "23";
        }
        value = `${from}-${to}`;
        onChange({ target: { name: props.name, value } });
      }}
      overwrite
    />
  );
};

export const DateRange = ({ id, value, field }) => {
  console.log(value);
  const handleChange = (event) => {
    console.log(event.target.value);
    apiRef.current.setEditCellValue({ id, field, value: event.target.value });
  };
  const apiRef = useGridApiContext();
  return [
    <Input
      value={value}
      onChange={handleChange}
      name="textmask"
      id="formatted-text-mask-input"
      inputComponent={TextMaskCustom}
    />,
  ];
};
