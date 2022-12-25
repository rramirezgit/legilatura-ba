import {
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
