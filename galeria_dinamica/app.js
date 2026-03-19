const data = [
  { id: "p01", title: "Montaña", desc: "Luz suave y cielo polar", src: "../img/honguito_solar.png" },
  { id: "p02", title: "Amanecer", desc: "Rocas y niebla", src: "../img/girasol-removebg-preview.png" },
  { id: "p03", title: "Rio", desc: "Atardecer urbano", src: "../img/lanzaguizantes.png" },
  { id: "p04", title: "Alaska", desc: "Verde profundo", src: "../img/lector.png" },
  { id: "p05", title: "Desierto", desc: "Horizonte y calma", src: "https://picsum.photos/id/1016/1200/675" },
  { id: "p06", title: "Ruta", desc: "Camino en perspectiva", src: "https://picsum.photos/id/1005/1200/675" }
];

// selecion de elementos de DOM
const thumbs = document.querySelector("#thumbs");
const heroImg = document.querySelector("#heroImg");
const heroTitle = document.querySelector("#heroTitle");
const heroDesc = document.querySelector("#heroDesc");
const likeBtn = document.querySelector("#likeBtn");
const counter = document.querySelector("#counter");

// variables para el estado de la aplicacion
let currentIndex = 0;
let likes = {};

// funcion para renderizar las miniaturas
function renderTumbs() {
  thumbs.innerHTML = data.map((item, index) => {
    return`
    <article class="thumb ${index} === currentIndex ? "active" : ""}" data-index="${index}">
    <span class="badge">${index + 1}</span>
    <img src="${item.src}" alt="${item.title}" />
    </article>
    `;
  }).join("");
}

// renderizar inmagen en el visor principal
function renderHero ( index ){
  // recuperar el elemento acorde al indice
  const item = data[index];

  // actualizar la imagen principal
  heroImg.src = item.src;
  heroImg.alt = item.title;

  // actualizar titulo y descripcion
  heroTitle.textContent = item.title;
  heroDesc.textContent = item.desc;

  // actualizar el contador
  counter.textContent = `${index + 1} / ${data.length}`;

  // evento para manejar el clic en el boton de me gusta
  likeBtn.addEventListener("click", () => {
    const currentItem = data[currentIndex];
    // cambiar de true a false
    likes[currentItem.id] = !likes[currentItem.id];
    const isLiked = likes[currentItem.id];

    // actualizar  el boton visualmente
    likeBtn.textContent = isLiked ? "💙" : "❤️";
    likeBtn.classList.toggle("on", isLiked);
    likeBtn.setAttribute("aria-pressed", isLiked);
  });
}

// evento para manejar el click en las miniaturas
thumbs.addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if (!thumb) return;

  // dataset recupera todas las etiquetas tipo data, dataindex
  // obtener el indice de la miniature desde el atributo de data-index]
  currentIndex = Number(thumb.dataset.index);

  // actualizar el visor principal
  renderHero(currentIndex);
});

renderTumbs();