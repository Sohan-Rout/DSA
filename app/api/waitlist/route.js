import nodemailer from 'nodemailer';

export async function POST(request) {
    const { email, message } = await request.json();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        // Send email to yourself with the hidden message
        await transporter.sendMail({
            from: `"Waitlist Signup" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Waitlist Signup: ${email}`,
            text: `
                Email: ${email}
                Message: ${message}
                
                Filter: label:waitlist
            `,
            html: `
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
                <p>Filter: label:waitlist</p>
            `
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}