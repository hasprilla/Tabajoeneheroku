const getCard = async (url) => {
  let mostrarElementos = document.querySelector(".datos");
  mostrarElementos.innerHTML = "";
  //Petición
  const resp = await fetch(url);
  const data = await resp.json();
  data.forEach((element) => {
    const { nombre, url, descripcion } = element;
    mostrarElementos.innerHTML += `
    <div class="col-sm">
    <div class="card" style="width: 18rem;">
    <img src="${url}" class="card-img-top" alt="${nombre}">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">${descripcion}</p>
    </div>
  </div>
      </div>

        `;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  getCard("https://claseherok.herokuapp.com/libros/");
});
