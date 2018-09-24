// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Wifi = require("../models/Wifi");
const User = require("../models/User")

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/whats-in-mad', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const wifiPlaces = [
  {
    name: "Biblioteca Pública Municipal Aluche (Latina)",
    location: { type: "Point" , coordinates: [40.3959, -3.7562] },
    description: "La Biblioteca Pública de Aluche se inauguró en junio de 1992 con la asistencia del entonces alcalde D. José María Alvarez del Manzano. Se sitúa en la primera planta del Centro Cultural Fernando de los Ríos, diseñado por el arquitecto José María Guijarro. Desde 1986 y hasta la fecha de su inauguración oficial, se encontraba situada en este mismo centro cultural y planta pero en el ala derecha del edificio y con la mitad de superficie. La ubicación de la biblioteca en el centro cultural en la década de los 80 se decidió porque éste era considerado un elemento aglutinador de la vida asociativa y cultural de los distritos.Superficie: 712 metros cuadrados Puestos de lectura: 130 Puestos de Internet: 18 (con lector de pantalla NVDA, que permite a las personas ciegas y con discapacidad visual usar ordenadores)Metro : Laguna, Casa de Campo, Aluche RENFE: Laguna, Aluche Bus : 25, 31, 138"
  },
  {
    name: "Biblioteca Pública Municipal Ángel González (Latina)",
    location: { type: "Point" , coordinates:[40.3970, -3.7664]},
    description: "La Biblioteca Pública Ángel González se inauguró el 26 de julio de 2010, contando con la presencia de, entre otros, el entonces Alcalde Alberto Ruiz-Gallardón, la Delegada del Área de Las Artes, Alicia Moreno, y la viuda del escritor, Susana Rivera. El edificio es obra del arquitecto Carlos de Riaño, donde predomina el hormigón y el cristal. A pesar de estar junto a la A5, el aislamiento del entorno se consigue gracias a la utilización de grandes terrazas como elemento constructivo. Tiene su fachada principal orientada hacia la autovía de Extremadura en previsión del soterramiento de la autovíaSuperficie: 2.811 metros cuadrados Puestos de lectura: 309 Puestos de Internet: 34 (con lector de pantalla NVDA, que permite a las personas ciegas y con discapacidad visual usar ordenadores) Puestos de la sala polivalente: 60 Puestos de la sala de actividades: 18 Página en FacebookMetro: Campamento Bus: 25, 36, 39, 65, 121, 131, 138, H"
  }
]

//window.localStorage.setItem("wifi", JSON.parse(wifiPlaces));

Wifi.deleteMany()
.then(() => {
  return Wifi.create(wifiPlaces)
})
.then(wifiCreated => {
  console.log(`${wifiCreated.length} users created with the following id:`);
  console.log(wifiCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})