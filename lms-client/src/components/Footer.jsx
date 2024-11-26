import React from 'react';
import { FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#5A4BA1] to-[#704cb2] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline" aria-label="Our Story">Our Story</a></li>
              <li><a href="#" className="hover:underline" aria-label="Privacy Policy">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline" aria-label="FAQ">FAQ</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline" aria-label="Courses">Courses</a></li>
              <li><a href="#" className="hover:underline" aria-label="My Account">My Account</a></li>
              <li><a href="#" className="hover:underline" aria-label="Course Dashboard">Course Dashboard</a></li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center hover:underline" aria-label="YouTube Channel" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="mr-2 transition-transform transform hover:scale-110" /> YouTube
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:underline" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="mr-2 transition-transform transform hover:scale-110" /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:underline" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="mr-2 transition-transform transform hover:scale-110" /> GitHub
                </a>
              </li>
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
        
        <div className="mt-8 text-center text-sm">
          <p className="text-white font-medium">&copy; 2024 ELearning | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
