// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });

/* api con fetch */

const api = {
  get: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  post: async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cors-Access-Control-Allow-Origin": "*",
        "no-cors": "*",
      },
    });
    const dataResponse = await response.json();
    return dataResponse;
  },
  put: async (url, data) => {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponse = await response.json();
    return dataResponse;
  },
  delete: async (url) => {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const dataResponse = await response.json();
    return dataResponse;
  },
};

/* API para autenticar en AD y verificar si tiene perfil asignado y los datos relacionados al usuario. */
export const login = (login, password) => {
  return api.post(`${process.env.REACT_APP_API_URL}api/UserAccess`, {
    login,
    password,
  });
};

/* Lista los tramites de un cuil */
export const masterCertificationList = (cuil) => {
  return api.get(
    `${process.env.REACT_APP_API_URL}api/MasterCertificationList/${cuil}`
  );
};
/* Actualiza Fecha de certificación, de decisión y/o estado */
export const editMasterCertificationList = (id, data) => {
  return api.put(
    `${process.env.REACT_APP_API_URL}api/MasterCertificationList/${id}`,
    data
  );
};
/* Lista los detalles de una certificacion */
export const detailCertificationList = (id) => {
  return api.get(
    `${process.env.REACT_APP_API_URL}api/DetailCertificationList/${id}`
  );
};
/* Actualiza horario, novedad y/o estado del detalle de certificación */
export const editDetailCertificationList = (id, data) => {
  return api.put(
    `${process.env.REACT_APP_API_URL}api/DetailCertificationList/${id}`,
    data
  );
};
/* Crea una nueva cabecera de certificación. Este proceso incluye la creación de los detalles de acuerdo a los asociados a la dependencia del usuario que estén asigandos en SGP */
export const newMasterCertification = (data) => {
  return api.post(
    `${process.env.REACT_APP_API_URL}api/MasterCertification`,
    data
  );
};
/* Actualiza una certificación */
export const editMasterCertification = (id, data) => {
  return api.put(
    `${process.env.REACT_APP_API_URL}api/MasterCertification/${id}`,
    data
  );
};
/* Elimina una certificación */
export const deleteMasterCertification = (id) => {
  return api.delete(
    `${process.env.REACT_APP_API_URL}api/MasterCertification/${id}`
  );
};
/* Crea un nuevo detalle de certificación */
export const newDetailCertification = (data) => {
  return api.post(
    `${process.env.REACT_APP_API_URL}api/DetailCertification`,
    data
  );
};
/* Actualiza un detalle de certificación */
export const editDetailCertification = (id, data) => {
  return api.put(
    `${process.env.REACT_APP_API_URL}api/DetailCertification/${id}`,
    data
  );
};
/* Elimina un detalle de certificación */
export const deleteDetailCertification = (id) => {
  return api.delete(
    `${process.env.REACT_APP_API_URL}api/DetailCertification/${id}`
  );
};
/* Obtiene toda la información relacionada con algún agente */
export const getAgent = (cuil) => {
  return api.get(`${process.env.REACT_APP_API_URL}api/GetAgent/${cuil}`);
};
/* Obtiene todos los agentes asociados a una dependencia */
export const getAgentsByDependence = (idDependence) => {
  return api.get(
    `${process.env.REACT_APP_API_URL}api/GetAgentsDependency/${idDependence}`
  );
};
/* Obtiene todos los agentes que pertencian a la dependencia hasta el el mes informado en el perido (yyyy-mm-dd) */
export const getAgentsByDependenceAndPeriod = (idDependence, period) => {
  return api.get(
    `${process.env.REACT_APP_API_URL}api/GetAgentsDependency/${idDependence}/${period}`
  );
};
/* Lista todos los perfiles existentes */
export const getProfiles = () => {
  return api.get(`${process.env.REACT_APP_API_URL}api/Profile`);
};
/* Crea un nuevo perfil */
export const newProfile = (data) => {
  return api.post(`${process.env.REACT_APP_API_URL}api/Profile`, data);
};
/* Consulta un perfil especifico */
export const getProfile = (id) => {
  return api.get(`${process.env.REACT_APP_API_URL}api/Profile/${id}`);
};
/* Actualiza un perfil */
export const editProfile = (id, data) => {
  return api.put(`${process.env.REACT_APP_API_URL}api/Profile/${id}`, data);
};
/* Elimina un perfil */
export const deleteProfile = (id) => {
  return api.delete(`${process.env.REACT_APP_API_URL}api/Profile/${id}`);
};
/* Lista todos los perfiles asociados a un usuario */
export const getProfilesByUser = () => {
  return api.get(`${process.env.REACT_APP_API_URL}api/UserProfile`);
};
/* Crea una nueva asociacion de usuario y perfil */
export const newUserProfile = (data) => {
  return api.post(`${process.env.REACT_APP_API_URL}api/UserProfile`, data);
};
/* Consulta una asociacion de usuario y perfil */
export const getUserProfile = (id) => {
  return api.get(`${process.env.REACT_APP_API_URL}api/UserProfile/${id}`);
};
/* Actualiza una asociacion de usuario y perfil */
export const editUserProfile = (id, data) => {
  return api.put(`${process.env.REACT_APP_API_URL}api/UserProfile/${id}`, data);
};
/* Elimina una asociacion de usuario y perfil */
export const deleteUserProfile = (id) => {
  return api.delete(`${process.env.REACT_APP_API_URL}api/UserProfile/${id}`);
};
/* Persiste certificación en SGP, mediante el ID de la certificación NO SGP */
export const persistCertification = (id) => {
  return api.put(
    `${process.env.REACT_APP_API_URL}api/ConfirmCertification/${id}`
  );
};
