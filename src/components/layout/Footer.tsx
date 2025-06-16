import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-12 border-t border-white/10">
      <div className="max-w-screen-lg mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        
        {/* Contact Info */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <PhoneIcon fontSize="small" />
            <span>+9545534104</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <EmailIcon fontSize="small" />
            <span>adityakate300@gmail.com</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex gap-4">
            <a
              href="https://github.com/KateAditya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 flex items-center gap-1"
            >
              <GitHubIcon fontSize="small" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aditya-kate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 flex items-center gap-1"
            >
              <LinkedInIcon fontSize="small" /> LinkedIn
            </a>
          </div>
          <div className="opacity-60">Portfolio: Coming Soon</div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-white opacity-70 mt-6 text-xs">
        © 2025 Made by <span className="font-semibold">AK_2003</span> ❤️
      </p>
    </footer>
  )
}
