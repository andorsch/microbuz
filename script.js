document.getElementById('year').textContent = new Date().getFullYear();

(function initVehicleCarousel() {
  const root = document.querySelector('[data-vehicle-carousel]');
  if (!root) return;

  const track = root.querySelector('.vehicle-carousel__track');
  const prev = root.querySelector('.vehicle-carousel__btn--prev');
  const next = root.querySelector('.vehicle-carousel__btn--next');
  const dotsHost = document.getElementById('vehicle-carousel-dots');
  if (!track || !prev || !next || !dotsHost) return;

  const slides = track.querySelectorAll('.vehicle-carousel__slide');
  const n = slides.length;
  if (n === 0) return;

  let index = 0;

  function go(i) {
    index = ((i % n) + n) % n;
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsHost.querySelectorAll('.vehicle-carousel__dot').forEach((dot, j) => {
      dot.setAttribute('aria-selected', j === index ? 'true' : 'false');
      dot.tabIndex = j === index ? 0 : -1;
    });
  }

  for (let j = 0; j < n; j++) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'vehicle-carousel__dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Imaginea ${j + 1} din ${n}`);
    dot.addEventListener('click', () => go(j));
    dotsHost.appendChild(dot);
  }

  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));

  go(0);
})();
