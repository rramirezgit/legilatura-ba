import {
  Divider,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import logo from "../../../imgs/logo.svg";
import { colums } from "./colums";

const MyDocument = ({ referencia, rows }) => {
  return (
    <div ref={referencia} style={{ padding: "30px" }}>
      <img src={logo} alt="legislatura-ba" />
      <Typography
        variant="h6"
        sx={{
          textAlign: "right",
          fontWeight: "bold",
          color: "#000000",
          marginTop: "10px",
        }}
      >
        {new Date().toLocaleDateString()}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#000000",
          marginTop: "10px",
        }}
      >
        Certificaciones de Servicios Mensuales
      </Typography>

      <div
        style={{
          height: "calc(80vh - 250px)",
          width: "100%",
          marginTop: "10px",
        }}
      >
        {/* <DataGrid rows={rows} columns={colums} /> */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {colums.map((col, index) => {
                  return <TableCell key={index}>{col.headerName}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <tbody>
              {rows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {colums.map((col, index) => {
                      return (
                        <TableCell key={index}>{row[col.field]}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </TableContainer>
      </div>
      {/* signature */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          marginTop: "50px",
        }}
      >
        <div>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            Firma
          </Typography>
          <Divider
            style={{
              width: "300px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyDocument;
