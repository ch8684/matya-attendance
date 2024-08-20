const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // החלף זאת בכתובת המייל שלך
    pass: 'your-password' // החלף זאת בסיסמה שלך
  }
});

app.post('/submit-report', (req, res) => {
  const { fullName, idNumber, position, absences, overtimeHours, additionalNotes } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com', // החלף זאת בכתובת המייל שלך
    to: 'matyabbworkers@gmail.com',
    subject: `דיווח חודשי - ${fullName}`,
    html: `
      <div dir="rtl">
        <h2>דיווח חודשי</h2>
        <p><strong>שם העובד/ת:</strong> ${fullName}</p>
        <p><strong>ת"ז:</strong> ${idNumber}</p>
        <p><strong>תפקיד:</strong> ${position}</p>
        <p><strong>היעדרויות:</strong> ${absences}</p>
        <p><strong>שעות נוספות:</strong> ${overtimeHours}</p>
        <p><strong>הערות נוספות:</strong> ${additionalNotes}</p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('אירעה שגיאה בשליחת הדיווח');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('הדיווח נשלח בהצלחה');
    }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
