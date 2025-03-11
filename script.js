const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.nav.prev');
const nextBtn = document.querySelector('.nav.next');
const caption = document.querySelector('.caption');
const thumbnails = document.querySelectorAll('.thumbnails img');

let currentIndex = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    thumbnails[i].classList.remove('active-thumb');
    if (i === index) {
      slide.classList.add('active');
      thumbnails[i].classList.add('active-thumb');
    }
  });
  updateCaption(index);
}

function updateCaption(index) {
  caption.textContent = slides[index].dataset.caption;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 4000); // Change image every 4 seconds
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Event Listeners
nextBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

thumbnails.forEach((thumb, idx) => {
  thumb.addEventListener('click', () => {
    currentIndex = idx;
    showSlide(currentIndex);
    stopAutoSlide();
    startAutoSlide();
  });
});

// Swipe Support
let startX = 0;
document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
document.querySelector('.slider-container').addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextSlide();
  if (endX - startX > 50) prevSlide();
});

// Initialize
showSlide(currentIndex);
startAutoSlide();
