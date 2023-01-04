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
          let data = response.data.map((item) => {
            return {
              ...item,
              fechaCreacion: item?.fechaCreacion
                ? fromatDate(item.fechaCreacion)
                : null,
              fechaCertificacion: item?.fechaCertificacion
                ? fromatDate(item.fechaCertificacion)
                : null,
              fechaDecision: item?.fechaDecision
                ? fromatDate(item.fechaDecision)
                : null,
            };
          });

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
