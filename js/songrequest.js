document.getElementById('songRequestForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect form data
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const clientName = document.getElementById('clientName').value;
  const clientEmail = document.getElementById('clientEmail').value;
  const clientPhone = document.getElementById('clientPhone').value;

  // Split textarea inputs into arrays
  const mustPlay = document.getElementById('mustPlay').value.split('\n').filter(song => song.trim() !== '');
  const doNotPlay = document.getElementById('doNotPlay').value.split('\n').filter(song => song.trim() !== '');

  const additionalNotes = document.getElementById('additionalNotes').value;

  // Generate PDF using jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text(`Song Request Form`, 10, 10);
  doc.text(`Event Name: ${eventName}`, 10, 20);
  doc.text(`Event Date: ${eventDate}`, 10, 30);
  doc.text(`Client Name: ${clientName}`, 10, 40);
  doc.text(`Email: ${clientEmail}`, 10, 50);
  doc.text(`Phone: ${clientPhone}`, 10, 60);

  doc.text(`Must-Play Songs:`, 10, 70);
  mustPlay.forEach((song, index) => {
    doc.text(`- ${song || 'N/A'}`, 10, 80 + index * 10);
  });

  doc.text(`Do-Not-Play Songs:`, 10, 90 + mustPlay.length * 10);
  doNotPlay.forEach((song, index) => {
    doc.text(`- ${song || 'N/A'}`, 10, 100 + mustPlay.length * 10 + index * 10);
  });

  doc.text(`Additional Notes:`, 10, 110 + (mustPlay.length + doNotPlay.length) * 10);
  doc.text(additionalNotes || 'N/A', 10, 120 + (mustPlay.length + doNotPlay.length) * 10);

  // Save PDF
  doc.save('SongRequestForm.pdf');

  // Show success message
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';
});