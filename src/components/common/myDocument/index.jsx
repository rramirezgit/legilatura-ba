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
import React from "react";
import logo from "../../../imgs/logo.svg";
import { colums } from "./colums";

const MyDocument = ({ referencia, rows }) => {
  const rowsPerPage = 14;
  const pages = Math.ceil(rows.length / rowsPerPage);
  const pagesArray = Array.from(Array(pages).keys());

  const PDFDocument = ({ rowsPage }) => {
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
            height: "400px !important",
            width: "100%",
            marginTop: "10px",
          }}
        >
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
                {rowsPage.map((row, index) => {
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

  return (
    <>
      {pagesArray.map((page, index) => {
        const rowsPage = rows.slice(
          index * rowsPerPage,
          (index + 1) * rowsPerPage
        );

        return <PDFDocument rowsPage={rowsPage} />;
      })}
    </>
  );
};

export default MyDocument;
