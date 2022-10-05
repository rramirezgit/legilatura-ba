import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

export default function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="51"
        height="51"
        viewBox="0 0 51 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="51" height="51" fill="url(#pattern0)" />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              href="#image0_78_4329"
              transform="translate(-0.0240964) scale(0.0120482)"
            />
          </pattern>
          <image
            id="image0_78_4329"
            width="87"
            height="83"
            href="data:image/png;base64,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"
          />
        </defs>
      </svg>

      <Box sx={{ mt: 1 }}>Debe seleccionar el período de Certificación a Gestionar</Box>
    </StyledGridOverlay>
  );
}
