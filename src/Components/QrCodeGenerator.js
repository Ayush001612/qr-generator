import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

export default function QrCodeGenerator() {
  const [text, setText] = useState('');
  const [selectedType, setSelectedType] = useState('text'); // QR code type
  const [name, setName] = useState(''); // Name for vCard
  const [phone, setPhone] = useState(''); // Phone for vCard
  const [email, setEmail] = useState(''); // Email for vCard
  const [qrCodeData, setQRCodeData] = useState(''); // Data for QR code
  
  const qrCodeRef = useRef(null);

  // Generate vCard string
  const generateVCard = (name, phone, email) => {
    if (!name || !phone || !email) return '';
    return `BEGIN:VCARD\nVERSION:3.0\nN:${name.split(' ').reverse().join(';')}\nFN:${name}\nTEL;TYPE=CELL:${phone}\nEMAIL:${email}\nEND:VCARD`;
  };

  // Handle QR code generation
  const handleGenerateQRCode = () => {
    if (selectedType === 'vCard') {
      const vCardData = generateVCard(name, phone, email);
      if (vCardData) {
        setQRCodeData(vCardData);
      } else {
        alert('Please fill in all fields for vCard.');
      }
    } else if (selectedType === 'text') {
      if (text.trim()) {
        setQRCodeData(text.trim());
      } else {
        alert('Please enter some text or a URL.');
      }
    }
  };

  // Handle QR code download
  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      toPng(qrCodeRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'qrcode.png';
          link.click();
        })
        .catch((err) => console.error('Error downloading QR code:', err));
    }
  };

  useEffect(() => {
    console.log('QR Code Data Updated:', qrCodeData);
  }, [qrCodeData]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>QR Code Generator</h1>
      {/* Dropdown to select QR code type */}
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      >
        <option value='text'>Text</option>
        <option value='vCard'>Contact Info (vCard)</option>
      </select>

      {/* Input fields for vCard */}
      {selectedType === 'vCard' && (
        <div>
          <input
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', width: '300px', fontSize: '16px', marginBottom: '10px' }}
          />
          <br />
          <input
            type='tel'
            placeholder='Enter Phone Number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: '10px', width: '300px', fontSize: '16px', marginBottom: '10px' }}
          />
          <br />
          <input
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', width: '300px', fontSize: '16px', marginBottom: '20px' }}
          />
        </div>
      )}

      {/* Input field for text/URL */}
      {selectedType === 'text' && (
        <input
          type='text'
          placeholder='Enter text or URL'
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: '10px', width: '300px', fontSize: '16px', marginBottom: '20px' }}
        />
      )}

      {/* QR Code Display */}
      <div>
        {qrCodeData && (
          <div
            ref={qrCodeRef}
            style={{ display: 'inline-block', background: '#fff', padding: '10px', borderRadius: '8px' }}
          >
            <QRCode
              value={qrCodeData}
              size={200}
              bgColor='#ffffff'
              fgColor='#000000'
              level='H'
            />
          </div>
        )}
        <br />
        <button
          onClick={handleGenerateQRCode}
          style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', marginRight: '10px' }}
        >
          Generate QR Code
        </button>
        <button
          onClick={downloadQRCode}
          style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px' }}
        >
          Download QR Code
        </button>
      </div>

      <footer
        style={{ position: 'fixed', bottom: '10px', left: '10px', backgroundColor: '#f1f1f1', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', fontSize: '14px' }}
      >
        Made with ❤️ by Ayush Anand
      </footer>
    </div>
  );
}
