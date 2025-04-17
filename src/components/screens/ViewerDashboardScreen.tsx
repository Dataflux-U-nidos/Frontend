import DashboardTemplate from "../templates/Dashboard";

const dataUniversidades = [
  { name: "Pontificia Universidad Javeriana", total: 1815 },
  { name: "Universidad de los Andes", total: 1231 },
  { name: "Universidad del Rosario", total: 1038 },
  { name: "Universidad Externado de Colombia", total: 952 },
  { name: "UDCA", total: 851 },
  { name: "Escuela Colombiana de Ingeniería", total: 896 },
];

const dataCarreras = [
    { name: "Ingeniería de Sistemas", total: 1725 },
    { name: "Medicina", total: 1610 },
    { name: "Psicología", total: 1380 },
    { name: "Administración de Empresas", total: 1245 },
    { name: "Derecho", total: 1130 },
    { name: "Diseño Gráfico", total: 980 },
];
  

const dataUniversidadesBuscadas = [
    { name: 'Ene', Javeriana: 1800, Andes: 1200, Rosario: 1000, Externado: 850, UDCA: 700, ECI: 750 },
    { name: 'Feb', Javeriana: 1750, Andes: 1300, Rosario: 980, Externado: 870, UDCA: 710, ECI: 760 },
    { name: 'Mar', Javeriana: 1850, Andes: 1250, Rosario: 1020, Externado: 890, UDCA: 720, ECI: 770 },
    { name: 'Abr', Javeriana: 1900, Andes: 1280, Rosario: 1050, Externado: 910, UDCA: 730, ECI: 780 },
    { name: 'May', Javeriana: 2000, Andes: 1350, Rosario: 1070, Externado: 930, UDCA: 750, ECI: 800 },
    { name: 'Jun', Javeriana: 2100, Andes: 1400, Rosario: 1100, Externado: 950, UDCA: 770, ECI: 820 },
    { name: 'Jul', Javeriana: 2150, Andes: 1380, Rosario: 1080, Externado: 960, UDCA: 780, ECI: 830 },
];

