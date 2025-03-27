// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Simulate form submission
  const successMessage = document.getElementById('successMessage');
  const form = e.target;
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  // Simulate API call
  setTimeout(() => {
    // Reset form
    form.reset();
    // Show success message
    successMessage.style.display = 'block';
    submitButton.textContent = 'Book Your DJ';
    submitButton.disabled = false;
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
  }, 1500);
});

// Download file function
function downloadFile(filename) {
  // In a real implementation, this would trigger a file download
  console.log(`Initiating download for ${filename}`);
  alert(`Downloading ${filename}... (This is a demo)`);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth'
  });
}

// Animate elements when they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, {
  threshold: 0.1
});

// Observe all elements with animations
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
  // Reset all tracks
  tracks.forEach(track => track.classList.remove('active'));
  // Set the new active track
  tracks[index].classList.add('active');
  audio.src = tracks[index].getAttribute('data-src');
  // When metadata is loaded, update duration
  audio