// This is a serverless script

import { Resend } from 'resend';

// This is the function Cloudflare will run
export async function onRequestPost(context) {
  
  // Initialize Resend
  // It securely reads the API key from your Cloudflare settings
  const resend = new Resend(context.env.RESEND_API_KEY);

  try {
    // Get the data the "waiter" (frontend) sent to us
    const data = await context.request.json();

    // Validate the data (optional but good practice)
    if (!data.name || !data.email || !data.subject || !data.message) 
    {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Now, we use the Resend code to send the email
    // This part runs securely on the server
    const { data: resendData, error } = await resend.emails.send
    ({
      from: 'Contact Form <onboarding@resend.dev>', // See Note 1
      to: ['samuelagudelo534@gmail.com'],      // <-- REPLACE with your actual email
      subject: `New Message: ${data.subject}`,
      reply_to: data.email, // So you can reply directly to the user
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      // Send an error message back to the frontend
      return new Response(JSON.stringify({ message: 'Error sending email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // All good! Send a success message back to the frontend
    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}