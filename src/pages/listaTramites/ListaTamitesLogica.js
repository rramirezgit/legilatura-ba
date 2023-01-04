import { masterCertificationList } from "../../services";

const fromatDate = (date) => new Date(date).toLocaleDateString();

export const getListaTramites = (cuil, setRows) => {
  const data = masterCertificationList(cuil)
    .then((response) => {
      console.log("masterCertificationList", response);
      if (response.statusText === "OK") {
        if (response.data.length === 0) {
          setRows([]);
        } else {
          let data = {
            ...response.data,
            fechaCreacion: response?.data?.fechaCreacion
              ? fromatDate(response.data.fechaCreacion)
              : null,
            fechaCertificacion: response?.data?.fechaCertificacion
              ? fromatDate(response.data.fechaCertificacion)
              : null,
            fechaDecision: response?.data?.fechaDecision
              ? fromatDate(response.data.fechaDecision)
              : null,
          };

          setRows(data);
        }
      } else {
        setRows([]);
      }
    })
    .catch((error) => {
      console.log(error);
      setRows([]);
    });
  setRows(data);
};
