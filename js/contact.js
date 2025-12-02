
document.addEventListener('DOMContentLoaded', function ()
{

  // Get all the elements we'll need
  const contactForm = document.getElementById('contactForm');
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', async function (event)
  {
    // 1. Prevent the form's default "submit" behavior
    event.preventDefault();

    // 2. Disable the button and show a "sending" message
    submitButton.disabled = true;
    formStatus.textContent = 'Sending...';
    formStatus.style.color = '#333'; // Reset color

    // 3. Gather all the form data
    const formData = new FormData(contactForm);
    const data =
    {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'), // We get the subject from your form!
      message: formData.get('message')
    };

    try
    {
      // 4. Send the data to our backend serverless function
      const response = await fetch('/functions/sendMail',
        {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

      // 5. Handle the response from the backend
      if (response.ok)
      {
        // Success!
        formStatus.textContent = 'Message sent successfully!';
        formStatus.style.color = 'green';
        contactForm.reset(); // Clear the form fields
      }
      else
      {
        // Server error (e.g., Resend failed)
        const errorData = await response.json();
        formStatus.textContent = `Error: ${errorData.message || 'Something went wrong.'}`;
        formStatus.style.color = 'red';
      }

    }
    catch (error)
    {
      // Network error (e.g., user is offline)
      console.error('Submission error:', error);
      formStatus.textContent = 'Error: Could not send message. Please check your connection.';
      formStatus.style.color = 'red';
    }
    finally
    {
      // 6. Re-enable the submit button regardless of outcome
      submitButton.disabled = false;
    }

  });
});