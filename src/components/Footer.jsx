import React, { useState } from "react"; 
import "../stylesheet/Footer.css";

const Footer = () => {
 

  return (
    <footer>
        <div className="footer-container">
        <svg
        xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 176" fill="none" position="sticky">
            <path className="path" d="M0 8.66337L34.4 22.1857C68.8 35.8277 137.6 62.8724 206.08 66.1034C274.72 69.3344 342.88 48.5124 411.52 29.8444C480 11.0567 548.8 -5.69663 617.28 3.27837C685.92 12.2534 754.08 46.9567 822.72 51.7434C891.2 56.53 960 31.4 1028.48 23.3823C1097.12 15.4844 1165.28 24.579 1233.92 34.631C1302.4 44.5634 1371.2 55.3334 1405.6 60.7184L1440 66.1034V176.197H1405.6C1371.2 176.197 1302.4 176.197 1233.92 176.197C1165.28 176.197 1097.12 176.197 1028.48 176.197C960 176.197 891.2 176.197 822.72 176.197C754.08 176.197 685.92 176.197 617.28 176.197C548.8 176.197 480 176.197 411.52 176.197C342.88 176.197 274.72 176.197 206.08 176.197C137.6 176.197 68.8 176.197 34.4 176.197H0V8.66337Z" fill="#0066FF" fillOpacity="0.78"/>
            </svg>
            {/* <div className="footer-text">
              <ul>
                <li>Waterstreet h20</li>
                <li>41624 Wave</li>
                <li>Atlantis</li>
              </ul>
            </div> */}
            
        </div>
    </footer>
  );
};

export default Footer;