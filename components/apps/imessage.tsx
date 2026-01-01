"use client"

import { useState, useEffect, useRef } from "react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  type: "text" | "options" | "input"
  options?: string[]
  inputType?: "email" | "phone"
}

export default function IMessage({ isDarkMode }: { isDarkMode?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [inputValue, setInputValue] = useState("")
  const [messageCounter, setMessageCounter] = useState(0)
  const [initialized, setInitialized] = useState(false)

  const questions = [
    {
      question: "Hi! 👋 Welcome to Himanshu's Video Editing Service! I'm here to help you get started. What type of video project do you need?",
      options: ["Long Form Videos (YouTube, Documentaries)", "Short Form Videos (Reels, TikTok, Shorts)", "Both"],
      key: "videoType"
    },
    {
      question: "Great choice! What's the typical duration of your videos?",
      options: ["Less than 1 minute", "1-5 minutes", "5-15 minutes", "More than 15 minutes"],
      key: "duration"
    },
    {
      question: "What style of editing are you looking for?",
      options: ["Fast-paced with effects", "Cinematic & Professional", "Minimal & Clean", "Trending & Viral style"],
      key: "editingStyle"
    },
    {
      question: "How many videos do you need edited per month?",
      options: ["1-5 videos", "5-10 videos", "10-20 videos", "20+ videos"],
      key: "frequency"
    },
    {
      question: "Perfect! What's your email address?",
      type: "input",
      inputType: "email",
      key: "email"
    },
    {
      question: "Great! And what's your contact number?",
      type: "input",
      inputType: "phone",
      key: "phone"
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initial welcome message - only run once
    if (!initialized) {
      setTimeout(() => {
        addAIMessage(questions[0].question, questions[0].options)
        setInitialized(true)
      }, 500)
    }
  }, [initialized])

  const getUniqueId = () => {
    const id = `${Date.now()}-${messageCounter}`
    setMessageCounter(prev => prev + 1)
    return id
  }

  const addAIMessage = (text: string, options?: string[], inputType?: "email" | "phone") => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: getUniqueId(),
        text,
        sender: "ai",
        type: inputType ? "input" : options ? "options" : "text",
        options,
        inputType
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

    // Save answer
    const newAnswers = { ...answers, [questions[currentQuestion].key]: option }
    setAnswers(newAnswers)

    // Move to next question
    const nextQuestion = currentQuestion + 1
    
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      const nextQ = questions[nextQuestion]
      setTimeout(() => {
        if (nextQ.type === "input") {
          addAIMessage(nextQ.question, undefined, nextQ.inputType)
        } else {
          addAIMessage(nextQ.question, nextQ.options)
        }
      }, 1500)
    } else {
      finishConversation(newAnswers)
    }
  }

  const handleInputSubmit = (value: string) => {
    if (!value.trim()) return

    // Add user's input
    addUserMessage(value)
    setInputValue("")

    // Save answer
    const newAnswers = { ...answers, [questions[currentQuestion].key]: value }
    setAnswers(newAnswers)

    // Move to next question
    const nextQuestion = currentQuestion + 1
    
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      const nextQ = questions[nextQuestion]
      setTimeout(() => {
        if (nextQ.type === "input") {
          addAIMessage(nextQ.question, undefined, nextQ.inputType)
        } else {
          addAIMessage(nextQ.question, nextQ.options)
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
    try {
      await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'abhimishra.db12@gmail.com',
          data: finalAnswers
        })
      })
    } catch (error) {
      console.error('Error sending email:', error)
    }
    
    setTimeout(() => {
      addAIMessage("📩 Notification sent to Himanshu! He will connect with you soon to discuss your project in detail.")
    }, 3000)
    
    setTimeout(() => {
      addAIMessage("Thank you for choosing Himanshu's Video Editing Service! Have a great day! ✨")
    }, 4500)
  }

  return (
    <div className={`h-full w-full flex flex-col ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
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
              ) : message.type === "input" ? (
                <div className="space-y-2">
                  <div
                    className={`rounded-2xl px-4 py-2 rounded-bl-md ${
                      isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <div className="mt-2">
                    <input
                      type={message.inputType === "email" ? "email" : "tel"}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleInputSubmit(inputValue)
                        }
                      }}
                      placeholder={message.inputType === "email" ? "your@email.com" : "+1 234 567 8900"}
                      className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium ${
                        isDarkMode
                          ? "bg-gray-800 text-white border border-gray-600"
                          : "bg-white text-gray-900 border border-gray-300"
                      }`}
                    />
                    <button
                      onClick={() => handleInputSubmit(inputValue)}
                      className="mt-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium bg-[#0B84FE] text-white hover:bg-[#0A75E3] transition-colors"
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
                  <div className="space-y-2 mt-2">
                    {message.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02] ${
                          isDarkMode
                            ? "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                            : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-300"
                        } shadow-sm`}
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
