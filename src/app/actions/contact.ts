"use server";

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const errors: Record<string, string[]> = {};

    // 1. Sanitization & Validation
    if (!name || name.length < 2) {
        errors.name = ["Name must be at least 2 characters"];
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = ["Invalid email address"];
    }

    if (!message || message.length < 10) {
        errors.message = ["Message must be at least 10 characters"];
    }

    if (Object.keys(errors).length > 0) {
        return { error: errors };
    }

    // 2. Send Email via Resend
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY is missing. Mocking email send.");
            // Fallback to log if no key, for development safety
            console.log(`[EMAIL MOCK] To: lamusgana@gmail.com, From: ${email}, Msg: ${message}`);
        } else {
            const { Resend } = await import('resend');
            const resend = new Resend(process.env.RESEND_API_KEY);

            const { data, error } = await resend.emails.send({
                from: 'La Musgaña Web <onboarding@resend.dev>', // Use default testing domain or your verified domain
                to: ['lamusgana@gmail.com'],
                reply_to: email, // Allow direct reply to the user
                subject: `Nuevo mensaje de contacto web de ${name}`,
                html: `
                    <h1>Nuevo Mensaje de la Web</h1>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Mensaje:</strong></p>
                    <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #ccc;">
                        ${message}
                    </blockquote>
                    <p><small>Enviado desde el formulario de contacto de la web.</small></p>
                `,
            });

            if (error) {
                console.error("Resend Email Error:", error);
                // We might choose to return an error to user or just log it
                // For now, let's treat it as a server error but don't crash the UI if possible,
                // or return a specific error message.
                return { error: { server: ["Error sending email. Please try again later."] } };
            }
        }
    } catch (e) {
        console.error("Email processing error:", e);
        return { error: { server: ["Unexpected error sending email."] } };
    }

    // 3 Mock Audit Log (keep for records)
    console.log(`[AUDIT LOG] Action: Contact Form Submission, User: Guest, IP: [REDACTED], Timestamp: ${new Date().toISOString()}`);

    // 4. Return success
    return {
        success: true,
        message: "Message sent successfully!",
    };
}
