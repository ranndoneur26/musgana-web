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

    // 2. Mock Audit Log entry
    // En un entorno real, aquí registraríamos en una base de datos segura (HIPAA compliant)
    console.log(`[AUDIT LOG] Action: Contact Form Submission, User: Guest, IP: [REDACTED], Timestamp: ${new Date().toISOString()}`);

    // 3. Simulate process delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 4. Return success
    return {
        success: true,
        message: "Message sent successfully!",
    };
}
