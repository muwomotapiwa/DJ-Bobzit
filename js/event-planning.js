// Function to generate and download the Event Planning Guide as a PDF
document.getElementById('downloadPdf').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;

  // Create a new PDF document
  const doc = new jsPDF();

  // Add content to the PDF
  doc.setFontSize(20);
  doc.text("Event Planning Guide", 10, 10);

  doc.setFontSize(16);
  doc.text("Introduction", 10, 20);
  doc.setFontSize(12);
  doc.text("Planning an event can be overwhelming, but with the right tools and guidance, it can also be exciting and rewarding.", 10, 30);

  doc.setFontSize(16);
  doc.text("Event Checklist", 10, 50);
  doc.setFontSize(12);
  doc.text("- 6 Months Before: Book your DJ, venue, and other vendors.", 10, 60);
  doc.text("- 3 Months Before: Finalize guest list and create a rough playlist.", 10, 70);
  doc.text("- 1 Month Before: Confirm all vendor details and finalize the event timeline.", 10, 80);
  doc.text("- 1 Week Before: Share your playlist and any special requests with your DJ.", 10, 90);
  doc.text("- Day Of: Relax and enjoy your event!", 10, 100);

  doc.setFontSize(16);
  doc.text("Song Request Template", 10, 120);
  doc.setFontSize(12);
  doc.text("Must-Play Songs:", 10, 130);
  doc.text("Do-Not-Play Songs:", 10, 140);

  doc.setFontSize(16);
  doc.text("Sample Event Timeline", 10, 160);
  doc.setFontSize(12);
  doc.text("- 6:00 PM: Guest arrival & cocktail hour", 10, 170);
  doc.text("- 7:00 PM: Dinner", 10, 180);
  doc.text("- 8:00 PM: First dance & speeches", 10, 190);
  doc.text("- 9:00 PM: Open dance floor", 10, 200);
  doc.text("- 11:00 PM: Last song & farewell", 10, 210);

  doc.setFontSize(16);
  doc.text("Tips for Working with Your DJ", 10, 230);
  doc.setFontSize(12);
  doc.text("- Share your playlist and preferences at least 2 weeks before the event.", 10, 240);
  doc.text("- Communicate any special requests (e.g., first dance, announcements).", 10, 250);
  doc.text("- Confirm event details (date, time, location) 1 week prior.", 10, 260);

  // Save the PDF
  doc.save('EventPlanningGuide.pdf');
});

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

// Observe elements for animations
document.querySelectorAll('.planning-logo, .form-text, .download-logo, .download-text').forEach(el => {
  observer.observe(el);
});