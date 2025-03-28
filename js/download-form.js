document.getElementById('songRequestForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Simulate sending data to your email
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  console.log("Form Data:", data);

  // Show loading state
  const submitButton = document.querySelector('#songRequestForm button');
  toggleLoadingState(submitButton, true);

  // Simulate API call delay
  setTimeout(() => {
    try {
      // Reset form
      e.target.reset();

      // Show success message
      const successMessage = document.getElementById('successMessage');
      showSuccessMessage(successMessage);

      // Redirect to download.html instead of triggering file download
      redirectToDownloadPage();

      // Reset button state
      toggleLoadingState(submitButton, false);

      // Hide success message after 5 seconds
      hideSuccessMessageAfterDelay(successMessage, 5000);
    } catch (error) {
      console.error("Error during form submission or redirection:", error);
      alert("An error occurred while processing your request. Please try again.");
      toggleLoadingState(submitButton, false);
    }
  }, 1500); // Simulated delay
});

/**
 * Toggles the loading state of the submit button.
 * @param {HTMLElement} button - The submit button element.
 * @param {boolean} isLoading - Whether to show the loading state.
 */
function toggleLoadingState(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.textContent = 'Processing...';
  } else {
    button.disabled = false;
    button.textContent = 'Download Form';
  }
}

/**
 * Displays the success message.
 * @param {HTMLElement} successMessage - The success message element.
 */
function showSuccessMessage(successMessage) {
  successMessage.style.display = 'block';
}

/**
 * Redirects users to the download.html page.
 */
function redirectToDownloadPage() {
  const fileName = 'song-request-form.pdf'; // Specify the file name
  window.location.href = `download.html?file=${encodeURIComponent(fileName)}`;
}

/**
 * Hides the success message after a delay.
 * @param {HTMLElement} successMessage - The success message element.
 * @param {number} delay - Delay in milliseconds before hiding the message.
 */
function hideSuccessMessageAfterDelay(successMessage, delay) {
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, delay);
}