import Swal from "sweetalert2";
import {
  detailCertificationList,
  editDetailCertificationList,
  masterCertificationList,
  newMasterCertification,
} from "../../services";

export const getMasterCertificationList = async ({
  cuil,
  periodo,
  fnSetPeriodo = null,
  fnSetRows,
}) => {
  if (fnSetPeriodo) {
    fnSetPeriodo(periodo);
  }
  masterCertificationList(cuil)
    .then((response) => {
      if (response.statusText === "OK") {
        if (response.data.length) {
          getDetailsByIdList({ data: response.data, periodo, fnSetRows });
        } else {
          fnSetRows([]);
        }
      } else {
        fnSetRows([]);
      }
    })
    .catch((error) => {
      console.log(error);
      fnSetRows([]);
    });
};

const getDetailsByIdList = async ({ data, periodo, fnSetRows }) => {
  let formatPeriodo = new Date(periodo).toISOString().slice(0, 10);
  let dataFiltered = filtraPeriodo(data, formatPeriodo);
  let idList = [];
  if (dataFiltered.length) {
    idList = dataFiltered.map((item) => item.id);
    Promise.all(
      idList.map((id) => {
        return detailCertificationList(id);
      })
    ).then((response) => {
      if (response.length) {
        let data = [];
        response.forEach((itemResponse) => {
          if (itemResponse.data.length) {
            itemResponse.data.forEach((item) => {
              data.push({
                ...item,
                estado: item.estado === "0" ? false : true,
              });
            });
          }
        });
        fnSetRows(data);
      }
    });
  } else {
    fnSetRows([]);
  }
};

const filtraPeriodo = (data, periodo) => {
  return data.filter(
    (item) =>
      new Date(item.periodo).toISOString().slice(0, 7) ===
      new Date(periodo).toISOString().slice(0, 7)
  );
};

export const postMasterCertification = async ({ data, fnSetRows }) => {
  newMasterCertification(data)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        getMasterCertificationList({
          cuil: data.cuitCertificante,
          periodo: data.periodo,
          fnSetRows,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleSave = ({ data, fnSetRows, periodo, cuil }) => {
  let formatPeriodo = new Date(periodo).toISOString().slice(0, 10);
  Swal.fire({
    title: "Seguro que desea Guardar?",
    icon: "warning",
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: "Si",
    cancelButtonText: "No",
    focusCancel: true,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonAriaLabel: "Thumbs down",
  }).then((result) => {
    if (result.isConfirmed) {
      Promise.all(
        data.map((item) => {
          let body = {
            id: item.id,
            horario: item.horario,
            novedad: item.novedad,
            estado: "1",
          };

          return editDetailCertificationList(item.id, body);
        })
      )
        .then((response) => {
          console.log(response);
          message("Guardado con exito", "success", () => {
            getMasterCertificationList({
              cuil,
              periodo: formatPeriodo,
              fnSetRows,
            });
          });
        })
        .catch((error) => {
          console.log(error);
          message("Error al guardar", "error", () => {});
        });
    }
  });
};

const message = (title, icon, fn) => {
  Swal.fire({
    title,
    icon,
    showCloseButton: true,
    showCancelButton: false,
    confirmButtonText: "Ok",
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed) {
      fn();
    }
  });
};
