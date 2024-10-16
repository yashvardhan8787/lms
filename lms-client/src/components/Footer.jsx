import React from 'react';
import { FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <li>
                <a href="#" className="flex items-center hover:underline">
                  <FaYoutube className="mr-2" /> YouTube
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:underline">
                  <FaInstagram className="mr-2" /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:underline">
                  <FaGithub className="mr-2" /> GitHub
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
          <p>Copyright © 2023 ELearning | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
