const formulario = document.getElementById("formulario");
let urlBase = "https://claseherok.herokuapp.com/libros/";

const getCard = async (url) => {
    let mostrarElementos = document.querySelector("#myTable");
    mostrarElementos.innerHTML = "";
    const resp = await fetch(url);
    const data = await resp.json();
    data.forEach((element) => {
        const { nombre, url, descripcion, id } = element;
        mostrarElementos.innerHTML += `
      <tr>
      <td align="center">
          <a class="btn btn-default" onclick="buscar('${id}');"><em class="fa fa-pencil" data-toggle="modal" data-target="#peliculas"></em></a>
          <a class="btn btn-danger" onclick="eliminar('${id}','${nombre}');"><em class="fa fa-trash"></em></a>
      </td>
      <td class="hidden-xs">${id}</td>
      <td>${nombre}</td>
      <td> <img src="${url}" alt="${nombre}" class="img-thumbnail"> </td>
      <td>${descripcion}</td>
  </tr>
  
          `;
    });
};

document.addEventListener("DOMContentLoaded", () => {
    getCard(urlBase);
});

const nuevo = async () => {
    document.getElementById("btnModificar").style.display = "none";
    document.getElementById("btnAgregar").style.display = "block";
}

const agregar = async () => {
    document.getElementById("btnModificar").style.display = "none";
    document.getElementById("btnAgregar").style.display = "block";
    if (confirm("¿Realmente desea agregar el libro?")) {
        await fetch(urlBase, {
            method: "POST",
            body: JSON.stringify({
                nombre: document.getElementById("nombre").value,
                url: document.getElementById("urlim").value,
                descripcion: document.getElementById("descripcion").value,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        getCard(urlBase);
        formulario.reset();

    }
};

const buscar = async (id) => {
    //   document.getElementById("id").style.display = "block";
    //   document.getElementById("label-edit").style.display = "block";
    document.getElementById("btnAgregar").style.display = "none";
    document.getElementById("btnModificar").style.display = "block";

    let resp = await fetch(urlBase + id);
    let data = await resp.json();
    console.log(data.nombre);
    document.getElementById("id").value = data.id;
    document.getElementById("nombre").value = data.nombre;
    document.getElementById("urlim").value = data.url;
    document.getElementById("descripcion").value = data.descripcion;
};

const modificar = async () => {
    document.getElementById("btnAgregar").style.display = "none";
    document.getElementById("btnModificar").style.display = "block";
    if (confirm("¿Realmente desea modificar el libro?")) {
        await fetch(urlBase + document.getElementById("id").value, {
            method: "PUT",
            body: JSON.stringify({
                id: document.getElementById("id").value,
                nombre: document.getElementById("nombre").value,
                url: document.getElementById("urlim").value,
                descripcion: document.getElementById("descripcion").value,
            }),
            headers: {
                "Content-Type": "application/json; chartset=UTF-8",
            },
        });
        getCard(urlBase);
        formulario.reset();
    }
};

const eliminar = async (id, nombre) => {
    if (confirm(`¿Realmente desea eliminar el libro ${nombre}?`)) {
        await fetch(urlBase + id, {
            method: "DELETE",
        });
        getCard(urlBase);
    }
};
