import { Autocomplete, TextField } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";

// One time slot
const timeSlots = Array.from(new Array(24)).map((_, i) => {
  const hour = i < 10 ? `0${i}` : i;
  return `${hour}`;
});

export const DateRange = ({ id, value, field }) => {
  const apiRef = useGridApiContext();
  return [
    <Autocomplete
      options={timeSlots}
      sx={{ width: 80 }}
      defaultValue={value.split("-")[0]}
      onChange={(e, value) => {
        console.log(value);
        apiRef.current.setEditCellValue({
          id: id,
          field,
          value,
        });
      }}
      disableClearable
      renderInput={(params) => (
        <TextField {...params} value={value.split("-")[0]} />
      )}
    />,
    <Autocomplete
      options={timeSlots}
      defaultValue={value.split("-")[1]}
      onChange={(e, value) => {
        console.log(value);
        apiRef.current.setEditCellValue({
          id: id,
          field,
          value,
        });
      }}
      sx={{ width: 80 }}
      disableClearable
      renderInput={(params) => (
        <TextField {...params} value={value.split("-")[1]} />
      )}
    />,
  ];
};
