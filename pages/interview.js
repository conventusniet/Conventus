"use client"

import { useState, useEffect, useRef } from "react"

// Base API URL
const API_BASE_URL = "https://conventus-interview-api.onrender.com/api"

export default function InterviewPage() {
  // State variables
  const [step, setStep] = useState("intro") // intro, registration, interview, upload, complete
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [interviewId, setInterviewId] = useState(null)
  const [responseId, setResponseId] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [candidateInfo, setCandidateInfo] = useState({
    name: "",
    email: "",
  })
  const [profileInfo, setProfileInfo] = useState({
    projectLinks: "",
    profileImage: null,
    resume: null,
  })
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioURL, setAudioURL] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverLoading, setServerLoading] = useState(true)
  const [loadingDots, setLoadingDots] = useState(".")
  // New state for answer mode (voice or text)
  const [answerMode, setAnswerMode] = useState("voice") // "voice" or "text"
  const [textAnswer, setTextAnswer] = useState("")

  // Refs
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const recognitionRef = useRef(null)

  // Loading animation for server initialization
  useEffect(() => {
    if (serverLoading) {
      const interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev.length >= 3) return "."
          return prev + "."
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [serverLoading])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event) => {
          let interimTranscript = ""
          let finalTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript + " "
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript(finalTranscript || interimTranscript)
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error)
          setError(`Microphone error: ${event.error}`)
          setIsListening(false)
        }
      } else {
        setError("Speech recognition not supported in this browser. Please use Chrome.")
      }
    }

    // Fetch questions
    fetchQuestions()

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  // Fetch questions from API with server loading handling
  const fetchQuestions = async () => {
    try {
      setLoading(true)
      setServerLoading(true)

      // First API call attempt
      let response
      try {
        response = await fetch(`${API_BASE_URL}/questions/`)
      } catch (err) {
        console.log("Initial API call failed, server might be waking up:", err)
        // Wait 3 seconds and try again
        await new Promise((resolve) => setTimeout(resolve, 3000))
        response = await fetch(`${API_BASE_URL}/questions/`)
      }

      if (!response.ok) throw new Error("Failed to fetch questions")

      const data = await response.json()
      setQuestions(data)
      setLoading(false)
      setServerLoading(false)
    } catch (error) {
      console.error("Error fetching questions:", error)
      setError("Server is starting up. Please wait a moment and try again.")
      setLoading(false)

      // Retry after 5 seconds
      setTimeout(() => {
        fetchQuestions()
      }, 5000)
    }
  }

  // Create new interview
  const createInterview = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/interviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate_name: candidateInfo.name,
          candidate_email: candidateInfo.email,
        }),
      })

      if (!response.ok) throw new Error("Failed to create interview")

      const data = await response.json()
      setInterviewId(data.id)
      setLoading(false)
      return data.id
    } catch (error) {
      console.error("Error creating interview:", error)
      setError("Failed to start interview. Please try again.")
      setLoading(false)
      return null
    }
  }

  // Create response for current question
  const createResponse = async (interviewId, questionId, transcriptText) => {
    try {
      const response = await fetch(`${API_BASE_URL}/interviews/${interviewId}/responses/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionId,
          transcript: transcriptText,
        }),
      })

      if (!response.ok) throw new Error("Failed to save response")

      const data = await response.json()
      return data.id
    } catch (error) {
      console.error("Error saving response:", error)
      setError("Failed to save your answer. Please try again.")
      return null
    }
  }

  // Upload audio recording
  const uploadAudio = async (interviewId, responseId, audioBlob) => {
    try {
      const formData = new FormData()
      formData.append("audio", audioBlob, "answer.webm")

      const response = await fetch(`${API_BASE_URL}/interviews/${interviewId}/responses/${responseId}/audio/`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to upload audio")

      return true
    } catch (error) {
      console.error("Error uploading audio:", error)
      setError("Failed to upload audio recording. Please try again.")
      return false
    }
  }

  // Upload candidate profile
  const uploadProfile = async (interviewId) => {
    try {
      const formData = new FormData()
      if (profileInfo.projectLinks) {
        formData.append("project_links", profileInfo.projectLinks)
      }
      if (profileInfo.profileImage) {
        formData.append("profile_image", profileInfo.profileImage)
      }
      if (profileInfo.resume) {
        formData.append("resume", profileInfo.resume)
      }

      const response = await fetch(`${API_BASE_URL}/interviews/${interviewId}/profile/`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to upload profile")

      return true
    } catch (error) {
      console.error("Error uploading profile:", error)
      setError("Failed to upload profile information. Please try again.")
      return false
    }
  }

  // Start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioBlob(audioBlob)
        setAudioURL(audioUrl)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start()
        setIsListening(true)
      }
    } catch (error) {
      console.error("Error starting recording:", error)
      setError("Failed to access microphone. Please check your permissions and try again.")
    }
  }

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Stop speech recognition
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop()
        setIsListening(false)
      }

      // Get all tracks from all streams and stop them
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
      }
    }
  }

  // Speak question using text-to-speech
  const speakQuestion = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9 // Slightly slower rate for clarity
      window.speechSynthesis.speak(utterance)
    } else {
      console.error("Text-to-speech not supported in this browser")
    }
  }

  // Handle registration form submission
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault()

    if (!candidateInfo.name || !candidateInfo.email) {
      setError("Please fill in all required fields")
      return
    }

    const id = await createInterview()
    if (id) {
      setStep("interview")
      // Speak the first question after a short delay
      setTimeout(() => {
        if (questions.length > 0) {
          speakQuestion(questions[0].text)
        }
      }, 1000)
    }
  }

  // Handle next question
  const handleNextQuestion = async () => {
    // Get the answer based on the current answer mode
    const currentAnswer = answerMode === "voice" ? transcript : textAnswer

    if (!currentAnswer.trim()) {
      setError("Please provide an answer before continuing")
      return
    }

    setLoading(true)

    // Save current response
    const respId = await createResponse(interviewId, questions[currentQuestionIndex].id, currentAnswer)

    if (respId) {
      setResponseId(respId)

      // Upload audio if available and in voice mode
      if (answerMode === "voice" && audioBlob) {
        await uploadAudio(interviewId, respId, audioBlob)
      }

      // Reset for next question
      setTranscript("")
      setTextAnswer("")
      setAudioBlob(null)
      setAudioURL("")

      // Move to next question or finish
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setLoading(false)

        // Speak the next question after a short delay
        setTimeout(() => {
          speakQuestion(questions[currentQuestionIndex + 1].text)
        }, 1000)
      } else {
        // All questions answered, move to profile upload
        setLoading(false)
        setStep("upload")
      }
    } else {
      setLoading(false)
    }
  }

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const success = await uploadProfile(interviewId)
    if (success) {
      setStep("complete")
    }

    setLoading(false)
  }

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setProfileInfo({
        ...profileInfo,
        [name]: files[0],
      })
    }
  }

  // Toggle between voice and text answer modes
  const toggleAnswerMode = () => {
    setAnswerMode(answerMode === "voice" ? "text" : "voice")

    // If switching from text to voice, clear text answer
    if (answerMode === "text") {
      setTextAnswer("")
    }

    // If switching from voice to text, stop recording if active
    if (answerMode === "voice" && isRecording) {
      stopRecording()
    }
  }

  // Server loading screen
  if (serverLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-300 rounded-full opacity-25"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-8 border-red-600 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">Initializing Interview System</h2>
        <p className="text-xl text-center mb-6">Connecting to server{loadingDots}</p>
        <div className="w-full max-w-md bg-gray-800 bg-opacity-50 p-6 rounded-lg border border-gray-700">
          <p className="text-center text-gray-300">
            The server is starting up. This might take a minute as it's hosted on a free tier service.
          </p>
        </div>
      </div>
    )
  }

  // Render different steps of the interview process
  const renderStep = () => {
    switch (step) {
      case "intro":
        return (
          <div className="text-center">
            <div className="mb-8 relative">
              <svg
                className="w-16 h-16 mx-auto text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-red-600 text-3xl font-bold mb-6">AI-Powered Interview</h2>
            <p className="mb-4 leading-relaxed text-lg">
              Welcome to our automated interview system. This interview will consist of {questions.length} questions
              that will be read aloud to you.
            </p>
            <p className="mb-4 leading-relaxed text-lg">
              You can answer either by speaking or by typing your responses.
            </p>
            <p className="mb-4 leading-relaxed text-lg">
              After the interview, you'll have the opportunity to upload your portfolio links and resume.
            </p>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl shadow-lg my-8 text-left border border-gray-200">
              <h3 className="text-red-600 text-xl font-semibold mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Instructions:
              </h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li className="text-gray-700">Choose your preferred answer method: voice or text</li>
                <li className="text-gray-700">If using voice, allow microphone access when prompted</li>
                <li className="text-gray-700">Listen to each question carefully</li>
                <li className="text-gray-700">Provide your answer by speaking or typing</li>
                <li className="text-gray-700">Review your answer before proceeding to the next question</li>
              </ol>
            </div>
            <button
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl min-w-[200px] mx-auto block mt-6 transform hover:-translate-y-1"
              onClick={() => setStep("registration")}
            >
              Start Interview
            </button>
          </div>
        )

      case "registration":
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-red-600 text-3xl font-bold mb-6 text-center">Candidate Registration</h2>
            <form onSubmit={handleRegistrationSubmit} className="space-y-6">
              <div className="transition-all duration-300 hover:shadow-md p-4 rounded-lg border border-gray-200 focus-within:border-red-300 focus-within:ring-2 focus-within:ring-red-100">
                <label htmlFor="name" className="block font-bold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={candidateInfo.name}
                  onChange={(e) => setCandidateInfo({ ...candidateInfo, name: e.target.value })}
                  className="w-full p-3 border-none focus:ring-0 text-base bg-transparent"
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="transition-all duration-300 hover:shadow-md p-4 rounded-lg border border-gray-200 focus-within:border-red-300 focus-within:ring-2 focus-within:ring-red-100">
                <label htmlFor="email" className="block font-bold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={candidateInfo.email}
                  onChange={(e) => setCandidateInfo({ ...candidateInfo, email: e.target.value })}
                  className="w-full p-3 border-none focus:ring-0 text-base bg-transparent"
                  required
                  placeholder="Enter your email address"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl w-full mt-8 disabled:from-red-300 disabled:to-red-400 disabled:cursor-not-allowed disabled:shadow-none"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  "Begin Interview"
                )}
              </button>
            </form>
          </div>
        )

      case "interview":
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-red-600 font-semibold">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500 ease-out"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl mb-8 shadow-md border border-gray-200">
              <div className="flex items-start">
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4 mt-1">
                  Q
                </div>
                <div>
                  <h3 className="text-red-600 text-xl font-semibold mb-3">Question:</h3>
                  <p className="text-lg font-medium mb-4 text-gray-800">{questions[currentQuestionIndex]?.text}</p>
                  <button
                    className="flex items-center text-red-600 border border-red-200 bg-white py-2 px-4 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
                    onClick={() => speakQuestion(questions[currentQuestionIndex]?.text)}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                    Speak Question
                  </button>
                </div>
              </div>
            </div>

            {/* Answer Mode Toggle */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-4">Answer Method:</span>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      checked={answerMode === "text"}
                      onChange={toggleAnswerMode}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                    />
                    <label
                      htmlFor="toggle"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                </div>
                <span className="text-red-600 font-medium">
                  {answerMode === "voice" ? "Voice Recording" : "Text Input"}
                </span>
              </div>
              <style jsx>{`
                                .toggle-checkbox:checked {
                                    transform: translateX(100%);
                                    border-color: #ef4444;
                                }
                                .toggle-checkbox:checked + .toggle-label {
                                    background-color: #fca5a5;
                                }
                            `}</style>
            </div>

            <div className="mb-6">
              <div className="flex items-start">
                <div className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4 mt-1">
                  A
                </div>
                <div className="w-full">
                  <h3 className="text-gray-800 text-xl font-semibold mb-3">Your Answer:</h3>

                  {/* Voice Recording UI */}
                  {answerMode === "voice" ? (
                    <>
                      <div
                        className={`min-h-[150px] border border-gray-300 rounded-lg p-5 mb-4 ${isRecording ? "bg-red-50 border-red-200" : "bg-white"} transition-colors duration-200 whitespace-pre-wrap shadow-inner`}
                      >
                        {transcript || (
                          <span className="text-gray-400 italic">Your answer will appear here as you speak...</span>
                        )}
                        {isRecording && (
                          <div className="flex items-center text-red-600 mt-4">
                            <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                            Recording in progress...
                          </div>
                        )}
                      </div>

                      <div className="flex items-center mb-6">
                        {!isRecording ? (
                          <button
                            className="bg-red-600 text-white font-medium py-3 px-5 rounded-lg mr-4 hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed shadow-md flex items-center"
                            onClick={startRecording}
                            disabled={loading}
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                              />
                            </svg>
                            Start Recording
                          </button>
                        ) : (
                          <button
                            className="bg-gray-800 text-white font-medium py-3 px-5 rounded-lg mr-4 hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md flex items-center"
                            onClick={stopRecording}
                            disabled={loading}
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                              />
                            </svg>
                            Stop Recording
                          </button>
                        )}
                      </div>

                      {audioURL && (
                        <div className="my-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-red-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                              />
                            </svg>
                            Review your answer:
                          </h4>
                          <audio src={audioURL} controls className="w-full" />
                        </div>
                      )}
                    </>
                  ) : (
                    /* Text Input UI */
                    <div className="mb-6">
                      <textarea
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                        className="w-full min-h-[200px] border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-red-100 focus:border-red-300 transition-all duration-200 shadow-inner"
                      ></textarea>
                      <p className="text-sm text-gray-500 mt-2">
                        Please provide a detailed response to the question above.
                      </p>
                    </div>
                  )}

                  <button
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl w-full mt-6 disabled:from-red-300 disabled:to-red-400 disabled:cursor-not-allowed disabled:shadow-none"
                    onClick={handleNextQuestion}
                    disabled={
                      loading || (answerMode === "voice" ? !transcript.trim() || isRecording : !textAnswer.trim())
                    }
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                        Saving...
                      </div>
                    ) : currentQuestionIndex < questions.length - 1 ? (
                      <div className="flex items-center justify-center">
                        <span>Next Question</span>
                        <svg
                          className="w-5 h-5 ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>Complete Interview</span>
                        <svg
                          className="w-5 h-5 ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case "upload":
        return (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-red-600 text-3xl font-bold mb-4 text-center">Upload Your Portfolio</h2>
            <p className="mb-8 text-center text-gray-600">
              Please share links to your projects and upload your resume to complete your application.
            </p>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="transition-all duration-300 hover:shadow-md p-5 rounded-lg border border-gray-200 focus-within:border-red-300 focus-within:ring-2 focus-within:ring-red-100">
                <label htmlFor="projectLinks" className="block font-bold text-gray-700 mb-2">
                  Project Links
                  <span className="text-gray-500 text-sm font-normal ml-2">(separate with commas)</span>
                </label>
                <textarea
                  id="projectLinks"
                  value={profileInfo.projectLinks}
                  onChange={(e) => setProfileInfo({ ...profileInfo, projectLinks: e.target.value })}
                  placeholder="https://github.com/yourusername, https://yourportfolio.com, etc."
                  className="w-full p-3 border border-gray-200 rounded-md text-base min-h-[100px] resize-y focus:border-red-300 focus:ring focus:ring-red-100"
                />
              </div>

              <div className="transition-all duration-300 hover:shadow-md p-5 rounded-lg border border-gray-200">
                <label htmlFor="resume" className="block font-bold text-gray-700 mb-3">
                  Resume/CV
                  <span className="text-gray-500 text-sm font-normal ml-2">(PDF, DOC or DOCX)</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-red-300 transition-colors text-center">
                  {!profileInfo.resume ? (
                    <div className="space-y-3">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-gray-500">Drag and drop your resume here or</p>
                      <label className="cursor-pointer text-red-600 hover:text-red-700 transition-colors font-medium inline-block">
                        Browse Files
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="w-8 h-8 text-red-600 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="font-medium truncate max-w-xs">{profileInfo.resume.name}</span>
                      </div>
                      <button
                        type="button"
                        className="text-gray-500 hover:text-red-600"
                        onClick={() => setProfileInfo({ ...profileInfo, resume: null })}
                      >
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl w-full mt-8 disabled:from-red-300 disabled:to-red-400 disabled:cursor-not-allowed disabled:shadow-none"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                    Uploading...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Complete Interview</span>
                    <svg
                      className="w-5 h-5 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            </form>
          </div>
        )

      case "complete":
        return (
          <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-12 h-12 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-red-600 text-3xl font-bold mb-4">Interview Completed!</h2>
            <p className="mb-4 text-lg text-gray-700">
              Thank you for completing the interview process. Your responses have been recorded successfully.
            </p>
            <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-left">
              <h4 className="font-semibold text-gray-800 mb-3">What happens next?</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Our team will review your interview responses
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  You'll receive an email with feedback within 5-7 business days
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Qualified candidates will be invited for the next round
                </li>
              </ul>
            </div>
            <button
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl min-w-[200px] transform hover:-translate-y-1"
              onClick={() => (window.location.href = "/")}
            >
              Return to Home
            </button>
          </div>
        )

      default:
        return (
          <div className="text-center py-8 flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-xl text-gray-600">Loading interview system...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto font-sans text-gray-800 relative">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r-lg shadow-md flex justify-between items-center">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-red-600 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
            <button onClick={() => setError("")} className="text-red-600 font-bold ml-4">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {renderStep()}

        
       
      </div>
    </div>
  )
}
