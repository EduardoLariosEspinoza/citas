// Campos del formulario
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

// UI
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

let editando;

obtenerCitas();

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }

  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id_cita !== id);

    borrarCita(id);
  }

  editarCita(citaActualizada) {
    // Primer intento
    /* this.citas = this.citas.filter((cita) => cita.id !== citaActualizada.id);
    this.citas = [...this.citas, citaActualizada]; */

    updateCita(citaActualizada);

    this.citas = this.citas.map((cita) =>
      cita.id_cita === citaActualizada.id_cita ? citaActualizada : cita
    );
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.textContent = mensaje;

    // Agregar el div dentro del elemento #contenido antes del elemento .agregar-cita
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  // ({citas}) es lo mismo que {citas} = citas. citas es un array de objetos que tiene un objeto por cada cita
  imprimirCitas({ citas }) {
    this.limpiarHTML();

    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario:</span> ${propietario}`;

      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono</span> ${telefono}`;

      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha:</span> ${fecha}`;

      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora:</span> ${hora}`;

      const sintomasParrafo = document.createElement("p");
      sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas:</span> ${sintomas}`;

      // Crear boton para eliminar esta cita
      const boton = document.createElement("button");
      boton.classList.add("btn", "btn-danger", "mr-2");
      boton.innerHTML =
        'Eliminar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

      boton.onclick = () => eliminarCita(cita.id_cita);

      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML =
        'Editar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path></svg>';

      btnEditar.onclick = () => cargarEdicion(cita);

      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(boton);
      divCita.appendChild(btnEditar);

      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

const ui = new UI();
const administrarCitas = new Citas();

// Event Listeners
eventListeners();
function eventListeners() {
  mascotaInput.addEventListener("input", datosCitas);
  propietarioInput.addEventListener("input", datosCitas);
  telefonoInput.addEventListener("input", datosCitas);
  fechaInput.addEventListener("input", datosCitas);
  horaInput.addEventListener("input", datosCitas);
  sintomasInput.addEventListener("input", datosCitas);

  formulario.addEventListener("submit", nuevaCita);
}

// Objeto principal con la informacion de la cita
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

// Funciones

// Agrega datos al objeto de cita
function datosCitas(e) {
  // Si el campo que se esta llenando tiene de nombre 'mascota' entonces ese es el campo que se llena en el objeto citaObj
  citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {
  e.preventDefault();

  const { mascota, propietario, telefono, fecha, hora, sintomas, id_cita } =
    citaObj;

  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");

    return;
  }

  if (editando) {
    ui.imprimirAlerta("Editado correctamente");

    formulario.querySelector("button[type='submit']").textContent =
      "Crear Cita";

    editando = false;

    administrarCitas.editarCita({ ...citaObj });
  } else {
    citaObj.id = Date.now();

    // Le pasamos una copia del objeto citaObj para que no tome la referencia del objeto citaObj
    administrarCitas.agregarCita({ ...citaObj });
    // Si no se hace esto entonces lo que agregamos al array this.citas es la referencia del objeto citaObj por lo que si se modifica el objeto citaObj tambien se modifica el objeto que habiamos agregado a array this.citas

    ui.imprimirAlerta("Se agregó correctamente");
    subirCita({ ...citaObj });
  }

  reiniciarObjeto();

  formulario.reset();

  ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}

function eliminarCita(id) {
  // Eliminar la cita
  administrarCitas.eliminarCita(id);

  // Mostrar mensaje
  ui.imprimirAlerta("La cita se eliminó correctamente");

  // Refrescar las citas
  ui.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id_cita } =
    cita;

  // Llenar los inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // Llenar Objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id_cita = id_cita;

  formulario.querySelector('button[type="submit"]').textContent =
    "Guardar cambios";

  editando = true;
}

function subirCita(cita) {
  cita.numero_cuenta = cuenta;
  var dataCita = JSON.stringify(cita);

  $.ajax({
    url: "https://sistemas.cruzperez.com/elarios12/padron/AdministrarCitas/php/recibirYEnviar.php",
    type: "POST",
    data: { mascota: dataCita },
    success: function (response) {},
  });
}

function obtenerCitas() {
  if (rol == 1) {
    $.ajax({
      url: "https://sistemas.cruzperez.com/elarios12/padron/AdministrarCitas/php/obtenerCitas.php",
      type: "POST",
      data: { numero_cuenta: cuenta },
      success: function (response) {
        const citas = JSON.parse(response);
        citas.forEach((cita) => {
          administrarCitas.agregarCita(cita);
        });
        ui.imprimirCitas(administrarCitas);
      },
    });
  } else if (rol == 3) {
    $.ajax({
      url: "https://sistemas.cruzperez.com/elarios12/padron/AdministrarCitas/php/obtenerCitasUsuario.php",
      type: "POST",
      data: { numero_cuenta: cuenta },
      success: function (response) {
        const citas = JSON.parse(response);
        citas.forEach((cita) => {
          administrarCitas.agregarCita(cita);
        });
        ui.imprimirCitas(administrarCitas);
      },
    });
  }
}

function borrarCita(id_cita) {
  $.ajax({
    url: "./php/eliminarRegistro.php",
    type: "POST",
    data: { dato: id_cita },
    success: function (response) {
      // Puedes hacer algo con la respuesta del servidor (response) aquí
    },
    error: function (xhr, status, error) {
      // Maneja el error aquí
    },
  });
}

function updateCita(cita) {
  $.ajax({
    url: "./php/editarRegistro.php",
    type: "POST",
    data: { dato: cita },
    success: function (response) {
      // Puedes hacer algo con la respuesta del servidor (response) aquí
    },
    error: function (xhr, status, error) {
      // Maneja el error aquí
    },
  });
}
