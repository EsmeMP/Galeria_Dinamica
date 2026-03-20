const data = [
  { id: "p01", title: "Montaña", desc: "Luz suave y cielo polar", src: "../img/honguito_solar.png" },
  { id: "p02", title: "Amanecer", desc: "Rocas y niebla", src: "../img/girasol-primitiva.png" },
  { id: "p03", title: "Rio", desc: "Atardecer urbano", src: "../img/lanzaguizantes-primitivo.png" },
  { id: "p04", title: "Alaska", desc: "Verde profundo", src: "../img/cascarrabias.png" },
  { id: "p05", title: "Desierto", desc: "Horizonte y calma", src: "../img/boomerang.png" },
  { id: "p06", title: "Ruta", desc: "Camino en perspectiva", src: "../img/lanazaguisantes-sombrio.png" },
  { id: "p07", title: "Ruta", desc: "Camino en perspectiva", src: "../img/lanzaguisantes.png" },
  { id: "p08", title: "Ruta", desc: "Camino en perspectiva", src: "../img/guacadrilo.png" },
  { id: "p09", title: "Ruta", desc: "Camino en perspectiva", src: "../img/rabano.png" },
  { id: "p10", title: "Ruta", desc: "Camino en perspectiva", src: "../img/hongo-sapo.png" },
  { id: "p11", title: "Ruta", desc: "Camino en perspectiva", src: "../img/seta-sombria.png" },
];

// selecion de elementos de DOM
const thumbs = document.querySelector("#thumbs");
const heroImg = document.querySelector("#heroImg");
const heroTitle = document.querySelector("#heroTitle");
const heroDesc = document.querySelector("#heroDesc");
const likeBtn = document.querySelector("#likeBtn");
const counter = document.querySelector("#counter");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playBtn = document.querySelector("#playBtn");

// variables para el estado de la aplicacion
let currentIndex = 0;
let likes = {};

let autoPlayId = null;
let isPlaying = false;
const AUTO_TIME = 4000;

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

  // actualizar el contador de imagenes
  counter.textContent = `${index + 1} / ${data.length}`;

  // axtualizar el botn de reproduccion
  function updatePlayButton(){}

  // funcion para cambiar de imagen automaticamente
  function changeSlide( newIndex ){
    heroImg.classList.add("fade-out");
    setTimeout(() => {
      currentIndex = newIndex;
      renderHero( currentIndex );
      heroImg.classList.remove("fade-out");
    }, 350);
  }

  function nextSlide(){
    const newIndex = (currentIndex + 1) % data.length;
    changeSlide ( newIndex );
  }

  function prevSlide(){
    const newIndex = (currentIndex - 1 + data.length) % data.length;
    changeSlide ( newIndex );
  }

  function startAutoPlay(){
    autoPlayId = setInterval ( () => { 
      nextSlide();
     },  AUTO_TIME);

     isPlaying = true;
     updatePlayButton();
  }

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
renderHero(currentIndex);