const usersData = [
        {
          "Nombre": "Laura",
          "Apellidos": "Rodríguez Pérez",
          "Tipo Documento": "CC",
          "No. Documento": "1.010.223.456",
          "Edad": 18,
          "Nombre Acudiente": "-",
          "Celular Contacto": "3101234567",
          "Email Contacto": "laura.rodriguez@gmail.com"
        },
        {
          "Nombre": "Mateo",
          "Apellidos": "Sánchez Gómez",
          "Tipo Documento": "TI",
          "No. Documento": "1.045.678.901",
          "Edad": 16,
          "Nombre Acudiente": "Carolina Gómez",
          "Celular Contacto": "3017654321",
          "Email Contacto": "carolina.gomez@gmail.com"
        },
        {
          "Nombre": "Juliana",
          "Apellidos": "Ramírez Torres",
          "Tipo Documento": "CC",
          "No. Documento": "1.098.345.672",
          "Edad": 19,
          "Nombre Acudiente": "-",
          "Celular Contacto": "3129876543",
          "Email Contacto": "juli.ramirez@hotmail.com"
        },
        {
          "Nombre": "Samuel",
          "Apellidos": "Herrera Martínez",
          "Tipo Documento": "TI",
          "No. Documento": "1.032.456.789",
          "Edad": 17,
          "Nombre Acudiente": "Andrés Herrera",
          "Celular Contacto": "3142233445",
          "Email Contacto": "andres.herrera@gmail.com"
        },
        {
          "Nombre": "Valentina",
          "Apellidos": "Muñoz Rivas",
          "Tipo Documento": "CC",
          "No. Documento": "1.123.456.789",
          "Edad": 20,
          "Nombre Acudiente": "-",
          "Celular Contacto": "3179988776",
          "Email Contacto": "valentina.munoz@yahoo.com"
        },
        {
          "Nombre": "Nicolás",
          "Apellidos": "Díaz Rodríguez",
          "Tipo Documento": "TI",
          "No. Documento": "1.099.888.777",
          "Edad": 15,
          "Nombre Acudiente": "Camila Rodríguez",
          "Celular Contacto": "3201122334",
          "Email Contacto": "camila.rodriguez@outlook.com"
        },
        {
          "Nombre": "Mariana",
          "Apellidos": "López Mendoza",
          "Tipo Documento": "CC",
          "No. Documento": "1.222.333.444",
          "Edad": 21,
          "Nombre Acudiente": "-",
          "Celular Contacto": "3113344556",
          "Email Contacto": "mariana.lopez@gmail.com"
        },
        {
          "Nombre": "Emiliano",
          "Apellidos": "Torres Jiménez",
          "Tipo Documento": "TI",
          "No. Documento": "1.011.122.133",
          "Edad": 16,
          "Nombre Acudiente": "Laura Jiménez",
          "Celular Contacto": "3009876543",
          "Email Contacto": "laura.jimenez@hotmail.com"
        },
        {
          "Nombre": "Judith",
          "Apellidos": "Peres Arevalo",
          "Tipo Documento": "CC",
          "No. Documento": "6.490.875.490",
          "Edad": 21,
          "Nombre Acudiente": "-",
          "Celular Contacto": "3009876543",
          "Email Contacto": "berta15@valencia.biz"
        },
        {
          "Nombre": "Ignacio",
          "Apellidos": "Flores Urías",
          "Tipo Documento": "CC",
          "No. Documento": "6.343.708.678",
          "Edad": 18,
          "Nombre Acudiente": "-",
          "Celular Contacto": "3009876543",
          "Email Contacto": "claudiatorrez@bustos.net"
        },
        {
          "Nombre": "Minerva",
          "Apellidos": "Cardona Madera",
          "Tipo Documento": "CC",
          "No. Documento": "6662642103",
          "Edad": 21,
          "Nombre Acudiente": "-",
          "Celular Contacto": "3009876543",
          "Email Contacto": "dulce-maria32@hurtado.com"
        },
        {
          "Nombre": "Augusto",
          "Apellidos": "Cedillo Cornejo",
          "Tipo Documento": "CC",
          "No. Documento": "3965891272",
          "Edad": 18,
          "Nombre Acudiente": "-",
          "Celular Contacto": "3009876543",
          "Email Contacto": "qsalcedo@hotmail.com"
        },
        {
          "Nombre": "Jonás",
          "Apellidos": "Borrego Meléndez",
          "Tipo Documento": "TI",
          "No. Documento": "2631883398",
          "Edad": 15,
          "Nombre Acudiente": "Rodrigo Meza",
          "Celular Contacto": "3009876543",
          "Email Contacto": "de-jesusmarisela@gmail.com"
        },
        {
          "Nombre": "Samuel",
          "Apellidos": "Velásquez Casares",
          "Tipo Documento": "TI",
          "No. Documento": "1680231637",
          "Edad": 17,
          "Nombre Acudiente": "Camilo Alejandro Zelaya",
          "Celular Contacto": "3009876543",
          "Email Contacto": "garciaangelica@hotmail.com"
        }
];

const parsedUsersData = usersData.map(user => ({
  Nombre: user["Nombre"],
  Apellidos: user["Apellidos"],
  TipoDocumento: user["Tipo Documento"],
  NoDocumento: user["No. Documento"],
  Edad: user["Edad"],
  NombreAcudiente: user["Nombre Acudiente"],
  CelularContacto: user["Celular Contacto"],
  EmailContacto: user["Email Contacto"],
}));



export default function ViewerDashboardScreen() {
  return (
    <div>
      <DashboardTemplate
        barChartTendenciasUniversidades={dataUniversidades}
        lineChartData={dataUniversidadesBuscadas}
        barChartTendenciasCarreras = {dataCarreras}
        usersData={parsedUsersData}
      />
    </div>
  );
}
