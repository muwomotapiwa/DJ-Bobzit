document.addEventListener('DOMContentLoaded', function() {
  const downloadButton = document.getElementById('downloadSelectedSongs');
  
  if (downloadButton) {
      downloadButton.addEventListener('click', handleDownload);
  }

  function handleDownload() {
      const selectedSongs = Array.from(
          document.querySelectorAll('input[name="songs"]:checked')
      ).map(input => input.value);

      if (selectedSongs.length === 0) {
          showNotification('Please select at least one song to download.', 'error');
          return;
      }

      showNotification(`Downloading ${selectedSongs.length} song(s)...`, 'success');
      
      // Simulate download process
      selectedSongs.forEach(song => {
          setTimeout(() => {
              downloadSong(song);
          }, 300);
      });
  }

  function downloadSong(songFilename) {
      try {
          // Create temporary download link
          const link = document.createElement('a');
          link.href = `assets/audio/${songFilename}`;
          link.download = songFilename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } catch (error) {
          console.error('Download failed:', error);
          showNotification(`Failed to download ${songFilename}`, 'error');
      }
  }

  function showNotification(message, type) {
      const notification = document.createElement('div');
      notification.className = 'download-notification';
      
      // Style based on notification type
      notification.style.backgroundColor = type === 'error' ? '#ff4444' : '#7FFF00';
      notification.style.color = type === 'error' ? '#fff' : '#000';
      
      notification.textContent = message;
      document.body.appendChild(notification);
      
      // Trigger animation
      setTimeout(() => {
          notification.style.opacity = '1';
          notification.style.transform = 'translateY(0)';
      }, 10);
      
      // Remove notification after delay
      setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transform = 'translateY(30px)';
          setTimeout(() => {
              notification.remove();
          }, 300);
      }, 3000);
  }
});

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
.download-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 1000;
  font-weight: 600;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.3s ease;
  max-width: 300px;
  text-align: center;
}
`;
document.head.appendChild(style);