let recetas = JSON.parse(localStorage.getItem("recetas")) || [];

// ---------- RECETAS ----------
function agregarReceta() {
  const nombre = nombreReceta.value;
  const categoria = document.getElementById("categoria").value;
  const ing = ingredientes.value;
  const prep = preparacion.value;
  const file = imagenReceta.files[0];

  if (!file) {
    alert("Selecciona una imagen");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const imagen = e.target.result;

    recetas.push({ nombre, categoria, ing, prep, imagen });
    localStorage.setItem("recetas", JSON.stringify(recetas));

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

function mostrarRecetas() {
  let cont = document.getElementById("listaRecetas");
  cont.innerHTML = "";

  recetas.forEach((r, index) => {

   let listaIngredientes = r.ing
  .split("\n")
  .map(item => `<li>${colorearMayusculas(item)}</li>`)
  .join("");


    let listaPreparacion = r.prep
  .split("\n")
  .map(paso => `<li>${colorearMayusculas(paso)}</li>`)
  .join("");

    cont.innerHTML += `
        <div class="receta">
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <h4 style="text-align:center;">${r.nombre}</h4>
        <p><b>Categoría:</b> ${r.categoria}</p>
        <img src="${r.imagen}" width="200" style="display:block; margin:auto;">

        <p><b>Ingredientes:</b></p>
        <ul>${listaIngredientes}</ul>

        <p><b>Preparación:</b></p>
        <ol>${listaPreparacion}</ol>

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

mostrarRecetas();
