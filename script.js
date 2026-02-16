<script type="module"></script>
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";

let recetas = JSON.parse(firebaseConfig.getItem("recetas")) || [];

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// ---------- RECETAS ----------
async function agregarReceta() {
  const nombre = nombreReceta.value;
  const categoria ="categoria".value;
  const ing = ingredientes.value;
  const prep = preparacion.value;
  const file = imagenReceta.files[0];

  if (!file) {
    alert("Selecciona una imagen");
    return;
  }

  const reader = new FileReader();
  reader.onload = async function(e) {
    const imagen = e.target.result;

    await addDoc(collection(db, "recetas"), {
      nombre,
      categoria,
      ing,
      prep,
      imagen
    });

    mostrarRecetas();  
    limpiarFormulario(); 
  };

  reader.readAsDataURL(file);
}

function limpiarFormulario() {
  nombreReceta.value = "";
  ingredientes.value = "";
  preparacion.value = "";
  imagenReceta.value = "";
}

async function mostrarRecetas() {
  let cont = document.getElementById("listaRecetas");
  cont.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "recetas"));

   querySnapshot.forEach((docu) => {
    const r = docu.data();

   let listaIngredientes = r.ing
  .split("\n")
  .map(item => `<li>${colorearMayusculas(item)}</li>`)
  .join("");


    let listaPreparacion = r.prep
  .split("\n")
  .map(paso => `<li>${colorearMayusculas(paso)}</li>`)
  .join("");

    cont.innerHTML += `
        <<div class="receta">
        <h4>${r.nombre}</h4>
        <p>${r.categoria}</p>
        <img src="${r.imagen}" width="200">
        <p>${r.ing}</p>
        <p>${r.prep}</p>

        <button onclick="eliminarReceta(${index})">Eliminar</button>
      </div>
    `;
  });
}

function colorearMayusculas(texto) {
  return texto.replace(/[A-ZÁÉÍÓÚÑ]+/g, match => {
    return `<span class="mayus">${match}</span>`;
  });
}


function buscarRecetas() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  let cont = document.getElementById("listaRecetas");
  cont.innerHTML = "";

  recetas.forEach((r, index) => {
    if (r.nombre.toLowerCase().includes(texto)) {
      cont.innerHTML += `<div>${r.nombre}</div>`;
    }
  });
}



function eliminarReceta(index) {
  if (confirm("¿Eliminar esta receta?")) {
    recetas.splice(index, 1);
    localStorage.setItem("recetas", JSON.stringify(recetas));
    mostrarRecetas();
  }
}


function filtrarCategoria() {
  const cat = document.getElementById("filtroCategoria").value;
  let cont = document.getElementById("listaRecetas");
  cont.innerHTML = "";

  recetas.forEach((r, index) => {
    if (cat === "" || r.categoria === cat) {

      let listaIngredientes = r.ing.split("\n").map(i => `<li>${i}</li>`).join("");
      let listaPreparacion = r.prep.split("\n").map(p => `<li>${p}</li>`).join("");

      cont.innerHTML += `
        <div class="receta">
          <h4>${r.nombre}</h4>
          <p><b>Categoría:</b> ${r.categoria}</p>
          <img src="${r.imagen}" width="200">

          <p><b>Ingredientes:</b></p>
          <ul>${listaIngredientes}</ul>

          <p><b>Preparación:</b></p>
          <ol>${listaPreparacion}</ol>

          <button onclick="eliminarReceta(${index})">Eliminar</button>
        </div>
      `;
    }
  });
}

const firebaseConfig = {
  apiKey: "AIzaSyBakxGYY6NU_-Vx83W8_7L-3Wx0xsPipm0",
  authDomain: "recetario-cocina-164e9.firebaseapp.com",
  projectId: "recetario-cocina-164e9",
  storageBucket: "recetario-cocina-164e9.firebasestorage.app",
  messagingSenderId: "27276510710",
  appId: "1:27276510710:web:e4a3e86f2757c4b2b6f3d7",
  measurementId: "G-N3KQH29MV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


mostrarRecetas();




