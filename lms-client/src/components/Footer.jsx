import React from "react";
import { FaYoutube, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = ({ socialLinks }) => {
  return (
    <footer className="bg-gradient-to-r from-[#5A4BA1] to-[#704cb2] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Courses</a></li>
              <li><a href="#" className="hover:underline">My Account</a></li>
              <li><a href="#" className="hover:underline">Course Dashboard</a></li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <ul className="space-y-2">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="flex items-center hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <span className="mr-2 transition-transform transform hover:scale-110">{link.icon}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li>Call Us: 1-885-665-2022</li>
              <li>Address: 7011 Vermont Ave, Los Angeles, CA 90044</li>
              <li>Email: hello@elearning.com</li>
            </ul>
          </div>
        </div>
        
        {/* Call-to-Action */}
        <div className="mt-8 text-center">
          <p className="text-lg font-medium">
            Join 10,000+ learners who trust ELearning!
          </p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Start Learning Now
          </button>
        </div>
        
        <div className="mt-8 text-center text-sm">
          <p className="text-white font-medium">&copy; 2024 ELearning | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

// Default social links
Footer.defaultProps = {
  socialLinks: [
    { label: "YouTube", url: "https://youtube.com", icon: <FaYoutube /> },
    { label: "Instagram", url: "https://instagram.com", icon: <FaInstagram /> },
    { label: "GitHub", url: "https://github.com", icon: <FaGithub /> },
  ],
};

export default Footer;
