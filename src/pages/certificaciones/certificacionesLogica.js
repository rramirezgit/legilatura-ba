import Swal from "sweetalert2";
import {
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
      console.log(response);
      if (response.length > 0) {
        fnSetRows(filtraPeriodo(response, periodo));
      } else {
        fnSetRows([]);
      }
    })
    .catch((error) => {
      console.log(error);
      fnSetRows([]);
    });
};

const filtraPeriodo = (data, periodo) => {
  return data.filter((item) => item.periodo === periodo);
};

export const postMasterCertification = async ({ data, fnSetRows }) => {
  newMasterCertification(data)
    .then((response) => {
      if (Object.keys(response).length > 0) {
        getMasterCertificationList({
          cuil: data.cuil,
          periodo: data.periodo,
          fnSetRows,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleSave = (data) => {
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
            horario: `${item.from} - ${item.to}`,
            novedad: item.novedades,
            estado: `${item.certificado}`,
          };

          return editDetailCertificationList(item.id, body);
        })
      )
        .then((response) => {
          console.log(response);
          message("Guardado con exito", "success", () => {});
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
