const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    // Return early if no email credentials are provided in .env
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Skipping email send: EMAIL_USER or EMAIL_PASS not defined in .env');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"InvestAI" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Congratulations! Welcome to the Future of Investing with InvestAI 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #4f46e5;">Welcome to InvestAI, ${userName}!</h2>
          <p>Congratulations on successfully joining <strong>InvestAI</strong>! You have just unlocked access to institutional-grade financial research powered by advanced artificial intelligence.</p>
          
          <h3 style="color: #333; margin-top: 30px;">How to Run & Use the Platform:</h3>
          <ol style="line-height: 1.6;">
            <li>Log in to your dashboard using the email and password you just created.</li>
            <li>Accept the Legal Disclaimer to enter the workspace.</li>
            <li>Head over to the <strong>Market Trends</strong> tab to see real-time updates and IPOs.</li>
            <li>Use the <strong>AI Analysis</strong> tool to search for specific companies and get instant AI verdicts.</li>
          </ol>

          <h3 style="color: #333; margin-top: 30px;">Important Terms:</h3>
          <p style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #f59e0b; font-size: 0.95em;">
            Please ensure you read our Terms and Conditions and our Legal Disclaimer. InvestAI provides algorithmic data analysis, but it does not constitute binding financial advice. Always consult with a certified financial planner.
          </p>

          <p style="margin-top: 40px;">Welcome aboard,<br><em>The InvestAI Team</em></p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${userEmail}: ${info.messageId}`);
  } catch (error) {
    console.error(`Failed to send welcome email to ${userEmail}:`, error.message);
  }
};

module.exports = sendWelcomeEmail;
