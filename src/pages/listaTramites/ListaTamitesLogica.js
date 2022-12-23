import { masterCertificationList } from "../../services";

export const getListaTramites = (cuil) => {
  masterCertificationList(cuil)
    .then((response) => {
      console.log(response.data);
    })
    .then((error) => {
      console.log(error);
    });
};
