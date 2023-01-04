import { masterCertificationList } from "../../services";

export const getListaTramites = (cuil, setRows) => {
  const data = masterCertificationList(cuil)
    .then((response) => {
      console.log(response);
      if (response.statusText === "OK") {
        if (response.data.length === 0) {
          setRows([]);
        }
        setRows(response.data);
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
