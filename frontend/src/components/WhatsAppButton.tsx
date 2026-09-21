import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  // Target Phone: +91 7603881020
  const whatsappUrl = 'https://wa.me/917603881020';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#111827] border border-white/10 text-[#3b82f6] rounded-full shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] hover:scale-105 active:scale-95 group focus:outline-none"
      aria-label="Contact OSAAC on WhatsApp"
      title="Contact WhatsApp"
    >
      <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-12" />
    </a>
  );
}
