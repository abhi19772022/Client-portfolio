// Test Email API Endpoint
// Run this file to test if email sending works: node test-email.js

async function testEmailAPI() {
  console.log('\n🧪 Testing Email API...\n')
  
  const testData = {
    to: 'himanshu020104@gmail.com',
    data: {
      email: 'test@example.com',
      phone: '+91 9876543210',
      videoType: 'Short Form Videos (Reels, TikTok, Shorts)',
      duration: '1-5 minutes',
      editingStyle: 'Fast-paced with effects',
      frequency: '10-20 videos'
    }
  }

  try {
    console.log('📤 Sending test inquiry...\n')
    console.log('Data:', JSON.stringify(testData, null, 2))
    console.log('\n')
    
    const response = await fetch('http://localhost:3000/api/send-inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })

    const result = await response.json()
    
    if (result.success) {
      console.log('✅ SUCCESS! Email sent successfully!\n')
      console.log('Response:', JSON.stringify(result, null, 2))
      console.log('\n📧 Check himanshu020104@gmail.com for the email!')
    } else {
      console.log('❌ FAILED to send email\n')
      console.log('Error:', result.error)
      console.log('Details:', result.details || 'No details available')
      
      if (result.error === 'Email service not configured') {
        console.log('\n⚠️  API Key not configured!')
        console.log('Please follow these steps:')
        console.log('1. Sign up at https://resend.com')
        console.log('2. Get your API key from dashboard')
        console.log('3. Add it to .env.local file')
        console.log('4. Restart your dev server')
      }
    }
  } catch (error) {
    console.log('❌ ERROR during test:\n')
    console.log(error.message)
    console.log('\nMake sure your Next.js dev server is running on port 3000')
    console.log('Run: pnpm dev')
  }
  
  console.log('\n' + '='.repeat(60) + '\n')
}

// Run the test
testEmailAPI()
