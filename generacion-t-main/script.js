const hojasContainer = document.getElementById("hojas");

function crearHoja() {
  const hoja = document.createElement("div");
  hoja.className = "hoja";
  hoja.style.left = Math.random() * window.innerWidth + "px";
  hoja.style.top = '-50px';
  const size = 18 + Math.floor(Math.random() * 30);
  hoja.style.width = size + 'px';
  hoja.style.height = size + 'px';
  hoja.style.animationDuration = (3 + Math.random() * 5) + "s";
  hojasContainer.appendChild(hoja);
  setTimeout(() => hoja.remove(), 9000);
}

function crearEscarcha() {
  const escarcha = document.createElement("div");
  escarcha.className = "escarcha";
  escarcha.style.left = Math.random() * window.innerWidth + "px";
  escarcha.style.top = '-50px';
  const size = 8 + Math.floor(Math.random() * 15);
  escarcha.style.width = size + 'px';
  escarcha.style.height = size + 'px';
  escarcha.style.animationDuration = (4 + Math.random() * 6) + "s"; 
  hojasContainer.appendChild(escarcha);
  setTimeout(() => escarcha.remove(), 10000);
}

setInterval(crearHoja, 500);
setInterval(crearEscarcha, 300);

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const slider = document.createElement('div');
  slider.className = 'bg-slider';
  const slides = [];
  for(let i = 1; i <= 5; i++) {
    const slide = document.createElement('div');
    slide.className = `bg-slide s${i}${i === 1 ? ' visible' : ''}`;
    slider.appendChild(slide);
    slides.push(slide);
  }
  body.insertBefore(slider, body.firstChild);
  let currentBg = 0;
  setInterval(() => {
    slides[currentBg].classList.remove('visible');
    currentBg = (currentBg + 1) % slides.length;
    slides[currentBg].classList.add('visible');
  }, 7000);
  const heroStage = document.getElementById('hero-stage');
  const restartBtn = document.getElementById('hero-restart');

  
  const mapEl = document.getElementById('map');
  if (mapEl && typeof L !== 'undefined') {
    const map = L.map(mapEl, {zoomControl: true}).setView([10, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const markers = [
      {coords: [-3.4653, -62.2159], name: 'Jaguar', clase: 'Mamífero', ruta: 'Panthera onca', img: 'imgs/jaguar.jpg'},
      {coords: [0.0236, 37.9062], name: 'Elefante africano', clase: 'Mamífero', ruta: 'Loxodonta africana', img: 'imgs/elefante_africano.jpg'},
      {coords: [-1.9579, 30.1127], name: 'Leona', clase: 'Mamífero', ruta: 'Panthera leo (hembra)', img: 'imgs/leona.jpg'},
      {coords: [-34.6037, -58.3816], name: 'Carpincho (Capibara)', clase: 'Mamífero', ruta: 'Hydrochoerus hydrochaeris', img: 'imgs/capibara.jpg'},
      {coords: [36.0, -5.0], name: 'Delfín común', clase: 'Mamífero', ruta: 'Delphinus delphis', img: 'imgs/delfin_comun.jpg'},
      {coords: [25.0, -80.0], name: 'Tiburón martillo', clase: 'Pez', ruta: 'Sphyrna spp.', img: 'imgs/tiburon_martillo.jpg'},
      {coords: [51.5074, -0.1278], name: 'Zorro común', clase: 'Mamífero', ruta: 'Vulpes vulpes', img: 'imgs/zorro_comun.jpg'},

      {coords: [-3.0, -60.0], name: 'Guacamayo', clase: 'Ave', ruta: 'Ara macao', img: 'imgs/guacamayo.jpg'},
      {coords: [-54.8, -68.3], name: 'Pingüino', clase: 'Ave', ruta: 'Spheniscidae', img: 'imgs/pinguino.jpg'},
      {coords: [2.5, -60.0], name: 'Cóndor', clase: 'Ave', ruta: 'Vultur gryphus', img: 'imgs/condor.jpg'},

      {coords: [-8.5167, 119.4333], name: 'Iguana', clase: 'Reptil', ruta: 'Iguana iguana', img: 'imgs/iguana.jpg'},
      {coords: [30.0444, 31.2357], name: 'Cocodrilo', clase: 'Reptil', ruta: 'Crocodylidae', img: 'imgs/cocodrilo.jpg'},

      {coords: [-18.2871, 147.6992], name: 'Arrecife (representativo)', clase: 'Pez', ruta: 'Ecosistema coralino', img: 'imgs/arrecife.jpg'},
      {coords: [10.0, -60.0], name: 'Pez payaso', clase: 'Pez', ruta: 'Amphiprioninae', img: 'imgs/pez_payaso.jpg'},

      {coords: [-3.0, -60.0], name: 'Rana', clase: 'Anfibio', ruta: 'Anura', img: 'imgs/rana.jpg'},
      {coords: [5.0, -75.0], name: 'Salamandra (representativa)', clase: 'Anfibio', ruta: 'Caudata', img: 'imgs/salamandra.jpg'},

      {coords: [60.0, -149.0], name: 'Alce', clase: 'Mamífero', ruta: 'Alces alces', img: 'imgs/alce.jpg'},
      {coords: [35.6895, 139.6917], name: 'Ciervo Sika', clase: 'Mamífero', ruta: 'Cervus nippon', img: 'imgs/ciervo_sika.jpg'},
      {coords: [64.9631, -19.0208], name: 'Foca', clase: 'Mamífero', ruta: 'Phocidae', img: 'imgs/foca.jpg'}
    ];
    const rutasPorClase = {};

    markers.forEach(m => {
      const popupContent = `
        <div class="marker-meta">
          <img class="popup-thumb" src="${m.img}" alt="${m.name} (añade tu imagen en imgs/)" onerror="this.style.display='none'"/>
          <strong>${m.name}</strong><br/>
          <em>${m.clase}</em><br/>
          <small>Ruta: ${m.ruta}</small><br/>
          <a href="${m.clase.toLowerCase()}.html">Ver más</a>
        </div>
      `;

      const marker = L.marker(m.coords).addTo(map);
      marker.bindPopup(popupContent, {minWidth:160});
      marker.on('mouseover', function() { this.openPopup(); });
      marker.on('mouseout', function() { this.closePopup(); });

      if (!rutasPorClase[m.clase]) rutasPorClase[m.clase] = [];
      rutasPorClase[m.clase].push(m.coords);
    });

    Object.keys(rutasPorClase).forEach(clase => {
      const latlngs = rutasPorClase[clase];
      // solo si hay más de 1 punto para conectar
      if (latlngs.length > 1) {
        L.polyline(latlngs, {weight: 3, dashArray: '6,8'}).addTo(map);
      }
    });

    const allCoords = markers.map(m => m.coords);
    map.fitBounds(allCoords, {padding: [40,40]});
  }


  const animalData = [
    { src: 'imgs/mamifero1.jpg', type: 'mamiferos', title: 'Mamíferos' },
    { src: 'imgs/ave1.jpg', type: 'aves', title: 'Aves' },
    { src: 'imgs/reptille1.jpg', type: 'reptiles', title: 'Reptiles' },
    { src: 'imgs/pez1.jpg', type: 'peces', title: 'Peces' },
    { src: 'imgs/anfibio1.jpg', type: 'anfibios', title: 'Anfibios' }
  ];

  const imgElements = [];
  let isPlaying = false;
  let cancelPlay = false;

  animalData.forEach((animal, i) => {
    const wrapper = document.createElement('a');
    wrapper.href = animal.type + '.html';
    wrapper.className = 'hero-img-wrapper';
    
    const img = document.createElement('img');
    img.src = animal.src;
    img.alt = animal.title;
    img.className = 'hero-img';
    img.dataset.index = i;
    
    const label = document.createElement('div');
    label.className = 'hero-img-label';
    label.textContent = animal.title;
    
    wrapper.appendChild(img);
    wrapper.appendChild(label);
    heroStage.appendChild(wrapper);
    imgElements.push(wrapper);
  });

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  async function playSlideshowAndAssemble() {
    if (isPlaying) return;
    isPlaying = true;
    cancelPlay = false;

    heroStage.classList.remove('collage');
    imgElements.forEach(wrapper => {
      wrapper.style.transition = '';
      wrapper.style.left = '';
      wrapper.style.top = '';
      wrapper.style.width = '';
      wrapper.style.height = '';
      wrapper.style.zIndex = '';
      wrapper.classList.remove('show');
      wrapper.style.position = 'absolute';
      wrapper.style.transform = 'translate(-50%, -50%) scale(1.05)';
      wrapper.style.left = '50%';
      wrapper.style.top = '50%';
    });

    for (let i = 0; i < imgElements.length; i++) {
      imgElements.forEach(el => el.classList.remove('show'));
      const el = imgElements[i];
      el.classList.add('show');
      await sleep(2000); 
      if (cancelPlay) { isPlaying = false; return; }
    }

    assembleCollage();

    if (cancelPlay) { isPlaying = false; return; }

    await sleep(5000);
    if (cancelPlay) { isPlaying = false; return; }
    isPlaying = false;
    restart(false);
  }

  function assembleCollage() {
    const n = imgElements.length;
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);

    const stageRect = heroStage.getBoundingClientRect();
    const gap = 8;

    const tileW = (stageRect.width - gap * (cols + 1)) / cols;
    const tileH = (stageRect.height - gap * (rows + 1)) / rows;

    heroStage.classList.add('collage');
    imgElements.forEach((wrapper, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const left = gap + col * (tileW + gap);
      const top = gap + row * (tileH + gap);

      wrapper.style.transition = `all ${900 + Math.floor(Math.random()*400)}ms cubic-bezier(.2,.9,.2,1)`;
      wrapper.style.width = `${Math.round(tileW)}px`;
      wrapper.style.height = `${Math.round(tileH)}px`;
      wrapper.style.left = `${left}px`;
      wrapper.style.top = `${top}px`;
      wrapper.style.position = 'absolute';
      wrapper.style.transform = 'none';
      wrapper.style.overflow = 'hidden';
      wrapper.style.borderRadius = '6px';
      wrapper.style.zIndex = 10 + ((i%3)+1);

      const imgEl = wrapper.querySelector('img');
      if (imgEl) {
        imgEl.style.width = '100%';
        imgEl.style.height = '100%';
        imgEl.style.objectFit = 'cover';
        imgEl.style.position = 'absolute';
        imgEl.style.left = '0';
        imgEl.style.top = '0';
        imgEl.style.transform = 'none';
        imgEl.style.borderRadius = '0';
        imgEl.style.display = 'block';
      }
    });
  }

  function restart(userTriggered = false) {
    if (userTriggered) {
      cancelPlay = true;
    }

    heroStage.classList.remove('collage');
    imgElements.forEach(img => {
      img.classList.remove('show');
      img.style.transition = '';
      img.style.left = '50%';
      img.style.top = '50%';
      img.style.width = '';
      img.style.height = '';
      img.style.transform = 'translate(-50%, -50%) scale(1.05)';
    });
    cancelPlay = false;
    isPlaying = false;
    playSlideshowAndAssemble();
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => restart(true));
  }

  playSlideshowAndAssemble();
});
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('sidebar-toggle');
  const closeBtn = document.getElementById('sidebar-close');
  const sidebar = document.querySelector('.sidebar');

  if (!toggle || !sidebar) return;

  function openSidebar() {
    document.body.classList.add('sidebar-open');
    sidebar.setAttribute('aria-hidden', 'false');
    sidebar.focus?.();
  }
  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
    sidebar.setAttribute('aria-hidden', 'true');
  }
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.toggle('sidebar-open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  }
  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('sidebar-open')) return;
    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
      closeSidebar();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('sidebar-open')) {
      closeSidebar();
    }
  });

});
const contactBtn = document.getElementById('contact-toggle');
const contactPopup = document.getElementById('contact-popup');

