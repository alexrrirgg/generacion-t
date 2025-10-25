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
  const heroStage = document.getElementById('hero-stage');
  const restartBtn = document.getElementById('hero-restart');

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
