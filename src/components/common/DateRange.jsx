import { Autocomplete, Input, TextField } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { forwardRef, useState } from "react";
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
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export const DateRange = ({ id, value, field }) => {
  const [values, setValues] = useState({
    textmask: "(100) 000-0000",
    numberformat: "1320",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const apiRef = useGridApiContext();
  return [
    // <Autocomplete
    //   options={timeSlots}
    //   sx={{ width: 80 }}
    //   defaultValue={value.split("-")[0]}
    //   onChange={(e, value) => {
    //     console.log(value);
    //     apiRef.current.setEditCellValue({
    //       id: id,
    //       field,
    //       value,
    //     });
    //   }}
    //   disableClearable
    //   renderInput={(params) => (
    //     <TextField {...params} value={value.split("-")[0]} />
    //   )}
    // />,
    // <Autocomplete
    //   options={timeSlots}
    //   defaultValue={() => {
    //     if (typeof value === "string") {
    //       return value.split("-")[1];
    //     } else {
    //       if (value.length < 10) {
    //         return `0${value}`;
    //       }
    //     }
    //   }}
    //   onChange={(e, value) => {
    //     console.log(value);
    //     apiRef.current.setEditCellValue({
    //       id: id,
    //       field,
    //       value,
    //     });
    //   }}
    //   sx={{ width: 80 }}
    //   disableClearable
    //   renderInput={(params) => (
    //     <TextField {...params} value={value.split("-")[1]} />
    //   )}
    // />,
    <Input
      value={values.textmask}
      onChange={handleChange}
      name="textmask"
      id="formatted-text-mask-input"
      inputComponent={TextMaskCustom}
    />,
  ];
};