if (contactBtn && contactPopup) {
  contactBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    contactPopup.classList.toggle('show');
  });
  document.addEventListener('click', (e) => {
    if (!contactPopup.contains(e.target) && !contactBtn.contains(e.target)) {
      contactPopup.classList.remove('show');
    }
  });
}
const quizData = [
  {
    animal: "Elefante africano",
    habitat: "Sabana y selvas africanas",
    descripcion: "El mamífero terrestre más grande del planeta.",
    curioso: "Sus orejas ayudan a regular su temperatura.",
    alimentacion: "Herbívoro, consume hojas, ramas y frutas."
  },
  {
    animal: "Delfín común",
    habitat: "Océanos y mares templados",
    descripcion: "Mamífero marino muy sociable y ágil.",
    curioso: "Duerme con un hemisferio cerebral a la vez.",
    alimentacion: "Peces y calamares."
  },
  {
    animal: "Guacamayo azulamarillo",
    habitat: "Selvas tropicales de Sudamérica",
    descripcion: "Ave de gran tamaño y colores brillantes.",
    curioso: "Pueden imitar la voz humana.",
    alimentacion: "Frutas, semillas y nueces."
  },
  {
    animal: "Pingüino emperador",
    habitat: "Antártida",
    descripcion: "El pingüino más grande del mundo.",
    curioso: "Se agrupan para protegerse del frío extremo.",
    alimentacion: "Peces, crustáceos y calamares."
  },
  {
    animal: "Capibara",
    habitat: "Zonas húmedas de Sudamérica",
    descripcion: "El roedor más grande del mundo.",
    curioso: "Pasa gran parte del día en el agua.",
    alimentacion: "Hierbas y plantas acuáticas."
  },
  {
    animal: "Tortuga marina",
    habitat: "Océanos tropicales y subtropicales",
    descripcion: "Reptil marino con caparazón aerodinámico.",
    curioso: "Las hembras vuelven a la misma playa donde nacieron.",
    alimentacion: "Algas, medusas o crustáceos según la especie."
  },
  {
    animal: "Iguana verde",
    habitat: "Bosques húmedos y riberas de ríos",
    descripcion: "Reptil arborícola de color verde brillante.",
    curioso: "Puede regenerar parte de su cola si la pierde.",
    alimentacion: "Principalmente herbívora."
  },
  {
    animal: "Pez payaso",
    habitat: "Arrecifes de coral tropicales",
    descripcion: "Pez pequeño de color naranja con franjas blancas.",
    curioso: "Vive entre las anémonas marinas.",
    alimentacion: "Plancton y pequeños crustáceos."
  },
  {
    animal: "Tiburón martillo",
    habitat: "Océanos cálidos y templados",
    descripcion: "Tiburón con cabeza en forma de martillo.",
    curioso: "Sus ojos separados le dan visión de 360°.",
    alimentacion: "Peces, rayas y crustáceos."
  },
  {
    animal: "Rana verde",
    habitat: "Zonas húmedas y charcas",
    descripcion: "Anfibio de piel verde y patas largas.",
    curioso: "Respira tanto por la piel como por los pulmones.",
    alimentacion: "Insectos pequeños y gusanos."
  },
  {
    animal: "Salamandra común",
    habitat: "Bosques húmedos europeos",
    descripcion: "Anfibio negro con manchas amarillas.",
    curioso: "Puede segregar toxinas como defensa.",
    alimentacion: "Insectos, lombrices y babosas."
  }
];

