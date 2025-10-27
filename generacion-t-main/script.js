/* ---------- EFECTO HOJAS ---------- */
const hojasContainer = document.getElementById("hojas");

function crearHoja() {
  const hoja = document.createElement("div");
  hoja.className = "hoja"; // coincide con .hoja en CSS
  hoja.style.left = Math.random() * window.innerWidth + "px";
  hoja.style.top = '-50px'; // empezar arriba de la pantalla
  // variar tamaño ligeramente para naturalidad
  const size = 18 + Math.floor(Math.random() * 30);
  hoja.style.width = size + 'px';
  hoja.style.height = size + 'px';
  hoja.style.animationDuration = (3 + Math.random() * 5) + "s";
  hojasContainer.appendChild(hoja);

  // Elimina la hoja después de que cae
  setTimeout(() => hoja.remove(), 9000);
}

// Crear hojas cada 0.5 segundos
setInterval(crearHoja, 500);

/*rrt,incio*/
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const slider = document.createElement('div');
  slider.className = 'bg-slider';
  const s1 = document.createElement('div');
  const s2 = document.createElement('div');
  const s3 = document.createElement('div');
  s1.className = 'bg-slide s1 visible';
  s2.className = 'bg-slide s2';
  s3.className = 'bg-slide s3';
  slider.appendChild(s1);
  slider.appendChild(s2);
  slider.appendChild(s3);
  body.insertBefore(slider, body.firstChild);
  let currentBg = 0;
  const slides = [s1, s2, s3];
  setInterval(() => {
    slides[currentBg].classList.remove('visible');
    currentBg = (currentBg + 1) % slides.length;
    slides[currentBg].classList.add('visible');
  }, 7000);
  const heroStage = document.getElementById('hero-stage');
  const restartBtn = document.getElementById('hero-restart');

  // MAP (existing code expected a #map element; we've added it in the HTML)
  const mapEl = document.getElementById('map');
  if (mapEl && typeof L !== 'undefined') {
    const map = L.map(mapEl, {zoomControl: true}).setView([10, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Lista ampliada de animales. Añade nuevas entradas aquí. Cada objeto tiene:
    // coords: [lat, lng], name, clase (para agrupar), ruta (nombre de ruta/descripción corta), img (ruta de imagen - deja espacio para que agregues las tuyas)
    const markers = [
      {coords: [-3.4653, -62.2159], name: 'Jaguar', clase: 'Mamífero', ruta: 'Panthera onca', img: 'imgs/jaguar.jpg'},
      {coords: [0.0236, 37.9062], name: 'Elefante africano', clase: 'Mamífero', ruta: 'Loxodonta africana', img: 'imgs/elefante_africano.jpg'},
      {coords: [-1.9579, 30.1127], name: 'Leona', clase: 'Mamífero', ruta: 'Panthera leo (hembra)', img: 'imgs/leona.jpg'},
      {coords: [-34.6037, -58.3816], name: 'Carpincho (Capibara)', clase: 'Mamífero', ruta: 'Hydrochoerus hydrochaeris', img: 'imgs/capibara.jpg'},
      {coords: [36.0, -5.0], name: 'Delfín común', clase: 'Mamífero', ruta: 'Delphinus delphis', img: 'imgs/delfin_comun.jpg'},
      {coords: [25.0, -80.0], name: 'Tiburón martillo', clase: 'Pez', ruta: 'Sphyrna spp.', img: 'imgs/tiburon_martillo.jpg'},
      {coords: [51.5074, -0.1278], name: 'Zorro común', clase: 'Mamífero', ruta: 'Vulpes vulpes', img: 'imgs/zorro_comun.jpg'},

      // aves
      {coords: [-3.0, -60.0], name: 'Guacamayo', clase: 'Ave', ruta: 'Ara macao', img: 'imgs/guacamayo.jpg'},
      {coords: [-54.8, -68.3], name: 'Pingüino', clase: 'Ave', ruta: 'Spheniscidae', img: 'imgs/pinguino.jpg'},
      {coords: [2.5, -60.0], name: 'Cóndor', clase: 'Ave', ruta: 'Vultur gryphus', img: 'imgs/condor.jpg'},

      // reptiles
      {coords: [-8.5167, 119.4333], name: 'Iguana', clase: 'Reptil', ruta: 'Iguana iguana', img: 'imgs/iguana.jpg'},
      {coords: [30.0444, 31.2357], name: 'Cocodrilo', clase: 'Reptil', ruta: 'Crocodylidae', img: 'imgs/cocodrilo.jpg'},

      // peces
      {coords: [-18.2871, 147.6992], name: 'Arrecife (representativo)', clase: 'Pez', ruta: 'Ecosistema coralino', img: 'imgs/arrecife.jpg'},
      {coords: [10.0, -60.0], name: 'Pez payaso', clase: 'Pez', ruta: 'Amphiprioninae', img: 'imgs/pez_payaso.jpg'},

      // anfibios
      {coords: [-3.0, -60.0], name: 'Rana', clase: 'Anfibio', ruta: 'Anura', img: 'imgs/rana.jpg'},
      {coords: [5.0, -75.0], name: 'Salamandra (representativa)', clase: 'Anfibio', ruta: 'Caudata', img: 'imgs/salamandra.jpg'},

      // especies extra para densidad en el mapa
      {coords: [60.0, -149.0], name: 'Alce', clase: 'Mamífero', ruta: 'Alces alces', img: 'imgs/alce.jpg'},
      {coords: [35.6895, 139.6917], name: 'Ciervo Sika', clase: 'Mamífero', ruta: 'Cervus nippon', img: 'imgs/ciervo_sika.jpg'},
      {coords: [64.9631, -19.0208], name: 'Foca', clase: 'Mamífero', ruta: 'Phocidae', img: 'imgs/foca.jpg'}
    ];

    // Agrupar coordenadas por clase para crear rutas (polilíneas) representativas
    const rutasPorClase = {};

    markers.forEach(m => {
      // contenido HTML mínimo para el popup/tooltip con espacio para que agregues tu propia imagen en imgs/
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
      // Mostrar popup al pasar el cursor y cerrarlo al salir
      marker.on('mouseover', function() { this.openPopup(); });
      marker.on('mouseout', function() { this.closePopup(); });

      // Acumular para rutas
      if (!rutasPorClase[m.clase]) rutasPorClase[m.clase] = [];
      rutasPorClase[m.clase].push(m.coords);
    });

    // Dibujar polilíneas para cada clase (ruta representativa). Son añadidas encima del mapa.
    Object.keys(rutasPorClase).forEach(clase => {
      const latlngs = rutasPorClase[clase];
      // solo si hay más de 1 punto para conectar
      if (latlngs.length > 1) {
        L.polyline(latlngs, {weight: 3, dashArray: '6,8'}).addTo(map);
      }
    });

    // Ajustar el bounds del mapa para que muestre todos los marcadores de forma automática
    const allCoords = markers.map(m => m.coords);
    map.fitBounds(allCoords, {padding: [40,40]});
  }


  const images = [
    'imgs/mamifero1.jpg', 'imgs/mamifero2.jpg', 'imgs/mamifero3.jpeg', 'imgs/manifero4.jpg', 'imgs/mamifero5.jpg',
    'imgs/ave1.jpg', 'imgs/ave2.jpg',
    'imgs/reptille1.jpg', 'imgs/reptille2.jpg',
    'imgs/pez1.jpg', 'imgs/pez2.jpg',
    'imgs/anfibio1.jpg', 'imgs/anfibio2.jpg'
  ];

  const imgElements = [];
  let isPlaying = false;
  let cancelPlay = false;

  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Animal ' + (i+1);
    img.className = 'hero-img';
    img.dataset.index = i;
    heroStage.appendChild(img);
    imgElements.push(img);
  });

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  async function playSlideshowAndAssemble() {
    if (isPlaying) return;
    isPlaying = true;
    cancelPlay = false;

    heroStage.classList.remove('collage');
    imgElements.forEach(img => {
      img.style.transition = '';
      img.style.left = '';
      img.style.top = '';
      img.style.width = '';
      img.style.height = '';
      img.style.zIndex = '';
      img.classList.remove('show');
      img.style.objectFit = 'cover';
      img.style.position = 'absolute';
      img.style.transform = 'translate(-50%, -50%) scale(1.05)';
      img.style.left = '50%';
      img.style.top = '50%';
    });

    for (let i = 0; i < imgElements.length; i++) {
      imgElements.forEach(el => el.classList.remove('show'));
      const el = imgElements[i];
      el.classList.add('show');
      await sleep(1200);
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
    // calcular columnas/filas aproximadas (casi cuadrado)
    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);

    const stageRect = heroStage.getBoundingClientRect();
    const gap = 8; // px entre fotos

    const tileW = (stageRect.width - gap * (cols + 1)) / cols;
    const tileH = (stageRect.height - gap * (rows + 1)) / rows;

    heroStage.classList.add('collage');

    imgElements.forEach((img, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const left = gap + col * (tileW + gap);
      const top = gap + row * (tileH + gap);

      img.style.transition = `all ${900 + Math.floor(Math.random()*400)}ms cubic-bezier(.2,.9,.2,1)`;
      img.style.width = `${Math.round(tileW)}px`;
      img.style.height = `${Math.round(tileH)}px`;
      img.style.left = `${left}px`;
      img.style.top = `${top}px`;
      img.style.position = 'absolute';
      img.style.transform = 'none';
      img.style.objectFit = 'cover';
      img.style.zIndex = 10 + ((i%3)+1);
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
