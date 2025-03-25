import dummyQR from "../assets/dummyQrcode.png";
import logoInvert from "../assets/tip-app-logo-invert.png";
import scan from "../assets/scan.png";
import waiter from "../assets/waiter.png";
import pay from "../assets/pay.png";
import arrow from "../assets/arrow.png";
import html2canvas from "html2canvas"


export const handleCreateAndDownloadQR = (data) => {
    
    // Create a temporary div to render our QR card
    const tempDiv = document.createElement("div");
    tempDiv.id = "qr-card"; 
    tempDiv.style = 'width:fit-content; padding:2px;'
  
    // Set the content of the div to match the design
    tempDiv.innerHTML = `
      <div style="background-color: black; width: 250px; height: 450px; padding: 8px; position: relative; font-family: Montserrat, sans-serif;">
        <div style="margin:auto; width:fit-content; margin-bottom: 5px;">
            <img src=${logoInvert} alt="logo" style="height: 50px;">
        </div>
        <div style="background-color: white; height: 375px; padding: 5px; border-radius: 15px 15px 5px 5px;">
            <p style="text-align: center; font-weight: 500; width: 150px;margin:10px auto; font-weight: 600;">${data?.restaurant}</p>
            <div style="text-align: center;">
                <img src=${data?.qrCode} alt="qr-code" style="height: 200px; display:inline-block; margin:auto;">
            </div>
            <p style="font-size: small; font-weight: 500; text-align: center; margin: 10px 0px;">Scan & Pay Tip to Waiter</p>
            <div style="padding-top: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-around;">
                <div style="text-align: center;">
                    <img src=${scan} alt="scan">
                </div>
                <div style="text-align: center;">
                    <img src=${arrow} alt="arrow">
                </div>
                <div style="text-align: center;">
                    <img src=${waiter} alt="waiter">
                </div>
                <div style="text-align: center;">
                    <img src=${arrow} alt="arrow">
                </div>
                <div style="text-align: center;">
                    <img src=${pay} alt="pay">
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0px 20px;">
                <div style="text-align: center;">
                    <p style="font-size: x-small;">Scan <br> QR</p>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: x-small;">Select <br> Waiter</p>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: x-small;">Pay <br> Tip</p>
                </div>
            </div>
        </div>
        </div>
    </div>
    `;
  
    document.body.appendChild(tempDiv);
  
    // Use html2canvas to convert the div to an image
    html2canvas(tempDiv).then((canvas) => { // Use tempDiv directly
      // Create a download link
      const link = document.createElement("a");
      link.download = "tipzo-qr-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
  
      // Clean up
      document.body.removeChild(tempDiv);
    });
};