import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Left Section: Contact & Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="text-sm">Email: support@myapp.com</p>
            <p className="text-sm">Phone: +1 234 567 890</p>

            <div className="space-x-4">
              <a href="/about" className="text-white hover:text-gray-300">About</a>
              <a href="/terms" className="text-white hover:text-gray-300">Terms</a>
              <a href="/privacy" className="text-white hover:text-gray-300">Privacy</a>
            </div>
          </div>

          {/* Right Section: Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-gray-300">
                <i className="fab fa-facebook-f"></i> {/* You can use FontAwesome icons */}
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-gray-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} My App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
