document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', async function (event) {
    // 1. Prevent the form from refreshing the page
    event.preventDefault();

    // 2. Disable the button and show a loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.className = ''; // Reset classes
    
    // 3. Gather and clean the form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      subject: formData.get('subject').trim(),
      message: formData.get('message').trim()
    };

    // Basic Validation: Check for empty fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      showStatus('Please fill out all fields.', 'status-error');
      resetButton();
      return;
    }

    // Basic Validation: Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showStatus('Please enter a valid email address.', 'status-error');
      resetButton();
      return;
    }

    try {
      // 4. Send the data to your Cloudflare Pages Function
      // Note: Cloudflare maps the 'functions' folder to the root of your site.
      // So a file at 'functions/sendMail.js' is accessed via '/sendMail'
      const response = await fetch('/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // 5. Handle the response
      if (response.ok) {
        showStatus('Message sent successfully! I will get back to you soon.', 'status-success');
        contactForm.reset(); // Clear the form
      } else {
        showStatus(`Error: ${result.message || 'Something went wrong.'}`, 'status-error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      showStatus('Error: Could not send message. Please check your internet connection.', 'status-error');
    } finally {
      // 6. Always re-enable the button when done
      resetButton();
    }
  });

  // Helper function to display messages
  function showStatus(message, className) {
    formStatus.textContent = message;
    formStatus.className = className;
  }

  // Helper function to reset the submit button
  function resetButton() {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }
});