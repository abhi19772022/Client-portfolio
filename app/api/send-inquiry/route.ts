import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Validation helper
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string) => {
  // Basic phone validation (adjust as needed)
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
  return phoneRegex.test(phone)
}

export async function POST(request: Request) {
  try {
    const { to, data } = await request.json()

    // Validate required fields
    if (!data.email || !validateEmail(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!data.phone || !validatePhone(data.phone)) {
      return NextResponse.json(
        { success: false, error: 'Valid phone number is required' },
        { status: 400 }
      )
    }

    // Format timestamp
    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'long',
      timeZone: 'Asia/Kolkata'
    })

    // Create HTML email template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .label { color: #666; font-size: 12px; text-transform: uppercase; font-weight: bold; margin-bottom: 5px; }
    .value { color: #333; font-size: 16px; margin-bottom: 15px; }
    .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
    .icon { font-size: 24px; margin-right: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 28px;">🎬 New Video Editing Inquiry</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio Website Submission</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h2 style="margin-top: 0; color: #667eea;">👤 Client Information</h2>
        <div class="label">Email Address</div>
        <div class="value">📧 ${data.email}</div>
        
        <div class="label">Phone Number</div>
        <div class="value">📱 ${data.phone}</div>
      </div>
      
      <div class="section">
        <h2 style="margin-top: 0; color: #667eea;">🎥 Project Requirements</h2>
        
        <div class="label">Video Type</div>
        <div class="value">${data.videoType || 'Not specified'}</div>
        
        <div class="label">Video Duration</div>
        <div class="value">⏱️ ${data.duration || 'Not specified'}</div>
        
        <div class="label">Editing Style</div>
        <div class="value">🎨 ${data.editingStyle || 'Not specified'}</div>
        
        <div class="label">Monthly Frequency</div>
        <div class="value">📅 ${data.frequency || 'Not specified'}</div>
      </div>
      
      <div class="footer">
        <p>Submitted on ${timestamp}</p>
        <p>This inquiry was automatically sent from your portfolio website.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `

    // Text version for email clients that don't support HTML
    const textContent = `
🎬 NEW VIDEO EDITING INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CLIENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: ${data.email}
📱 Phone: ${data.phone}

🎥 PROJECT REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 Video Type: ${data.videoType || 'Not specified'}
⏱️  Duration: ${data.duration || 'Not specified'}
🎨 Editing Style: ${data.editingStyle || 'Not specified'}
📅 Frequency: ${data.frequency || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted on ${timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `

    // Log to console for debugging
    console.log('\n' + '='.repeat(60))
    console.log('📧 SENDING EMAIL TO:', to)
    console.log('='.repeat(60))
    console.log(textContent)
    console.log('='.repeat(60) + '\n')

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️  RESEND_API_KEY not configured. Email not sent.')
      console.log('ℹ️  Add RESEND_API_KEY to your .env.local file')
      
      return NextResponse.json({ 
        success: false, 
        error: 'Email service not configured',
        message: 'Please add RESEND_API_KEY to environment variables',
        data: data,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: 'Himanshu Portfolio <onboarding@resend.dev>', // Change this to your verified domain
      to: [to],
      replyTo: data.email, // Allow replying directly to client
      subject: `🎬 New Video Editing Inquiry from ${data.email}`,
      html: htmlContent,
      text: textContent,
    })

    console.log('✅ Email sent successfully:', emailResponse)

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry sent successfully to your email',
      emailId: emailResponse.data?.id || 'unknown',
      data: data,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('❌ Error processing inquiry:', error)
    
    // Detailed error logging
    if (error.message) {
      console.error('Error message:', error.message)
    }
    if (error.statusCode) {
      console.error('Status code:', error.statusCode)
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send inquiry',
        details: error.message || 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
