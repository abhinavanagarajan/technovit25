import { Instagram, Youtube, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-heading text-[#00ff00]">
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
                  href="mailto:convenor.technoVIT@vit.ac.in"
                  className="hover:text-[#00ff00] transition-colors"
                >
                  technovit@vit.ac.in
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-subheading text-white">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/technovit_25/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-border hover:border-[#00ff00] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@VITChennaic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-border hover:border-[#00ff00] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/technovit-chennai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-border hover:border-[#00ff00] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
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
