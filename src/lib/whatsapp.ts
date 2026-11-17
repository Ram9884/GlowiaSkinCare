const WHATSAPP_PHONE_NUMBER = '919876543210'; // Configurable placeholder number

export const openWhatsApp = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const getProductEnquiryMessage = (productName: string) => {
  return `Hello Glowia, I would like to enquire about the product: "${productName}". Please share more details and availability.`;
};

export const getConsultationEnquiryMessage = (name: string, type: string, mode: string, date: string, time: string) => {
  return `Hello Glowia, I would like to request a consultation.\n\nName: ${name}\nConsultation Type: ${type}\nMode: ${mode}\nPreferred Date: ${date}\nPreferred Time: ${time}`;
};
