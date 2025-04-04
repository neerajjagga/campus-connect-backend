import { transporter } from './../lib/nodemailer.js';
import subscribe from '../models/subscribe.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const sendEventEmail = async (event) => {
    const subscribedEmails = await subscribe.find({});

    if (subscribedEmails.length === 0) return;

    const emailList = subscribedEmails.map((obj) => obj.email);

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: emailList,
        subject: `NewNew Event: ${event.title}`,
        html: `
            <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Event Created</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }
              .event-image {
                  width: 100%;
                  max-height: 250px;
                  object-fit: cover;
                  border-radius: 10px 10px 0 0;
              }
              h1 {
                  color: #333;
                  margin: 20px 0;
              }
              p {
                  color: #666;
                  font-size: 16px;
                  line-height: 1.5;
              }
              .event-details {
                  background: #f9f9f9;
                  padding: 15px;
                  border-radius: 5px;
                  margin: 20px 0;
                  text-align: left;
              }
              .event-details strong {
                  color: #333;
              }
              .btn {
                  display: inline-block;
                  padding: 12px 20px;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  font-size: 16px;
                  border-radius: 5px;
                  margin-top: 20px;
              }
              .btn:hover {
                  background-color: #0056b3;
              }
              .footer {
                  margin-top: 20px;
                  font-size: 14px;
                  color: #999;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <img class="event-image" src="${event.eventImageUrl || 'https://via.placeholder.com/600x250'}" alt="Event Image">
              <h1>${event.title}</h1>
              <p>${event?.description || "Join us for this amazing event!"}</p>
              <div class="event-details">
                  <p><strong>📍 Location:</strong> ${event.location}</p>
                  <p><strong>📅 Date:</strong> ${event.date}</p>
                  <p><strong>🗂 Category:</strong> ${event.category}</p>
              </div>
              <a href="https://yourwebsite.com/events/${event.titleSlug}" class="btn">View Event Details</a>
              <p class="footer">If you no longer want to receive event updates, you can <a href="#">unsubscribe here</a>.</p>
          </div>
      </body>
      </html>`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("Emails sent successfully!");
    } catch (error) {
        console.error("Error sending emails:", error);
    }
}

export const sendSubscribedEmail = async (email) => {

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: `Subscribed to CGC Events`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Subscription Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .logo {
                    width: 100%;
                    max-height: 250px;
                    border-radius: 10px 10px 0 0;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                    font-size: 16px;
                    line-height: 1.5;
                }
                .btn {
                    display: inline-block;
                    padding: 12px 20px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 16px;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                .btn:hover {
                    background-color: #0056b3;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img class="logo" src="https://imgs.search.brave.com/SG18kkNNob5naNh-etLRyoQrFp5Rd-wZopE8YrWmLwI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXRteXVuaS5j/b20vYXp1cmUvY29s/bGVnZS1pbWFnZS9i/aWcvY2djLWNvbGxl/Z2Utb2YtZW5naW5l/ZXJpbmctY2djLW1v/aGFsaS5qcGc" alt="Subscription Banner">
                <h1>Thank You for Subscribing!</h1>
                <p>Hello,</p>
                <p>You're now subscribed to receive the latest news and updates about our events. Stay tuned!</p>
                <a href="https://your-website.com" class="btn">Visit Our Website</a>
                <p class="footer">If you didn’t subscribe, please ignore this email.</p>
            </div>
        </body>
        </html>
      `,
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("Emails sent successfully!");
    } catch (error) {
        console.error("Error sending emails:", error);
    }
}