const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const nextBtn = document.getElementById('quiz-next');
const resultEl = document.getElementById('quiz-result');

let currentQuestion = null;
let selectedAnimal = null;
let questionType = null;

function loadQuestion() {
  resultEl.textContent = '';
  selectedAnimal = quizData[Math.floor(Math.random() * quizData.length)];
  const types = ["habitat", "descripcion", "curioso", "alimentacion"];
  questionType = types[Math.floor(Math.random() * types.length)];
  
  questionEl.textContent = `¿Cuál es el ${questionType} del ${selectedAnimal.animal}?`;
  const options = [selectedAnimal[questionType]];
  while (options.length < 4) {
    const random = quizData[Math.floor(Math.random() * quizData.length)][questionType];
    if (!options.includes(random)) options.push(random);
  }
  options.sort(() => Math.random() - 0.5);
  
  optionsEl.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.addEventListener('click', () => checkAnswer(opt, btn));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(answer, button) {
  if (answer === selectedAnimal[questionType]) {
    resultEl.textContent = `✅ ¡Correcto! ${selectedAnimal.animal}: ${selectedAnimal[questionType]}`;
    button.style.background = 'lightgreen';
  } else {
    resultEl.textContent = `❌ Incorrecto. ${selectedAnimal.animal}: ${selectedAnimal[questionType]}`;
    button.style.background = '#ff7675';
  }
  [...optionsEl.children].forEach(btn => btn.disabled = true);
}

nextBtn.addEventListener('click', loadQuestion);
loadQuestion();

