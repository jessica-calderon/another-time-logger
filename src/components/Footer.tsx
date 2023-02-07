import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto">
        <p className="text-center">
          Created by
          <a
            href="https://github.com/jessica-calderon"
            target="_blank"
            className="hover:text-gray-500"
          >
            {" "}
            Jessica Calderon
          </a>
        </p>
        <p className="text-center">Copyright © 2023. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
