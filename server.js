import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create email transporter
const createTransporter = () => {
  // You can use different email services like Gmail, SendGrid, etc.
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Join Waitlist endpoint
app.post('/api/join-waitlist', async (req, res) => {
  try {
    const { firstName, lastName, email, company, jobTitle, teamSize, message, timestamp } = req.body;

    const transporter = createTransporter();

    // Email content for the admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'noreply@candexai.com',
      to: 'lovjeet_s@me.iitr.ac.in',
      subject: 'New Waitlist Registration - CandexAI',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🚀 New Waitlist Registration!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2d3748; margin-bottom: 25px; font-size: 24px;">Contact Information</h2>
            
            <div style="display: grid; gap: 15px; margin-bottom: 30px;">
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #4299e1; border-radius: 5px;">
                <strong style="color: #2d3748;">Name:</strong> ${firstName} ${lastName}
              </div>
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #48bb78; border-radius: 5px;">
                <strong style="color: #2d3748;">Email:</strong> ${email}
              </div>
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #ed8936; border-radius: 5px;">
                <strong style="color: #2d3748;">Company:</strong> ${company}
              </div>
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #9f7aea; border-radius: 5px;">
                <strong style="color: #2d3748;">Job Title:</strong> ${jobTitle}
              </div>
              ${teamSize ? `
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #38b2ac; border-radius: 5px;">
                <strong style="color: #2d3748;">Team Size:</strong> ${teamSize}
              </div>
              ` : ''}
            </div>

            ${message ? `
            <div style="margin-bottom: 30px;">
              <h3 style="color: #2d3748; margin-bottom: 15px;">Message:</h3>
              <div style="padding: 20px; background: #edf2f7; border-radius: 8px; font-style: italic; color: #4a5568;">
                "${message}"
              </div>
            </div>
            ` : ''}

            <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
              <p style="color: #718096; font-size: 14px; margin: 0;">
                <strong>Registered at:</strong> ${new Date(timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Confirmation email for the user
    const userMailOptions = {
      from: process.env.EMAIL_USER || 'noreply@candexai.com',
      to: email,
      subject: 'Welcome to CandexAI Waitlist! 🎉',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Welcome to CandexAI! 🚀</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2d3748; margin-bottom: 20px;">Hi ${firstName}! 👋</h2>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Thank you for joining the CandexAI waitlist! You're now part of an exclusive group that will get early access to the future of AI-powered hiring.
            </p>

            <div style="background: #f0fff4; border: 1px solid #9ae6b4; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #2f855a; margin-bottom: 15px;">🎯 What happens next?</h3>
              <ul style="color: #2d3748; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">We'll notify you as soon as CandexAI launches</li>
                <li style="margin-bottom: 8px;">You'll get priority access to our platform</li>
                <li style="margin-bottom: 8px;">Exclusive early-bird pricing and features</li>
                <li>Direct line to our founding team for feedback</li>
              </ul>
            </div>

            <div style="background: #ebf4ff; border: 1px solid #90cdf4; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #2c5282; margin-bottom: 15px;">🔮 What you can expect:</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; color: #2d3748;">
                <div>✅ 95% fraud detection</div>
                <div>⚡ 72-hour processing</div>
                <div>💰 75% cost reduction</div>
                <div>🤖 5 specialized AI agents</div>
              </div>
            </div>

            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              We're working hard to revolutionize technical hiring, and we can't wait to show you what we've built!
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://candexai.com" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; transition: transform 0.3s;">
                Visit Our Website
              </a>
            </div>

            <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #718096; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>The CandexAI Team</strong>
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: 'Successfully joined waitlist!' });
  } catch (error) {
    console.error('Error processing waitlist registration:', error);
    res.status(500).json({ error: 'Failed to process registration' });
  }
});

// Book Demo endpoint
app.post('/api/book-demo', async (req, res) => {
  try {
    const { 
      firstName, lastName, email, company, jobTitle, teamSize, 
      phone, preferredDate, preferredTime, message, timestamp 
    } = req.body;

    const transporter = createTransporter();

    // Email content for the admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER || 'noreply@candexai.com',
      to: 'lovjeet_s@me.iitr.ac.in',
      subject: 'New Demo Request - CandexAI',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">📅 New Demo Request!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2d3748; margin-bottom: 25px; font-size: 24px;">Contact Information</h2>
            
            <div style="display: grid; gap: 15px; margin-bottom: 30px;">
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #4299e1; border-radius: 5px;">
                <strong style="color: #2d3748;">Name:</strong> ${firstName} ${lastName}
              </div>
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #48bb78; border-radius: 5px;">
                <strong style="color: #2d3748;">Email:</strong> ${email}
              </div>
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #ed8936; border-radius: 5px;">
                <strong style="color: #2d3748;">Phone:</strong> ${phone}
              </div>
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #9f7aea; border-radius: 5px;">
                <strong style="color: #2d3748;">Company:</strong> ${company}
              </div>
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #38b2ac; border-radius: 5px;">
                <strong style="color: #2d3748;">Job Title:</strong> ${jobTitle}
              </div>
              <div style="padding: 15px; background: #f7fafc; border-left: 4px solid #e53e3e; border-radius: 5px;">
                <strong style="color: #2d3748;">Team Size:</strong> ${teamSize}
              </div>
            </div>

            ${(preferredDate || preferredTime) ? `
            <div style="background: #fff5f5; border: 1px solid #feb2b2; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #c53030; margin-bottom: 15px;">🕒 Scheduling Preferences</h3>
              ${preferredDate ? `<p style="color: #2d3748; margin: 5px 0;"><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
              ${preferredTime ? `<p style="color: #2d3748; margin: 5px 0;"><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
            </div>
            ` : ''}

            ${message ? `
            <div style="margin-bottom: 30px;">
              <h3 style="color: #2d3748; margin-bottom: 15px;">Message:</h3>
              <div style="padding: 20px; background: #edf2f7; border-radius: 8px; font-style: italic; color: #4a5568;">
                "${message}"
              </div>
            </div>
            ` : ''}

            <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 30px;">
              <p style="color: #718096; font-size: 14px; margin: 0;">
                <strong>Requested at:</strong> ${new Date(timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Confirmation email for the user
    const userMailOptions = {
      from: process.env.EMAIL_USER || 'noreply@candexai.com',
      to: email,
      subject: 'Demo Request Received - CandexAI Team Will Contact You Soon! 📞',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Demo Request Received! 🎉</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #2d3748; margin-bottom: 20px;">Hi ${firstName}! 👋</h2>
            
            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Thank you for requesting a demo of CandexAI! We're excited to show you how our AI-powered hiring platform can transform your recruitment process.
            </p>

            <div style="background: #e6fffa; border: 1px solid #81e6d9; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #234e52; margin-bottom: 15px;">📞 What happens next?</h3>
              <ul style="color: #2d3748; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>Within 24 hours:</strong> Our team will contact you to schedule your demo</li>
                <li style="margin-bottom: 8px;"><strong>30-45 minute session:</strong> Personalized walkthrough of CandexAI</li>
                <li style="margin-bottom: 8px;"><strong>Q&A time:</strong> All your questions answered by our experts</li>
                <li><strong>Custom setup:</strong> We'll discuss how CandexAI fits your specific needs</li>
              </ul>
            </div>

            <div style="background: #f7fafc; border: 1px solid #cbd5e0; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #2d3748; margin-bottom: 15px;">🚀 What you'll see in the demo:</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; color: #2d3748;">
                <div style="display: flex; align-items: center;"><span style="margin-right: 8px;">🤖</span> 5 AI Agents in action</div>
                <div style="display: flex; align-items: center;"><span style="margin-right: 8px;">⚡</span> 72-hour processing demo</div>
                <div style="display: flex; align-items: center;"><span style="margin-right: 8px;">🔍</span> Fraud detection capabilities</div>
                <div style="display: flex; align-items: center;"><span style="margin-right: 8px;">📊</span> Real-time analytics dashboard</div>
                <div style="display: flex; align-items: center;"><span style="margin-right: 8px;">🎯</span> Precision candidate matching</div>
                <div style="display: flex; align-items: center;"><span style="margin-right: 8px;">💬</span> AI chatbot interactions</div>
              </div>
            </div>

            ${(preferredDate || preferredTime) ? `
            <div style="background: #fff5f5; border: 1px solid #fed7d7; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #c53030; margin-bottom: 15px;">📅 Your Preferences:</h3>
              ${preferredDate ? `<p style="color: #2d3748; margin: 5px 0;">Preferred Date: <strong>${preferredDate}</strong></p>` : ''}
              ${preferredTime ? `<p style="color: #2d3748; margin: 5px 0;">Preferred Time: <strong>${preferredTime}</strong></p>` : ''}
              <p style="color: #718096; font-size: 14px; margin-top: 10px;">We'll do our best to accommodate your preferred timing!</p>
            </div>
            ` : ''}

            <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              If you have any questions before our call, feel free to reply to this email. We're here to help!
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://candexai.com" style="background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
                Visit Our Website
              </a>
            </div>

            <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #718096; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>The CandexAI Demo Team</strong>
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: 'Demo request submitted successfully!' });
  } catch (error) {
    console.error('Error processing demo request:', error);
    res.status(500).json({ error: 'Failed to process demo request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
