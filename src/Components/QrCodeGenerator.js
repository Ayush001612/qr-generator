import React, {useState , useRef , useEffect} from 'react'
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

export default function QrCodeGenerator() {
    
        const [text, setText] = useState("");

        const qrCodeRef = useRef(null);

        const downloadQRCode = () => {
            if (qrCodeRef.current) {
              toPng(qrCodeRef.current) // Convert the QR code to PNG
                .then((dataUrl) => {
                  const link = document.createElement("a"); // Create a download link
                  link.href = dataUrl; // Set the link's href to the image data
                  link.download = "qrcode.png"; // Set the default download filename
                  link.click(); // Trigger the download
                })
                .catch((err) => {
                  console.error("Error downloading QR code:", err);
                });
            } else {
              console.log("QR code element not found.");
            }
          };

          useEffect(() => {
            // This ensures that when the text changes, the QR code is rendered before any download attempt
            console.log("QR code is being updated with text:", text);
          }, [text]);
        
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>QR Code Generator</h1>
    <input
      type="text"
      placeholder="Enter text or URL"
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{
        padding: "10px",
        width: "300px",
        fontSize: "16px",
        marginBottom: "20px",
      }}
    />
    <div>
      {text && (
         <div
         ref={qrCodeRef} // Only the QR code is wrapped with this ref
         style={{ display: "inline-block", background: "#fff", padding: "10px", borderRadius: "8px" }}
       >
        <QRCode
          value={text}
          size={200}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
        />
        </div>
      )}
      <br />
      <button onClick={downloadQRCode} style={{ padding: "12px 24px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#4CAF50", // Green background
              color: "white", // White text color
              border: "none", // Remove border
              borderRadius: "8px", // Rounded corners
              transition: "background-color 0.3s ease",}}>
      Download QR Code
    </button>
    <footer style={{ position: "fixed", 
    bottom: "10px",
    left: "10px", 
    backgroundColor: "#f1f1f1", 
    borderRadius: "8px", 
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
    fontSize: "14px", }}>
        Made with ❤️ by Ayush Anand
    </footer>
      
    </div>
      </div>
  )
}
