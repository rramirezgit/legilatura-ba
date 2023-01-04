export const Users = [
  {
    DisplayName: "RRamirez",
    Mail: "RRamirez@legislatura.com",
    Cuil: "20000000100",
    IdProfile: "",
    IdDependency: "532",
    IsAuthenticated: true,
    Error: "",
    name: "Ricardo Ramirez",
    password: "123456",
    ProfileDesc: "Asistente",
    DependencyDesc: "Dip. de la Torre Cecilia",
  },
  {
    DisplayName: "SCosta",
    Mail: "SCosta@legislatura.com",
    Cuil: "20000000100",
    IdProfile: "",
    IdDependency: "532",
    IsAuthenticated: "",
    Error: "",
    name: "Sebastina Costa",
    password: "123456",
    ProfileDesc: "Director",
    DependencyDesc: "Dip. de la Torre Cecilia",
  },
  {
    DisplayName: "SBerdia",
    Mail: "SBerdia@legislatura.com",
    Cuil: "20000000100",
    IdProfile: "",
    IdDependency: "532",
    IsAuthenticated: "",
    Error: "",
    name: "Sebastian Berdia",
    password: "123456",
    ProfileDesc: "RRHH",
    DependencyDesc: "Dip. de la Torre Cecilia",
  },
];

export const columnsInbox = [
  {
    field: "id_tipotramite",
    width: 130,
    headerName: "Tipo Tramite",
    editable: false,
  },
  {
    field: "id_certificacion",
    width: 130,
    headerName: "ID Trámite",
    editable: false,
  },
  {
    field: "periodo",
    width: 100,
    headerName: "Periodo",
    editable: false,
    type: "text",
  },
  {
    field: "dependencia",
    headerName: "Dependencia ",
    width: 220,
    editable: false,
    type: "text",
  },
  {
    field: "fecha_creacion",
    headerName: "Fecha creacion ",
    type: "dateTime",
    width: 130,
    editable: false,
  },
  {
    field: "cuit_certificante",
    width: 140,
    headerName: "Cuit certificante ",
    editable: false,
  },
  {
    field: "fecha_certificacion",
    headerName: "Fecha certificacion ",
    width: 140,
    type: "dateTime",
    editable: false,
  },
  {
    field: "fecha_aprobacion_hr",
    width: 160,
    headerName: "Fecha Aprob./Rechazo",
    editable: false,
  },
  {
    field: "estado",
    headerName: "Estado",
    type: "text",
    editable: false,
  },
  //{
  //  field: "claves",
  //  headerName: "Claves",
  //  type: "text",
  //  editable: false,
  //},
];

