const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint — project metadata
app.get('/api/project', (req, res) => {
  res.json({
    name: 'SPRINT',
    fullName: 'Smart Precision Remote Irrigation Network Technology',
    subtitle: 'A Remote and Timer-Controlled Smart Spraying System for Precision Agriculture',
    university: 'Delhi Technological University',
    department: 'Electronics and Communication Engineering',
    year: 2026,
    team: [
      { name: 'Anurag Kumar',    rollNo: '2K22/EC/46' },
      { name: 'Chirag Sikriwal', rollNo: '2K22/EC/75' },
      { name: 'Devayush Devandra', rollNo: '2K22/EC/88' },
    ],
    supervisor: 'Dr. Yashna Sharma',
    technologies: ['ESP-01 (ESP8266)', 'Firebase RTDB', 'Android Studio', 'Arduino IDE', 'Node.js', 'Express'],
  });
});

// Catch-all — serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌿 SPRINT server running on http://localhost:${PORT}`);
});
