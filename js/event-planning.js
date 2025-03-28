document.addEventListener('DOMContentLoaded', function() {
  // Wait for jsPDF to be fully loaded
  if (typeof window.jspdf !== 'undefined') {
      initPDFDownload();
  } else {
      // Fallback in case jsPDF doesn't load properly
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = initPDFDownload;
      document.head.appendChild(script);
  }

  function initPDFDownload() {
      const downloadButton = document.getElementById('downloadPdf');
      const successMessage = document.getElementById('successMessage');
      
      if (downloadButton) {
          downloadButton.addEventListener('click', function() {
              const { jsPDF } = window.jspdf;
              const doc = new jsPDF();

              // Set document properties
              doc.setProperties({
                  title: 'Event Planning Guide',
                  subject: 'DJ Event Planning',
                  author: 'DJ Bobzit',
                  keywords: 'event, planning, dj, music',
                  creator: 'KypexTech'
              });

              // Add title
              doc.setFontSize(22);
              doc.setTextColor(0, 0, 0);
              doc.text("Event Planning Guide", 105, 15, { align: 'center' });
              doc.setFontSize(12);
              doc.text("by DJ Bobzit", 105, 22, { align: 'center' });

              // Add introduction section
              doc.setFontSize(16);
              doc.text("Introduction", 14, 35);
              doc.setFontSize(12);
              doc.text("Planning an event can be overwhelming, but with the right tools and guidance, it can also be", 14, 45);
              doc.text("exciting and rewarding. This guide will help you plan your special event.", 14, 50);

              // Add checklist section
              doc.setFontSize(16);
              doc.text("Event Planning Checklist", 14, 65);
              doc.setFontSize(12);
              doc.text("- 6 Months Before: Book your DJ, venue, and other vendors.", 14, 75);
              doc.text("- 3 Months Before: Finalize guest list and create a rough playlist.", 14, 80);
              doc.text("- 1 Month Before: Confirm all vendor details and finalize timeline.", 14, 85);
              doc.text("- 1 Week Before: Share playlist and special requests with DJ.", 14, 90);
              doc.text("- Day Of: Relax and enjoy your event!", 14, 95);

              // Get song lists
              const mustPlaySongs = document.getElementById('mustPlaySongs').value.split('\n').filter(song => song.trim() !== '');
              const doNotPlaySongs = document.getElementById('doNotPlaySongs').value.split('\n').filter(song => song.trim() !== '');

              // Add song requests section
              doc.setFontSize(16);
              doc.text("Song Requests", 14, 110);
              doc.setFontSize(12);
              doc.text("Must-Play Songs:", 14, 120);
              
              let yPos = 125;
              mustPlaySongs.forEach((song, index) => {
                  if (yPos > 280) {
                      doc.addPage();
                      yPos = 20;
                  }
                  doc.text(`• ${song}`, 14, yPos);
                  yPos += 5;
              });

              doc.text("Do-Not-Play Songs:", 14, yPos + 5);
              yPos += 10;
              
              doNotPlaySongs.forEach((song, index) => {
                  if (yPos > 280) {
                      doc.addPage();
                      yPos = 20;
                  }
                  doc.text(`• ${song}`, 14, yPos);
                  yPos += 5;
              });

              // Add timeline section
              doc.setFontSize(16);
              doc.text("Sample Event Timeline", 14, yPos + 10);
              doc.setFontSize(12);
              doc.text("- 6:00 PM: Guest arrival & cocktail hour", 14, yPos + 20);
              doc.text("- 7:00 PM: Dinner", 14, yPos + 25);
              doc.text("- 8:00 PM: First dance & speeches", 14, yPos + 30);
              doc.text("- 9:00 PM: Open dance floor", 14, yPos + 35);
              doc.text("- 11:00 PM: Last song & farewell", 14, yPos + 40);

              // Add tips section
              doc.setFontSize(16);
              doc.text("Tips for Working with Your DJ", 14, yPos + 55);
              doc.setFontSize(12);
              doc.text("- Share playlist and preferences 2 weeks before", 14, yPos + 65);
              doc.text("- Communicate special requests (first dance, etc.)", 14, yPos + 70);
              doc.text("- Confirm event details 1 week prior", 14, yPos + 75);

              // Save the PDF
              doc.save('DJ_Bobzit_Event_Planning_Guide.pdf');
              
              // Show success message
              successMessage.style.display = 'block';
              setTimeout(() => {
                  successMessage.style.display = 'none';
              }, 5000);
          });
      }
  }
});