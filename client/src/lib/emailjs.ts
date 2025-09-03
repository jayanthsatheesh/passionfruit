import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_passionfruit';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_booking';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS
export function initEmailJS() {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}

// Email template parameters
interface BookingEmailParams {
  to_email: string;
  to_name: string;
  booking_id: string;
  product_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  emergency_contact: string;
  rental_period: string;
  rental_duration: string;
  total_price: string;
  start_date: string;
  end_date: string;
  booking_status: string;
  [key: string]: string; // Index signature for EmailJS compatibility
}

// Send booking confirmation email
export async function sendBookingConfirmation(
  booking: any,
  product: any,
  user: any
): Promise<boolean> {
  try {
    // Initialize EmailJS if not already done
    initEmailJS();

    // Prepare email parameters for customer
    const customerParams: BookingEmailParams = {
      to_email: user.email,
      to_name: user.name || user.email,
      booking_id: booking.id,
      product_name: product.name,
      customer_name: user.name,
      customer_email: user.email,
      customer_phone: (booking as any).phoneNumber || user.phone || 'Not provided',
      delivery_address: (booking as any).deliveryAddress || user.address || 'Not provided',
      emergency_contact: (booking as any).emergencyContact || 'Not provided',
      rental_period: `${booking.startDate} to ${booking.endDate}`,
      rental_duration: `${booking.duration} ${booking.duration === 1 ? 'day' : 'days'}`,
      total_price: `₹${booking.totalPrice}`,
      start_date: booking.startDate,
      end_date: booking.endDate,
      booking_status: booking.status || 'pending'
    };

    // Send email to customer
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      customerParams
    );

    // Prepare email parameters for admin (shanker87@gmail.com)
    const adminParams: BookingEmailParams = {
      ...customerParams,
      to_email: 'shanker87@gmail.com',
      to_name: 'Shanker - PassionFruit Admin'
    };

    // Send email to admin
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      adminParams
    );

    console.log('Booking confirmation emails sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send booking confirmation emails:', error);
    return false;
  }
}

// Send contact form email
export async function sendContactEmail(
  name: string,
  email: string,
  message: string,
  phone?: string
): Promise<boolean> {
  try {
    initEmailJS();

    const params = {
      to_email: 'shanker87@gmail.com',
      to_name: 'Shanker - PassionFruit',
      from_name: name,
      from_email: email,
      phone_number: phone || 'Not provided',
      message: message,
      subject: 'New Contact Form Submission - PassionFruit'
    };

    const contactTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'template_contact';
    
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      contactTemplateId,
      params
    );

    console.log('Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return false;
  }
}

// Send product request email
export async function sendProductRequestEmail(requestData: any): Promise<boolean> {
  try {
    initEmailJS();

    const params = {
      to_email: 'shanker87@gmail.com',
      to_name: 'Shanker - PassionFruit',
      from_name: requestData.name,
      from_email: requestData.email,
      phone_number: requestData.phone,
      product_name: requestData.productName,
      category: requestData.category,
      description: requestData.description,
      budget: requestData.budget || 'Not specified',
      timeline: requestData.timeline || 'Not specified',
      subject: `Product Request: ${requestData.productName} - PassionFruit`
    };

    const contactTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'template_contact';
    
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      contactTemplateId,
      params
    );

    console.log('Product request email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send product request email:', error);
    return false;
  }
}

// Test email function
export async function sendTestEmail(): Promise<boolean> {
  try {
    initEmailJS();

    const params = {
      to_email: 'shanker87@gmail.com',
      to_name: 'Shanker - PassionFruit',
      from_name: 'PassionFruit System',
      from_email: 'test@passionfruit.com',
      message: 'This is a test email to verify EmailJS integration is working correctly.',
      subject: 'EmailJS Test - PassionFruit'
    };

    const contactTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'template_contact';
    
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      contactTemplateId,
      params
    );

    console.log('Test email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send test email:', error);
    return false;
  }
}