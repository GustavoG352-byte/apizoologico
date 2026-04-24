require("dotenv").config();
const mongoose = require("mongoose");
const Animal = require("./models/Animal");

const animales = [
  { nombre: "Leon",       edad: 5,  tipo: "Mamifero" },
  { nombre: "Tigre",      edad: 3,  tipo: "Mamifero" },
  { nombre: "Aguila",     edad: 7,  tipo: "Ave"      },
  { nombre: "Cocodrilo",  edad: 12, tipo: "Reptil"   },
  { nombre: "Pinguino",   edad: 2,  tipo: "Ave"      },
  { nombre: "Elefante",   edad: 15, tipo: "Mamifero" },
  { nombre: "Serpiente",  edad: 4,  tipo: "Reptil"   },
  { nombre: "Jirafa",     edad: 8,  tipo: "Mamifero" },
  { nombre: "Hipopotamo", edad: 10, tipo: "Mamifero" },
  { nombre: "Flamenco",   edad: 6,  tipo: "Ave"      },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    const deleted = await Animal.deleteMany({});
    console.log(`🗑️  Eliminados ${deleted.deletedCount} animales corruptos`);

    const inserted = await Animal.insertMany(animales);
    console.log(`🐾 Insertados ${inserted.length} animales nuevos:`);
    inserted.forEach(a => console.log(`   - ${a.nombre} | ${a.tipo} | ${a.edad} años`));

    console.log("\n✅ Base de datos lista. Recarga el navegador.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
