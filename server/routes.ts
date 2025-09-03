import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail, generateBookingConfirmationEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Test email endpoint
  app.post("/api/test-email", async (req, res) => {
    try {
      const { email } = req.body;
      
      const emailSent = await sendEmail({
        to: [{ email: email || 'jayant.svnit@gmail.com', name: 'Test User' }],
        subject: 'PassionFruit Email Test',
        htmlContent: '<h1>Test from PassionFruit</h1><p>If you receive this, email is working!</p>',
        sender: { email: 'jayant.svnit@gmail.com', name: 'PassionFruit' }
      });

      if (emailSent) {
        res.json({ success: true, message: "Test email sent successfully" });
      } else {
        res.status(500).json({ error: "Failed to send test email" });
      }
    } catch (error) {
      console.error("Test email error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Booking confirmation endpoint
  app.post("/api/bookings/confirm", async (req, res) => {
    try {
      const { booking, product, user } = req.body;
      
      if (!booking || !product || !user) {
        return res.status(400).json({ error: "Missing required data" });
      }

      // Generate email content
      const emailContent = generateBookingConfirmationEmail(booking, product, user);
      
      // Send emails to both the user and the admin emails
      const recipients = [
        { email: user.email, name: user.name || user.email },
        { email: 'shanker87@gmail.com', name: 'Shanker - PassionFruit' }
      ];

      const emailSent = await sendEmail({
        to: recipients,
        subject: `Booking Confirmation - ${product.name} - ${booking.id}`,
        htmlContent: emailContent
      });

      if (emailSent) {
        res.json({ success: true, message: "Booking confirmation sent" });
      } else {
        res.status(500).json({ error: "Failed to send confirmation email" });
      }
    } catch (error) {
      console.error("Booking confirmation error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
