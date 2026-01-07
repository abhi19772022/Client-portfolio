"use client"

import { useState, useEffect, useRef } from "react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  type: "text" | "options" | "input" | "dual-input"
  options?: string[]
  inputType?: "email" | "phone" | "text" | "number"
  dualInput?: boolean
}

export default function IMessage({ isDarkMode }: { isDarkMode?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [inputValue, setInputValue] = useState("")
  const [inputValue2, setInputValue2] = useState("")
  const messageCounterRef = useRef(0)
  const [initialized, setInitialized] = useState(false)
  const initializingRef = useRef(false)
  const [currentStep, setCurrentStep] = useState(0)

  const getNextQuestion = (step: number, currentAnswers: Record<string, string>) => {
    switch(step) {
      case 0:
        return {
          question: "Hi! 👋 Welcome to Himanshu's Video Editing Service! I'm here to help you get started. What type of video project do you need?",
          options: ["Long Form", "Short Form", "Other"],
          key: "videoType"
        }
      case 1:
        // Only show this if Short Form was selected
        if (currentAnswers.videoType === "Short Form") {
          return {
            question: "Great! Is it less than or more than 9 minutes?",
            options: ["Less than 9 minute video", "More than 9 minute video"],
            key: "shortFormDuration"
          }
        }
        // Skip to next step if not Short Form
        return getNextQuestion(2, currentAnswers)
      case 2:
        // Only show this if Long Form was selected
        if (currentAnswers.videoType === "Long Form") {
          return {
            question: "What's the duration of your long form video?",
            type: "input",
            inputType: "text",
            key: "longFormDuration"
          }
        }
        // Skip to next step if not Long Form
        return getNextQuestion(3, currentAnswers)
      case 3:
        return {
          question: "Please share your reference video link or type your reference explanation:",
          type: "dual-input",
          key: "reference"
        }
      case 4:
        return {
          question: "How many videos do you need?",
          type: "input",
          inputType: "number",
          key: "videoCount"
        }
      case 5:
        return {
          question: "How would you like to work with us?",
          options: ["Freelance Work", "Monthly Hire"],
          key: "workType"
        }
      case 6:
        return {
          question: "Perfect! What's your name?",
          type: "input",
          inputType: "text",
          key: "name"
        }
      case 7:
        return {
          question: "Great! What's your email address?",
          type: "input",
          inputType: "email",
          key: "email"
        }
      case 8:
        return {
          question: "And finally, what's your phone number?",
          type: "input",
          inputType: "phone",
          key: "phone"
        }
      default:
        return null
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initial welcome message - only run once
    if (!initialized && !initializingRef.current) {
      initializingRef.current = true
      setTimeout(() => {
        const firstQuestion = getNextQuestion(0, {})
        if (firstQuestion) {
          addAIMessage(firstQuestion.question, firstQuestion.options, firstQuestion.type === "input" ? firstQuestion.inputType as "email" | "phone" | "text" | "number" | undefined : undefined, firstQuestion.type === "dual-input")
        }
        setInitialized(true)
      }, 500)
    }
  }, [initialized])

  const getUniqueId = () => {
    const id = `${Date.now()}-${messageCounterRef.current}-${Math.random().toString(36).substr(2, 9)}`
    messageCounterRef.current += 1
    return id
  }

  const addAIMessage = (text: string, options?: string[], inputType?: "email" | "phone" | "text" | "number", isDualInput?: boolean) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: getUniqueId(),
        text,
        sender: "ai",
        type: isDualInput ? "dual-input" : inputType ? "input" : options ? "options" : "text",
        options,
        inputType,
        dualInput: isDualInput
      }])
    }, 1000)
  }

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: getUniqueId(),
      text,
      sender: "user",
      type: "text"
    }])
  }

  const handleOptionClick = (option: string) => {
    // Add user's choice
    addUserMessage(option)

    // Save answer with current question key
    const currentQuestion = getNextQuestion(currentStep, answers)
    if (!currentQuestion) return

    const newAnswers = { ...answers, [currentQuestion.key]: option }
    setAnswers(newAnswers)

    // Move to next step
    const nextStep = currentStep + 1
    setCurrentStep(nextStep)
    
    const nextQuestion = getNextQuestion(nextStep, newAnswers)
    
    if (nextQuestion) {
      setTimeout(() => {
        if (nextQuestion.type === "input") {
          addAIMessage(nextQuestion.question, undefined, nextQuestion.inputType as "email" | "phone" | "text" | "number" | undefined)
        } else if (nextQuestion.type === "dual-input") {
          addAIMessage(nextQuestion.question, undefined, undefined, true)
        } else {
          addAIMessage(nextQuestion.question, nextQuestion.options)
        }
      }, 1500)
    } else {
      finishConversation(newAnswers)
    }
  }

  const handleInputSubmit = (value: string, value2?: string) => {
    if (!value.trim() && !value2?.trim()) return

    // Add user's input
    if (value2) {
      addUserMessage(value || value2)
    } else {
      addUserMessage(value)
    }
    setInputValue("")
    setInputValue2("")

    // Save answer
    const currentQuestion = getNextQuestion(currentStep, answers)
    if (!currentQuestion) return

    const newAnswers = { 
      ...answers, 
      [currentQuestion.key]: value2 ? (value || value2) : value,
      ...(value2 && value ? { [`${currentQuestion.key}_link`]: value, [`${currentQuestion.key}_text`]: value2 } : {})
    }
    setAnswers(newAnswers)

    // Move to next step
    const nextStep = currentStep + 1
    setCurrentStep(nextStep)
    
    const nextQuestion = getNextQuestion(nextStep, newAnswers)
    
    if (nextQuestion) {
      setTimeout(() => {
        if (nextQuestion.type === "input") {
          addAIMessage(nextQuestion.question, undefined, nextQuestion.inputType as "email" | "phone" | "text" | "number" | undefined)
        } else if (nextQuestion.type === "dual-input") {
          addAIMessage(nextQuestion.question, undefined, undefined, true)
        } else {
          addAIMessage(nextQuestion.question, nextQuestion.options)
        }
      }, 1500)
    } else {
      finishConversation(newAnswers)
    }
  }

  const finishConversation = async (finalAnswers: Record<string, string>) => {
    // Send email with collected data
    setTimeout(() => {
      addAIMessage("Perfect! I have all the information I need. 🎬")
    }, 1500)

    // Send data to email
    setTimeout(async () => {
      try {
        const response = await fetch('/api/send-inquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'himanshu020104@gmail.com',
            data: finalAnswers
          })
        })

        const result = await response.json()
        
        if (result.success) {
          console.log('✅ Email sent successfully:', result)
          addAIMessage("📩 Notification sent to Himanshu! He will connect with you soon to discuss your project in detail.")
          
          setTimeout(() => {
            addAIMessage("Thank you for choosing Himanshu's Video Editing Service! Have a great day! ✨")
          }, 1500)
        } else {
          console.error('❌ Email failed:', result)
          addAIMessage("⚠️ There was an issue sending the notification, but your information has been recorded. Himanshu will reach out to you soon!")
        }
      } catch (error) {
        console.error('❌ Network error:', error)
        addAIMessage("⚠️ Network error occurred. Please try again or contact directly at himanshu020104@gmail.com")
      }
    }, 2000)
  }

  return (
    <div 
      className="h-full w-full flex flex-col"
      style={{
        background: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10.9px)',
        WebkitBackdropFilter: 'blur(10.9px)',
      }}
    >
      {/* Header */}
      <div className={`flex items-center gap-3 px-4 py-3 border-b ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
          H
        </div>
        <div>
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Himanshu's Assistant
          </h3>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Video Editing Inquiry Bot
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-[75%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
              {message.type === "text" ? (
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-[#0B84FE] text-white rounded-br-md"
                      : isDarkMode 
                      ? "bg-gray-700 text-white rounded-bl-md"
                      : "bg-gray-200 text-gray-900 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              ) : message.type === "dual-input" ? (
                <div className="space-y-2">
                  <div
                    className={`rounded-2xl px-4 py-2 rounded-bl-md ${
                      isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <div className="mt-3 space-y-3">
                    {/* macOS Glossy Input Field 1 */}
                    <div className="relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Paste reference video link here..."
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all
                          ${isDarkMode
                            ? "bg-gradient-to-b from-gray-800/90 to-gray-800/50 text-white placeholder-gray-400 border border-gray-700/50 shadow-inner backdrop-blur-xl focus:from-gray-700/90 focus:to-gray-700/50 focus:border-blue-500/50 focus:shadow-blue-500/20"
                            : "bg-gradient-to-b from-white/90 to-gray-50/90 text-gray-900 placeholder-gray-400 border border-gray-300/50 shadow-lg backdrop-blur-xl focus:from-white focus:to-white focus:border-blue-400/60 focus:shadow-blue-400/30"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                      />
                    </div>
                    
                    <div className="text-center text-xs font-medium text-gray-400">OR</div>
                    
                    {/* macOS Glossy Input Field 2 */}
                    <div className="relative">
                      <textarea
                        value={inputValue2}
                        onChange={(e) => setInputValue2(e.target.value)}
                        placeholder="Type or explain your reference here..."
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all resize-none
                          ${isDarkMode
                            ? "bg-gradient-to-b from-gray-800/90 to-gray-800/50 text-white placeholder-gray-400 border border-gray-700/50 shadow-inner backdrop-blur-xl focus:from-gray-700/90 focus:to-gray-700/50 focus:border-blue-500/50 focus:shadow-blue-500/20"
                            : "bg-gradient-to-b from-white/90 to-gray-50/90 text-gray-900 placeholder-gray-400 border border-gray-300/50 shadow-lg backdrop-blur-xl focus:from-white focus:to-white focus:border-blue-400/60 focus:shadow-blue-400/30"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                      />
                    </div>
                    
                    <button
                      onClick={() => handleInputSubmit(inputValue, inputValue2)}
                      className="mt-2 w-full px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-b from-[#0B84FE] to-[#0A75E3] text-white hover:from-[#0A75E3] hover:to-[#0966CC] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : message.type === "input" ? (
                <div className="space-y-2">
                  <div
                    className={`rounded-2xl px-4 py-2 rounded-bl-md ${
                      isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <div className="mt-3">
                    {/* macOS Glossy Input Field */}
                    <input
                      type={
                        message.inputType === "email" ? "email" : 
                        message.inputType === "phone" ? "tel" : 
                        message.inputType === "number" ? "number" : "text"
                      }
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleInputSubmit(inputValue)
                        }
                      }}
                      placeholder={
                        message.inputType === "email" ? "your@email.com" : 
                        message.inputType === "phone" ? "+1 234 567 8900" :
                        message.inputType === "number" ? "Enter number..." : "Type here..."
                      }
                      className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${isDarkMode
                          ? "bg-gradient-to-b from-gray-800/90 to-gray-800/50 text-white placeholder-gray-400 border border-gray-700/50 shadow-inner backdrop-blur-xl focus:from-gray-700/90 focus:to-gray-700/50 focus:border-blue-500/50 focus:shadow-blue-500/20"
                          : "bg-gradient-to-b from-white/90 to-gray-50/90 text-gray-900 placeholder-gray-400 border border-gray-300/50 shadow-lg backdrop-blur-xl focus:from-white focus:to-white focus:border-blue-400/60 focus:shadow-blue-400/30"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                    />
                    <button
                      onClick={() => handleInputSubmit(inputValue)}
                      className="mt-3 w-full px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-b from-[#0B84FE] to-[#0A75E3] text-white hover:from-[#0A75E3] hover:to-[#0966CC] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div
                    className={`rounded-2xl px-4 py-2 rounded-bl-md ${
                      isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <div className="space-y-2.5 mt-3">
                    {message.options?.map((option, index) => (
                      <button
                        key={`${message.id}-${index}`}
                        onClick={() => handleOptionClick(option)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]
                          ${isDarkMode
                            ? "bg-gradient-to-b from-gray-800/90 to-gray-800/50 text-white hover:from-gray-700/90 hover:to-gray-700/50 border border-gray-700/50 shadow-lg backdrop-blur-xl"
                            : "bg-gradient-to-b from-white/90 to-gray-50/90 text-gray-900 hover:from-white hover:to-white border border-gray-300/50 shadow-lg backdrop-blur-xl hover:shadow-xl"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <div className={`rounded-2xl rounded-bl-md px-4 py-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className={`px-4 py-3 border-t ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'}`}>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Select an option above to continue...
          </span>
        </div>
      </div>
    </div>
  )
}
