document.getElementById('downloadSelectedSongs').addEventListener('click', function () {
  const selectedSongs = Array.from(document.querySelectorAll('input[name="songs"]:checked')).map(input => input.value);

  if (selectedSongs.length === 0) {
    alert('Please select at least one song to download.');
    return;
  }

  // Loop through selected songs and initiate download
  selectedSongs.forEach(song => {
    const link = document.createElement('a');
    link.href = `assets/audio/${song}`;
    link.download = song; // Use the song filename as the download name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  alert(`Downloading ${selectedSongs.length} song(s)...`);
});