import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    // Validate input
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Nueva Consulta de Contratación - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
          <h2 style="color: #ff0000; border-bottom: 2px solid #ff0000; padding-bottom: 10px;">
            Nueva Consulta de Contratación
          </h2>
          
          <div style="margin: 30px 0;">
            <p style="margin: 15px 0;">
              <strong style="color: #ff0000;">Nombre:</strong><br/>
              <span style="font-size: 16px;">${name}</span>
            </p>
            
            <p style="margin: 15px 0;">
              <strong style="color: #ff0000;">Teléfono:</strong><br/>
              <span style="font-size: 16px;">${phone}</span>
            </p>
            
            <p style="margin: 15px 0;">
              <strong style="color: #ff0000;">Mensaje:</strong><br/>
              <span style="font-size: 16px; white-space: pre-wrap;">${message}</span>
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            Este mensaje fue enviado desde el formulario de contacto de Pasion Especial
          </p>
        </div>
      `,
      text: `
        Nueva Consulta de Contratación
        
        Nombre: ${name}
        Teléfono: ${phone}
        Mensaje: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

