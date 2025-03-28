document.getElementById('songRequestForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const successMessage = document.getElementById('successMessage');
  const submitButton = form.querySelector('button');

  // Show loading
  submitButton.disabled = true;
  submitButton.textContent = 'Processing...';
  successMessage.style.display = 'block';

  setTimeout(() => {
    // Reset form fields (optional)
    form.reset();

    // Simulate download
    const fileUrl = 'assets/song-request-form.pdf'; // ✅ Make sure this file exists
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'DJ_Bobzit_Song_Request_Form.pdf';
    link.click();

    // Reset UI
    submitButton.disabled = false;
    submitButton.textContent = 'Download Now';
    successMessage.textContent = 'Thanks! Your download should begin shortly.';

    // Hide after delay
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 4000);
  }, 1500);
});