export const inboxData = [
  {
    id: 0,
    id_tipotramite: "Certificaciones",
    id_certificacion: "258684",
    periodo: "2021/01",
    dependencia: "Dip. de la Torre Cecilia",
    fecha_creacion: "2022/09/11",
    cuit_certificante: "20-26404184-4",
    fecha_certificacion: "",
    fecha_aprobacion_hr: "",
    estado: "B",
    claves: "123568",
  },
  {
    id: 1,
    id_tipotramite: "Certificaciones",
    id_certificacion: "258685",
    periodo: "2021/01",
    dependencia: "Dip. de la Torre Cecilia",
    fecha_creacion: "2022/09/12",
    cuit_certificante: "23-21404184-4",
    fecha_certificacion: "2022/09/24",
    fecha_aprobacion_hr: "",
    estado: "I",
    claves: "12345678",
  },
  {
    id: 2,
    id_tipotramite: "Certificaciones",
    id_certificacion: "258686",
    periodo: "2021/01",
    dependencia: "D.G Tecnica  Y Legales",
    fecha_creacion: "2022/09/13",
    cuit_certificante: "20-36404184-4",
    fecha_certificacion: "202/09/25",
    fecha_aprobacion_hr: "",
    estado: "I",
    claves: "12345678",
  },
  {
    id: 3,
    id_tipotramite: "Certificaciones",
    id_certificacion: "258687",
    periodo: "2021/02",
    dependencia: "Dip. de la Torre Cecilia",
    fecha_creacion: "2022/09/11",
    cuit_certificante: "20-52404184-4",
    fecha_certificacion: "2022/09/22",
    fecha_aprobacion_hr: "",
    estado: "I",
    claves: "12345678",
  },
  {
    id: 4,
    id_tipotramite: "Certificaciones",
    id_certificacion: "258688",
    periodo: "2021/03",
    dependencia: "Dip. de la Torre Cecilia",
    fecha_creacion: "2022/09/21",
    cuit_certificante: "20-46404184-4",
    fecha_certificacion: "2022/09/25",
    fecha_aprobacion_hr: "2022/0926",
    estado: "A",
    claves: "12345678",
  },
  {
    id: 5,
    id_tipotramite: "Certificaciones",
    id_certificacion: "258689",
    periodo: "2021/04",
    dependencia: "Dip. de la Torre Cecilia",
    fecha_creacion: "2022/09/11",
    cuit_certificante: "20-16404184-4",
    fecha_certificacion: "2022/09/25",
    fecha_aprobacion_hr: "2022/09/26",
    estado: "A",
    claves: "12345678",
  },
  {
    id: 6,
    id_tipotramite: "Certificaciones",
    id_certificacion: "258690",
    periodo: "2021/02",
    dependencia: "D.G Tecnica Y Legales",
    fecha_creacion: "2022/09/13",
    cuit_certificante: "23-33404184-4",
    fecha_certificacion: "2022/09/01",
    fecha_aprobacion_hr: "",
    estado: "R",
    claves: "12345678",
  },
  {
    id: 7,
    id_tipotramite: "Alta Legajo",
    id_certificacion: "34343691",
    periodo: "2021/05/15",
    dependencia: "Dip. de la Torre Cecilia",
    fecha_creacion: "2022/09/11",
    cuit_certificante: "20-21404134-4",
    fecha_certificacion: "2022/09/01",
    fecha_aprobacion_hr: "",
    estado: "I",
    claves: "12345678",
  },
];

export const dataCertificaciones = [
  {
    id: 0,
    nombre: "Perez Juan",
    dni: 12345678,
    legajo: 123,
    from: "10:00",
    to: "18:00",
    novedades: "Novedad 1",
    certificado: true,
  },
  {
    id: 1,
    nombre: "Gomez Maria",
    dni: 87654321,
    legajo: 456,
    from: "00:00",
    to: "10:00",
    novedades: "Novedad 2",
    certificado: false,
  },
  {
    id: 2,
    nombre: "Gonzalez Juan",
    dni: 12345678,
    legajo: 789,
    from: "12:00",
    to: "10:00",
    novedades: "Novedad 3",
    certificado: true,
  },
  {
    id: 3,
    nombre: "Perez Maria",
    dni: 87654321,
    legajo: 101,
    from: "10:00",
    to: "15:00",
    novedades: "Novedad 4",
    certificado: false,
  },
  {
    id: 4,
    nombre: "Gomez Juan",
    dni: 12345678,
    legajo: 112,
    from: "00:00",
    to: "10:00",
    novedades: "Novedad 5",
    certificado: true,
  },
];

export const certificacionesByIdData = [
  {
    id: 0,
    nombre: "Perez Juan",
    dni: 12345678,
    legajo: 123,
    from: "10:00",
    to: "18:00",
    novedades: "Novedad 1",
    certificado: true,
  },
  {
    id: 1,
    nombre: "Gomez Maria",
    dni: 87654321,
    legajo: 456,
    from: "00:00",
    to: "10:00",
    novedades: "Novedad 2",
    certificado: false,
  },
  {
    id: 2,
    nombre: "Gonzalez Juan",
    dni: 12345678,
    legajo: 789,
    from: "00:00",
    to: "10:00",
    novedades: "Novedad 3",
    certificado: true,
  },
  {
    id: 3,
    nombre: "Perez Maria",
    dni: 87654321,
    legajo: 101,
    from: "01:00",
    to: "12:00",
    novedades: "Novedad 4",
    certificado: false,
  },
  {
    id: 4,
    nombre: "Gomez Juan",
    dni: 12345678,
    legajo: 112,
    from: "10:00",
    to: "18:00",
    novedades: "Novedad 5",
    certificado: true,
  },
];
