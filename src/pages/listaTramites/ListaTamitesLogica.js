import { masterCertificationList } from "../../services";

const fromatDate = (date) => new Date(date).toLocaleDateString();

export const getListaTramites = (cuil, setRows) => {
  const data = masterCertificationList(cuil)
    .then((response) => {
      console.log(response);
      if (response.statusText === "OK") {
        if (response.data.length === 0) {
          setRows([]);
        } else {
          let data = {
            ...response.data,
            fechaCreacion: fromatDate(response.data.fechaCreacion),
            fechaCertificacion: fromatDate(response.data.fechaCertificacion),
            fechaDecision: fromatDate(response.data.fechaDecision),
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
