import Swal from "sweetalert2";
import {
  detailCertificationList,
  editDetailCertificationList,
} from "../../services";

export const handleSign = (navigate, handlePrint) => {
  Swal.fire({
    title: "Seguro que desea Firmar?",
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
      // setState("I");
      // navigate("/");
      console.log("yes");
      handlePrint();
      // console.log("navegadok")
    }
  });
};

export const handleSave = (navigate, data) => {
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
          Swal.fire({
            title: "Guardado Correctamente",
            icon: "success",
            showCloseButton: true,
            showCancelButton: false,
            confirmButtonText: "Ok",
            focusCancel: true,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Error al Guardar",
            icon: "error",
            showCloseButton: true,
            showCancelButton: false,
            confirmButtonText: "Ok",
            focusCancel: true,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        });
    }
  });
};

export const getDetailCertificationList = async (id, fnSetRows) => {
  detailCertificationList(id)
    .then((response) => {
      console.log(response);
      if (response.length > 0) {
        fnSetRows(response);
      } else {
        fnSetRows([]);
      }
    })
    .catch((error) => {
      console.log(error);
      fnSetRows([]);
    });
};