import React from "react";
import qrCode from '../assets/qrCode.png'; 

const DonationPage = () => {
  return (
    <main className="flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Support Our Alumni Fund</h1>
      <p className="mb-6 text-center text-lg max-w-xl">
        You can contribute by scanning the QR code below using any UPI app.
        Your support means a lot!
      </p>
      <img
        src={qrCode}
        alt="Donate via UPI QR Code"
        className="w-64 h-64 border shadow-lg rounded"
      />
    </main>
  );
};

export default DonationPage;


