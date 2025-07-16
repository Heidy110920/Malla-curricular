let materias;

fetch("materias.json")
  .then(response => response.json())
  .then(data => {
    materias = data;
    mostrarMaterias();
  });

function mostrarMaterias() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (const materia of materias) {
    const div = document.createElement("div");
    div.classList.add("materia");
    div.innerText = materia.nombre;
    div.dataset.codigo = materia.codigo;

    if (!puedeDesbloquear(materia)) {
      div.classList.add("bloqueada");
    } else {
      div.addEventListener("click", () => {
        materia.aprobada = true;
        mostrarMaterias();
      });
    }

    contenedor.appendChild(div);
  }
}

function puedeDesbloquear(materia) {
  if (materia.aprobada) return false;
  if (materia.requisitos.length === 0) return true;

  return materia.requisitos.every(cod => {
    const req = materias.find(m => m.codigo === cod);
    return req && req.aprobada;
  });
}
