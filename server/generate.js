let database = {
  employees: []
};
let listNames = [
  'Sara Teresa',
  'Efraín de',
  'Julieta Ponce',
  'José Carlos',
  'Sofía del',
  'Ana María',
  'Harry Carlos',
  'Roberto Carlos',
  'Alberto Carlos',
  'Gabriela de',
  'Marcelo Carlos',
];

let listLastNames = [
  'Sánchez del Pinar',
  'las Casas Mejía',
  'de León',
  'Rodríguez Pérez',
  'Río Arango',
  'de la Peña Posada',
  'Rodríguez Pérez',
  'Rodríguez Pérez',
  'Alfonso Cruz',
  'la Pava de la Torre',
  'Alfonso Cruz',
];

for (let i = 1; i <= 20; i++) {
  database.employees.push({
    employeId: i,
    name: listNames[Math.floor(Math.random() * 10)],
    lastName: listLastNames[Math.floor(Math.random() * 10)],
    mail: `autoemail${i}@hiberus.com`,
    phone: Math.random().toString().slice(2, 11),
    departmentName: `Department name ${i}`,
    positionName: `Position name ${i}`,
    photo: ""

  });
}

console.log(JSON.stringify(database));
