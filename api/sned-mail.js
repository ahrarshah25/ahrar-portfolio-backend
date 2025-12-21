import nodemailer from "nodemailer";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: subject || "New Contact Form Message",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    await transporter.sendMail({
  from: process.env.EMAIL,
  to: email,
  subject: "📧 Message Received - Ahrar Shah Portfolio | Thank You",
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        :root {
            --primary: #ff5e00;
            --primary-light: #ff8c42;
            --dark: #0a0a0a;
            --darker: #000000;
            --card-bg: #1a1a1a;
            --text: #ffffff;
            --text-secondary: #b0b0b0;
            --text-muted: #888888;
            --border: #2a2a2a;
            --border-light: #3a3a3a;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        body {
            background-color: var(--darker);
            color: var(--text);
            line-height: 1.7;
            padding: 20px;
        }
        
        .email-wrapper {
            max-width: 640px;
            margin: 0 auto;
            background: var(--dark);
            border-radius: 0;
            border: 1px solid var(--border);
        }
        
        .email-header {
            background: var(--darker);
            padding: 40px 30px 30px;
            text-align: center;
            border-bottom: 2px solid var(--primary);
            position: relative;
        }
        
        .header-accent {
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, 
                var(--primary) 0%, 
                var(--primary-light) 50%, 
                var(--primary) 100%);
        }
        
        .logo {
            font-size: 2.8rem;
            font-weight: 900;
            color: var(--text);
            letter-spacing: -1px;
            margin-bottom: 15px;
        }
        
        .logo span {
            color: var(--primary);
            position: relative;
        }
        
        .logo-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            background: var(--primary);
            border-radius: 50%;
            margin-left: 2px;
            vertical-align: super;
            animation: subtlePulse 3s infinite;
        }
        
        @keyframes subtlePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
        }
        
        .header-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 8px;
            letter-spacing: 1px;
        }
        
        .header-subtitle {
            font-size: 0.95rem;
            color: var(--text-secondary);
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        
        .email-content {
            padding: 40px 30px;
        }
        
        .greeting-section {
            margin-bottom: 35px;
        }
        
        .greeting {
            font-size: 1.4rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 10px;
        }
        
        .greeting-name {
            color: var(--primary);
            font-weight: 700;
        }
        
        .intro-text {
            color: var(--text-secondary);
            font-size: 1.05rem;
            line-height: 1.8;
        }
        
        .confirmation-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 0;
            padding: 30px;
            margin: 30px 0;
            position: relative;
        }
        
        .confirmation-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border);
        }
        
        .confirmation-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--darker);
            font-size: 1.3rem;
            font-weight: bold;
        }
        
        .confirmation-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--text);
        }
        
        .confirmation-subtitle {
            font-size: 0.9rem;
            color: var(--text-muted);
            margin-top: 3px;
        }
        
        .details-grid {
            display: grid;
            gap: 20px;
        }
        
        .detail-row {
            display: flex;
            gap: 20px;
            padding: 18px 0;
            border-bottom: 1px solid var(--border-light);
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            min-width: 120px;
            color: var(--text-secondary);
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        
        .detail-value {
            flex: 1;
            color: var(--text);
            font-weight: 500;
            font-size: 1rem;
        }
        
        .message-container {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid var(--border);
        }
        
        .message-label {
            color: var(--text-secondary);
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .message-label::before {
            content: '💬';
            font-size: 1.1rem;
        }
        
        .message-content {
            background: var(--darker);
            border: 1px solid var(--border);
            padding: 22px;
            color: var(--text);
            font-size: 1.05rem;
            line-height: 1.8;
            font-style: normal;
            border-left: 3px solid var(--primary);
        }
        
        .process-section {
            margin: 40px 0 30px;
        }
        
        .section-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .section-title::before {
            content: '⏳';
            font-size: 1.3rem;
        }
        
        .timeline {
            position: relative;
            padding-left: 30px;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            left: 10px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, 
                var(--primary) 0%, 
                transparent 100%);
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 28px;
        }
        
        .timeline-item:last-child {
            margin-bottom: 0;
        }
        
        .timeline-marker {
            position: absolute;
            left: -30px;
            top: 2px;
            width: 20px;
            height: 20px;
            background: var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--darker);
            font-size: 0.7rem;
            font-weight: bold;
        }
        
        .timeline-content h4 {
            color: var(--text);
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .timeline-content p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.6;
        }
        
        .contact-cta {
            background: linear-gradient(135deg, 
                rgba(255, 94, 0, 0.05) 0%, 
                rgba(255, 140, 66, 0.02) 100%);
            border: 1px solid var(--border);
            padding: 30px;
            text-align: center;
            margin: 35px 0;
        }
        
        .cta-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 15px;
        }
        
        .cta-subtitle {
            color: var(--text-secondary);
            font-size: 0.95rem;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            color: var(--darker);
            padding: 14px 32px;
            border-radius: 0;
            text-decoration: none;
            font-weight: 700;
            font-size: 1rem;
            letter-spacing: 0.5px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 94, 0, 0.3);
        }
        
        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.2), 
                transparent);
            transition: left 0.6s;
        }
        
        .cta-button:hover::before {
            left: 100%;
        }
        
        .email-footer {
            background: var(--darker);
            padding: 40px 30px;
            border-top: 1px solid var(--border);
        }
        
        .footer-logo {
            font-size: 2rem;
            font-weight: 900;
            color: var(--text);
            text-align: center;
            margin-bottom: 25px;
        }
        
        .footer-logo span {
            color: var(--primary);
        }
        
        .footer-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text);
            text-align: center;
            margin-bottom: 5px;
        }
        
        .footer-subtitle {
            color: var(--text-muted);
            text-align: center;
            font-size: 0.9rem;
            margin-bottom: 30px;
        }
        
        .social-grid {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 30px 0;
        }
        
        .social-item {
            width: 42px;
            height: 42px;
            background: var(--card-bg);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            text-decoration: none;
            border: 1px solid var(--border);
            transition: all 0.3s ease;
        }
        
        .social-item:hover {
            background: var(--primary);
            color: var(--darker);
            transform: translateY(-3px);
            border-color: var(--primary);
        }
        
        .footer-meta {
            text-align: center;
            color: var(--text-muted);
            font-size: 0.85rem;
            line-height: 1.6;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid var(--border);
        }
        
        .footer-meta a {
            color: var(--primary-light);
            text-decoration: none;
        }
        
        @media (max-width: 640px) {
            body {
                padding: 10px;
            }
            
            .email-header {
                padding: 30px 20px;
            }
            
            .email-content {
                padding: 30px 20px;
            }
            
            .logo {
                font-size: 2.2rem;
            }
            
            .header-title {
                font-size: 1.3rem;
            }
            
            .confirmation-card {
                padding: 25px 20px;
            }
            
            .detail-row {
                flex-direction: column;
                gap: 8px;
                padding: 15px 0;
            }
            
            .detail-label {
                min-width: auto;
            }
            
            .social-grid {
                flex-wrap: wrap;
            }
            
            .cta-button {
                padding: 12px 25px;
                font-size: 0.95rem;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(15px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .email-wrapper {
            animation: fadeInUp 0.6s ease-out;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-header">
            <div class="logo">AHRAR<span>.</span><div class="logo-dot"></div></div>
            <h1 class="header-title">MESSAGE CONFIRMED</h1>
            <p class="header-subtitle">Thank You for Reaching Out</p>
            <div class="header-accent"></div>
        </div>
        
        <div class="email-content">
            <div class="greeting-section">
                <h2 class="greeting">
                    Dear <span class="greeting-name">${name}</span>,
                </h2>
                <p class="intro-text">
                    Thank you for taking the time to connect with me through my portfolio. 
                    I have successfully received your message and truly appreciate you reaching out.
                </p>
            </div>
            
            <div class="confirmation-card">
                <div class="confirmation-header">
                    <div class="confirmation-icon">✓</div>
                    <div>
                        <h3 class="confirmation-title">Message Details</h3>
                        <p class="confirmation-subtitle">Successfully received on ${new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</p>
                    </div>
                </div>
                
                <div class="details-grid">
                    <div class="detail-row">
                        <div class="detail-label">Name</div>
                        <div class="detail-value">${name}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Email Address</div>
                        <div class="detail-value">${email}</div>
                    </div>
                    
                    <div class="detail-row">
                        <div class="detail-label">Subject</div>
                        <div class="detail-value">${subject}</div>
                    </div>
                </div>
                
                <div class="message-container">
                    <div class="message-label">Your Message</div>
                    <div class="message-content">
                        ${message}
                    </div>
                </div>
            </div>
            
            <div class="process-section">
                <h3 class="section-title">What Happens Next</h3>
                
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-marker">1</div>
                        <div class="timeline-content">
                            <h4>Review & Analysis</h4>
                            <p>I will carefully review your message and requirements to understand your needs.</p>
                        </div>
                    </div>
                    
                    <div class="timeline-item">
                        <div class="timeline-marker">2</div>
                        <div class="timeline-content">
                            <h4>Personalized Response</h4>
                            <p>You will receive a detailed response from me within <strong>24-48 hours</strong>.</p>
                        </div>
                    </div>
                    
                    <div class="timeline-item">
                        <div class="timeline-marker">3</div>
                        <div class="timeline-content">
                            <h4>Discussion & Planning</h4>
                            <p>We will schedule a call to discuss your project in detail and explore possibilities.</p>
                        </div>
                    </div>
                    
                    <div class="timeline-item">
                        <div class="timeline-marker">4</div>
                        <div class="timeline-content">
                            <h4>Proposal & Collaboration</h4>
                            <p>I will prepare a comprehensive proposal outlining the approach and next steps.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="contact-cta">
                <h3 class="cta-title">Need Immediate Assistance?</h3>
                <p class="cta-subtitle">
                    If your matter requires urgent attention, please feel free to contact me directly.
                </p>
                <a href="tel:+923009289796" class="cta-button">
                    📞 Contact Directly
                </a>
            </div>
            
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; text-align: center; margin-top: 30px;">
                <em>This is an automated confirmation. A personalized response will follow shortly.</em>
            </p>
        </div>
        
        <div class="email-footer">
            <div class="footer-logo">AHRAR<span>.</span></div>
            
            <h4 class="footer-title">Ahrar Shah</h4>
            <p class="footer-subtitle">Front-End Developer | Full-Stack Capabilities</p>
            
            <!-- Social Links -->
            <div class="social-grid">
                <a href="https://github.com/ahrarshah25" class="social-item" title="GitHub">
                    <span style="font-size: 1.1rem;">🐙</span>
                </a>
                <a href="https://linkedin.com/in/ahrar-shah" class="social-item" title="LinkedIn">
                    <span style="font-size: 1.1rem;">💼</span>
                </a>
                <a href="https://instagram.com/ahrar_.shah" class="social-item" title="Instagram">
                    <span style="font-size: 1.1rem;">📸</span>
                </a>
            </div>
            
            <div class="footer-meta">
                © ${new Date().getFullYear()} Ahrar Shah. All Rights Reserved.<br>
                Professional Portfolio Communication<br>
                <a href="[UNSUBSCRIBE_LINK]">Manage Preferences</a> • <a href="[PORTFOLIO_LINK]">Visit Portfolio</a>
            </div>
        </div>
    </div>
</body>
</html>
  `,
  text: `
MESSAGE CONFIRMATION - Ahrar Shah Portfolio
═══════════════════════════════════════════════

Dear ${name},

Thank you for reaching out through my portfolio. I have successfully received your message and appreciate you taking the time to connect.

MESSAGE DETAILS
────────────────
• Name: ${name}
• Email: ${email}
• Subject: ${subject}

Your Message:
"${message}"

WHAT HAPPENS NEXT
────────────────
1. Review & Analysis
   I will carefully review your message and requirements

2. Personalized Response
   You will receive a detailed response within 24-48 hours

3. Discussion & Planning
   We will schedule a call to discuss your project in detail

4. Proposal & Collaboration
   I will prepare a comprehensive proposal outlining next steps

IMMEDIATE ASSISTANCE
────────────────────
If your matter requires urgent attention, please contact me directly:
Phone: +92 300 9289796

CONNECT WITH ME
───────────────
• GitHub: https://github.com/ahrarshah25
• LinkedIn: https://linkedin.com/in/ahrar-shah
• Instagram: https://instagram.com/ahrar_.shah

──────────────────────────────────────────────
Ahrar Shah
Front-End Developer | Full-Stack Capabilities
──────────────────────────────────────────────

© ${new Date().getFullYear()} Ahrar Shah. All Rights Reserved.
This is an automated confirmation. A personalized response will follow.

[Manage Preferences] [Visit Portfolio]
  `
});

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
