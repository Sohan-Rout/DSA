import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your receiving email
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return Response.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ message: "Error sending email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
