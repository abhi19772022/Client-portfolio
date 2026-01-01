import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { to, data } = await request.json()

    // Format the email content
    const emailContent = `
New Video Editing Inquiry from Portfolio Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email: ${data.email || 'N/A'}
📱 Phone: ${data.phone || 'N/A'}

PROJECT REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎬 Video Type: ${data.videoType || 'N/A'}
⏱️  Duration: ${data.duration || 'N/A'}
🎨 Editing Style: ${data.editingStyle || 'N/A'}
📅 Frequency: ${data.frequency || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This inquiry was submitted on ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `

    // Log to console (you'll see this in your terminal)
    console.log('\n' + '='.repeat(50))
    console.log('📧 NEW VIDEO EDITING INQUIRY')
    console.log('='.repeat(50))
    console.log(emailContent)
    console.log('='.repeat(50) + '\n')

    // Store in localStorage for debugging (client-side will need to be updated)
    // For production, integrate with services like:
    // - Resend (resend.com) - recommended
    // - SendGrid
    // - Nodemailer with SMTP
    
    // Example with Resend (uncomment and add your API key):
    /*
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portfolio Bot <onboarding@resend.dev>',
        to: [to],
        subject: '🎬 New Video Editing Inquiry',
        text: emailContent
      })
    })
    */

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry received successfully',
      data: data,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error processing inquiry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
