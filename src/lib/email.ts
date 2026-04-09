export const sendTrackingEmail = async (email: string, trackingNumber: string, status: string, name: string) => {
    // This is a professional mock for the email alert system.
    // In a production environment, this would integrate with Resend, SendGrid, or AWS SES.
    console.log(`[Email Dispatch] To: ${email}, Subject: Shipment ${trackingNumber} Update`);
    
    const emailTemplate = `
        -------------------------------------------
        TRACKFLOW GLOBAL LOGISTICS ALERT
        -------------------------------------------
        Hello ${name},
        
        Your shipment #${trackingNumber} status has changed to: ${status.toUpperCase()}.
        
        You can track the live progress at:
        https://nexustrack.com/tracking?id=${trackingNumber}
        
        Thank you for choosing NexusTrack.
        -------------------------------------------
    `;
    
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Log the "sent" email
    console.log(emailTemplate);
    
    return { success: true, messageId: Math.random().toString(36).substring(7) };
};
