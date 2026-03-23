const data = [
  { id: "p01", title: "Honguito Solar", desc: "Luz suave y cielo polar", src: "../img/honguito_solar.png" },
  { id: "p02", title: "Girasol Primitivo", desc: "Rocas y niebla", src: "../img/girasol-primitiva.png" },
  { id: "p03", title: "Lanzaguizantes Primitivo", desc: "Atardecer urbano", src: "../img/lanzaguizantes-primitivo.png" },
  { id: "p04", title: "Nuez Cascarrabias", desc: "Verde profundo", src: "../img/cascarrabias.png" },
  { id: "p05", title: "Boomerang", desc: "Horizonte y calma", src: "../img/boomerang.png" },
  { id: "p06", title: "Lanzaguizantes Sombrio", desc: "Camino en perspectiva", src: "../img/lanazaguisantes-sombrio.png" },
  { id: "p07", title: "Bipetidora", desc: "Camino en perspectiva", src: "../img/lanzaguisantes.png" },
  { id: "p08", title: "Guacadrilo", desc: "Camino en perspectiva", src: "../img/guacadrilo.png" },
  { id: "p09", title: "Rabano", desc: "Camino en perspectiva", src: "../img/rabano.png" },
  { id: "p10", title: "Hongo", desc: "Camino en perspectiva", src: "../img/hongo-sapo.png" },
  { id: "p11", title: "Seta Sombria", desc: "Camino en perspectiva", src: "../img/seta-sombria.png" },
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
  // counter.textContent = `${index + 1} / ${data.length}`;
  updateCounter();
  updateActiveThumb();
  updateLikeBtn();
}

  // axtualizar el botn de reproduccion
  function updatePlayButton(){
    playBtn.textContent = isPlaying ? "◼" : "▶";
    playBtn.dataset.state = isPlaying ? "stop" : "play";
  }

  function updateCounter(){
    counter.textContent = `${currentIndex + 1} / ${data.length}`;
  }

  function updateActiveThumb(){
    // cambia la clase de la miniatura
    document.querySelectorAll(".thumb").forEach((thumb, i) => {
      thumb.classList.toggle("active", i === currentIndex);
    });
  }
  
  function updateLikeBtn(){
    const currentItem = data[currentIndex];
    const isLiked = likes[currentItem.id] === true;
  
    // actualizar  el boton visualmente
    likeBtn.textContent = isLiked ? "☆" : "⭐";
    likeBtn.classList.toggle("on", isLiked);
    likeBtn.setAttribute("aria-pressed", isLiked);
  }

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

  function stopAutoPlay(){
    clearInterval (autoPlayId);
    autoPlayId = null;
    isPlaying = false;
    updatePlayButton();
  }

  function toggleAutoPlay(){
    if (isPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  // evento para manejar el clic en el boton de me gusta
  likeBtn.addEventListener("click", () => {
    const currentItem = data[currentIndex];
    // cambiar de true a false
    likes[currentItem.id] = !likes[currentItem.id];
    updateLikeBtn();
  });

// evento para manejar el click en las miniaturas
thumbs.addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if (!thumb) return;

  // obtener el indice de la miniatura dede el atributo data-index
  const newIndex = Number(thumb.dataset.index);
  if (newIndex === currentIndex) return;
  changeSlide(newIndex);
  // dataset recupera todas las etiquetas tipo data, dataindex
  // obtener el indice de la miniature desde el atributo de data-index]
  // currentIndex = Number(thumb.dataset.index);

  // actualizar el visor principal
  // renderHero(currentIndex);
});

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
playBtn.addEventListener("click", toggleAutoPlay);

// eventos para el teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === " ") {
    toggleAutoPlay();
  }
})

renderTumbs();
renderHero(currentIndex);