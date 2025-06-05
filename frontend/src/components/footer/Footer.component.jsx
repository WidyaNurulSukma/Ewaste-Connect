import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo atau Nama Brand */}
        <div className="mb-4 md:mb-0 flex items-center space-x-2">
          {/* Ganti dengan <img src="..." /> jika ada logo */}
          <span className="text-xl  tracking-tight">
            eWaste Connect
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center md:text-right">
          © 2025 eWaste Connect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
