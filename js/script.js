// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const successMessage = document.getElementById('successMessage');
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  setTimeout(() => {
    form.reset();
    successMessage.style.display = 'block';
    submitButton.textContent = 'Book Your DJ';
    submitButton.disabled = false;
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  }, 1500);
});

// Download file function
function downloadFile(filename) {
  console.log(`Initiating download for ${filename}`);
  alert(`Downloading ${filename}... (This is a demo)`);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Animate elements when they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('animated');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.form-logo, .form-text, .download-logo, .download-text').forEach(el => {
  observer.observe(el);
});

// Music Player Functionality
const tracks = document.querySelectorAll('.track');
const playButton = document.getElementById('playButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

let audio = new Audio();
let currentTrack = 0;
let isPlaying = false;

// Load track
function loadTrack(index) {
  tracks.forEach(track => track.classList.remove('active'));
  tracks[index].classList.add('active');
  audio.src = tracks[index].getAttribute('data-src');
  audio.load();
  audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
  });
}

// Play/pause track
function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playTrack() {
  audio.play();
  isPlaying = true;
  playButton.innerHTML = '⏸';
}

function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playButton.innerHTML = '▶';
}

// Update progress bar
function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
}

// Set progress when clicked
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Format time (seconds to MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event listeners
playButton.addEventListener('click', togglePlay);
prevButton.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) playTrack();
});
nextButton.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) playTrack();
});
document.querySelector('.progress-container').addEventListener('click', setProgress);

// Track click events
tracks.forEach((track, index) => {
  track.addEventListener('click', () => {
    loadTrack(index);
    playTrack();
  });
});

// Time update
audio.addEventListener('timeupdate', updateProgress);

// When track ends
audio.addEventListener('ended', () => {
  nextButton.click();
});

// Load first track
loadTrack(0);