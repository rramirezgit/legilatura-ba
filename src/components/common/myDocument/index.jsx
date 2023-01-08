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
import React, { useContext } from "react";
import { AuthContextTheme } from "../../../context/Auth";
import logo from "../../../imgs/logo.svg";
import { colums } from "./colums";

const MyDocument = ({ referencia, rows }) => {
  const PDFDocument = () => {
    const rowsPerPage = 11;
    const pages = Math.ceil(rows.length / rowsPerPage);
    const pagesArray = Array.from(Array(pages).keys());

    const { user } = useContext(AuthContextTheme);

    const List = (
      <div>
        {pagesArray.map((page, index) => {
          const rowsPage = rows.slice(
            index * rowsPerPage,
            (index + 1) * rowsPerPage
          );
          return (
            <div style={{ padding: "30px" }}>
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
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {colums.map((col, index) => {
                          return (
                            <TableCell key={index}>{col.headerName}</TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <tbody>
                      {rowsPage.map((row, index) => {
                        return (
                          <TableRow key={index}>
                            {colums.map((col, index) => {
                              return (
                                <TableCell key={index}>
                                  {row[col.field]}
                                </TableCell>
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
                  marginTop: "100px",
                }}
              >
                <div>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                  >
                    {`Firma:   ${user.name}`}
                  </Typography>
                  <Divider
                    style={{
                      width: "300px",
                    }}
                  />
                  {/* fecha de hoy */}
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#000000",
                      marginLeft: "50px",
                    }}
                  >
                    {new Date().toLocaleDateString()}
                  </Typography>
                </div>
              </div>

              {/* number PAge */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#000000",
                  }}
                >
                  Pagina {index + 1} de {pages}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    );

    return List;
  };

  return (
    <div ref={referencia}>
      <PDFDocument />
    </div>
  );
};

export default MyDocument;
