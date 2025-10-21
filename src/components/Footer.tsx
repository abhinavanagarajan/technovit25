import { Instagram, Youtube, Linkedin, Mail } from "lucide-react";

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
  </svg>
);

const socialLinks = [
  {
    href: "https://www.instagram.com/technovit_25/",
    label: "Instagram",
    icon: <Instagram size={20} />,
  },
  {
    href: "https://www.youtube.com/@VITChennaic",
    label: "YouTube",
    icon: <Youtube size={20} />,
  },
  {
    href: "https://www.linkedin.com/company/technovit-chennai/",
    label: "LinkedIn",
    icon: <Linkedin size={20} />,
  },
  {
    href: "https://whatsapp.com/channel/0029VbBC41Z59PwTuuvQUU0B",
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
  },
];

export const Footer = () => {
  return (
    <footer className="bg-black border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#70E081]">
              <span className="text-white">techno</span>VIT&apos;25
            </h3>
            <p className="text-muted text-sm">High on Tech</p>
            <p className="text-muted text-sm">
              India&apos;s Biggest Technical Fest
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-subheading text-white">Contact</h4>
            <div className="space-y-2 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a
                  href="mailto:technovit@vit.ac.in"
                  className="hover:text-[#70E081] transition-colors"
                >
                  technovit@vit.ac.in
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-subheading text-white">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 border-2 border-border hover:border-[#70E081] flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted">
          <p>
            &copy; 2025 technoVIT - Vellore Institute of Technology, Chennai.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
