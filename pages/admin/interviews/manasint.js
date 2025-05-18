"use client"

import { useState, useEffect } from "react"
import {
  Trash2,
  Edit,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Download,
  ExternalLink,
  FileText,
  User,
  Calendar,
  Mail,
  Mic,
  MessageSquare,
  LinkIcon,
  Filter,
  RefreshCw,
  Info,
  AlertCircle,
  Menu,
  Home,
  Settings,
  LogOut,
  Plus,
  MoreVertical,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Base API URL
const API_BASE_URL = "https://conventus-interview-api.onrender.com/api"

export default function AdminDashboard() {
  // State variables
  const [interviews, setInterviews] = useState([])
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expandedInterview, setExpandedInterview] = useState(null)
  const [expandedSection, setExpandedSection] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "started_at", direction: "desc" })
  const [editMode, setEditMode] = useState(null)
  const [editData, setEditData] = useState({})
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [showMenu, setShowMenu] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("list") // list, detail
  const [selectedInterview, setSelectedInterview] = useState(null)

  // Fetch interviews and questions on component mount
  useEffect(() => {
    fetchInterviews()
    fetchQuestions()
  }, [])

  // Fetch all interviews from API
  const fetchInterviews = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/interviews/`)

      if (!response.ok) {
        throw new Error("Failed to fetch interviews")
      }

      const data = await response.json()
      setInterviews(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching interviews:", error)
      setError("Failed to load interviews. Please try again.")
      setLoading(false)
    }
  }

  // Fetch all questions from API
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/`)

      if (!response.ok) {
        throw new Error("Failed to fetch questions")
      }

      const data = await response.json()
      setQuestions(data)
    } catch (error) {
      console.error("Error fetching questions:", error)
      setError("Failed to load questions. Please try again.")
    }
  }

  // Handle interview deletion
  const handleDeleteInterview = async (id) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/interviews/${id}/`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete interview")
      }

      // Remove the deleted interview from state
      setInterviews(interviews.filter((interview) => interview.id !== id))
      setDeleteConfirm(null)
      setLoading(false)

      // If we're in detail view and deleted the current interview, go back to list
      if (viewMode === "detail" && selectedInterview && selectedInterview.id === id) {
        setViewMode("list")
        setSelectedInterview(null)
      }
    } catch (error) {
      console.error("Error deleting interview:", error)
      setError("Failed to delete interview. Please try again.")
      setLoading(false)
    }
  }

  // Handle interview update
  const handleUpdateInterview = async (id) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/interviews/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate_name: editData.candidate_name,
          candidate_email: editData.candidate_email,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update interview")
      }

      // Update the interview in state
      const updatedData = await response.json()
      const updatedInterviews = interviews.map((interview) =>
        interview.id === id ? { ...interview, ...updatedData } : interview,
      )

      setInterviews(updatedInterviews)

      // Update selected interview if in detail view
      if (viewMode === "detail" && selectedInterview && selectedInterview.id === id) {
        setSelectedInterview({ ...selectedInterview, ...updatedData })
      }

      setEditMode(null)
      setLoading(false)
    } catch (error) {
      console.error("Error updating interview:", error)
      setError("Failed to update interview. Please try again.")
      setLoading(false)
    }
  }

  // Handle response deletion
  const handleDeleteResponse = async (interviewId, responseId) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/interviews/${interviewId}/responses/${responseId}/`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete response")
      }

      // Update the interview in state by removing the deleted response
      const updatedInterviews = interviews.map((interview) => {
        if (interview.id === interviewId) {
          return {
            ...interview,
            responses: interview.responses.filter((resp) => resp.id !== responseId),
          }
        }
        return interview
      })

      setInterviews(updatedInterviews)

      // Update selected interview if in detail view
      if (viewMode === "detail" && selectedInterview && selectedInterview.id === interviewId) {
        setSelectedInterview({
          ...selectedInterview,
          responses: selectedInterview.responses.filter((resp) => resp.id !== responseId),
        })
      }

      setDeleteConfirm(null)
      setLoading(false)
    } catch (error) {
      console.error("Error deleting response:", error)
      setError("Failed to delete response. Please try again.")
      setLoading(false)
    }
  }

  // Handle response update
  const handleUpdateResponse = async (interviewId, responseId) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/interviews/${interviewId}/responses/${responseId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: editData.transcript,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update response")
      }

      // Update the response in state
      const updatedData = await response.json()
      const updatedInterviews = interviews.map((interview) => {
        if (interview.id === interviewId) {
          return {
            ...interview,
            responses: interview.responses.map((resp) => (resp.id === responseId ? { ...resp, ...updatedData } : resp)),
          }
        }
        return interview
      })

      setInterviews(updatedInterviews)

      // Update selected interview if in detail view
      if (viewMode === "detail" && selectedInterview && selectedInterview.id === interviewId) {
        setSelectedInterview({
          ...selectedInterview,
          responses: selectedInterview.responses.map((resp) =>
            resp.id === responseId ? { ...resp, ...updatedData } : resp,
          ),
        })
      }

      setEditMode(null)
      setLoading(false)
    } catch (error) {
      console.error("Error updating response:", error)
      setError("Failed to update response. Please try again.")
      setLoading(false)
    }
  }

  // Toggle expanded interview
  const toggleExpandInterview = (id) => {
    setExpandedInterview(expandedInterview === id ? null : id)
    // Reset expanded sections when changing interviews
    if (expandedInterview !== id) {
      setExpandedSection({})
    }
  }

  // Toggle expanded section
  const toggleExpandSection = (section) => {
    setExpandedSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Sort interviews
  const sortedInterviews = [...interviews].sort((a, b) => {
    if (sortConfig.key === "started_at") {
      return sortConfig.direction === "asc"
        ? new Date(a.started_at) - new Date(b.started_at)
        : new Date(b.started_at) - new Date(a.started_at)
    }

    if (sortConfig.key === "candidate_name") {
      return sortConfig.direction === "asc"
        ? a.candidate_name.localeCompare(b.candidate_name)
        : b.candidate_name.localeCompare(a.candidate_name)
    }

    if (sortConfig.key === "responses") {
      return sortConfig.direction === "asc"
        ? a.responses.length - b.responses.length
        : b.responses.length - a.responses.length
    }

    return 0
  })

  // Filter interviews by search term
  const filteredInterviews = sortedInterviews.filter((interview) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      interview.candidate_name.toLowerCase().includes(searchLower) ||
      interview.candidate_email.toLowerCase().includes(searchLower) ||
      interview.id.toString().includes(searchLower)
    )
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Get question text by ID
  const getQuestionText = (questionId) => {
    const question = questions.find((q) => q.id === questionId)
    return question ? question.text : `Question #${questionId}`
  }

  // Start editing an interview
  const startEditInterview = (interview) => {
    setEditMode(`interview-${interview.id}`)
    setEditData({
      candidate_name: interview.candidate_name,
      candidate_email: interview.candidate_email,
    })
  }

  // Start editing a response
  const startEditResponse = (response) => {
    setEditMode(`response-${response.id}`)
    setEditData({
      transcript: response.transcript,
    })
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditMode(null)
    setEditData({})
  }

  // Parse project links from comma-separated string
  const parseProjectLinks = (linksString) => {
    if (!linksString) return []
    return linksString
      .split(",")
      .map((link) => link.trim())
      .filter((link) => link.length > 0)
  }

  // View interview details
  const viewInterviewDetails = (interview) => {
    setSelectedInterview(interview)
    setViewMode("detail")
    // Automatically expand responses section
    setExpandedSection({ responses: true })
  }

  // Go back to list view
  const goBackToList = () => {
    setViewMode("list")
    setSelectedInterview(null)
    setExpandedSection({})
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile App-like Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {(() => {
              if (viewMode === "detail") {
                return (
                  <button onClick={goBackToList} className="flex items-center text-white">
                    <ArrowLeft className="h-7 w-7" />
                    
                  </button>
                )
              }
            })()}


            <h1 className="text-xl font-bold justify-center flex-1 text-center">
              {viewMode === "detail" ? selectedInterview?.candidate_name || "Interview Details" : "Interview Admin"}
            </h1>

            {(() => {
              if (viewMode === "list") {
                return (
                  <button
                    onClick={() => fetchInterviews()}
                    className="p-2 rounded-full hover:bg-red-500 transition-colors"
                    aria-label="Refresh"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                );
              }
            })()}



          </div>

          {/* Search bar - only in list view */}
          {viewMode === "list" && (
            <div className="mt-3 relative">
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm text-sm"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>




        {/* Filter bar - only in list view */}
        {
          viewMode === "list" && (
            <div className="px-4 py-2 bg-red-800 flex items-center justify-between">
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center text-white text-sm">
                <Filter className="h-4 w-4 mr-1" />
                <span>Filter & Sort</span>
                {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </button>

              <div className="text-white text-sm">
                {filteredInterviews.length} {filteredInterviews.length === 1 ? "interview" : "interviews"}
              </div>
            </div>
          )
        }

        {/* Expanded filter options */}
        {
          viewMode === "list" && showFilters && (
            <div className="px-4 py-3 bg-red-50 border-b border-red-200">
              <div className="text-sm font-medium text-red-800 mb-2">Sort by:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSort("started_at")}
                  className={`px-3 py-1 rounded-full text-xs flex items-center ${sortConfig.key === "started_at"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                    }`}
                >
                  Date
                  {sortConfig.key === "started_at" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-3 w-3" />
                    ) : (
                      <ChevronDown className="ml-1 h-3 w-3" />
                    ))}
                </button>
                <button
                  onClick={() => handleSort("candidate_name")}
                  className={`px-3 py-1 rounded-full text-xs flex items-center ${sortConfig.key === "candidate_name"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                    }`}
                >
                  Name
                  {sortConfig.key === "candidate_name" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-3 w-3" />
                    ) : (
                      <ChevronDown className="ml-1 h-3 w-3" />
                    ))}
                </button>
                <button
                  onClick={() => handleSort("responses")}
                  className={`px-3 py-1 rounded-full text-xs flex items-center ${sortConfig.key === "responses"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                    }`}
                >
                  Responses
                  {sortConfig.key === "responses" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-3 w-3" />
                    ) : (
                      <ChevronDown className="ml-1 h-3 w-3" />
                    ))}
                </button>
              </div>
            </div>
          )
        }
      </header >

      {/* Main Content */}
      < main className="flex-1 px-4 py-4" >
        {/* Error Message */}
        {
          error && (
            <div className="bg-red-50 border-l-4 border-red-600 p-3 mb-4 rounded-r-lg shadow-sm flex justify-between items-center">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
              <button onClick={() => setError("")} className="text-red-600 hover:text-red-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        }

        {/* Loading State */}
        {
          loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-3 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          )
        }

        {/* List View */}
        {
          !loading && viewMode === "list" && (
            <>
              {/* No Results */}
              {filteredInterviews.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No interviews found</h3>
                  <p className="text-gray-600 text-sm">
                    {searchTerm ? "Try adjusting your search terms" : "No interviews have been recorded yet"}
                  </p>
                </div>
              )}

              {/* Interviews List */}
              {filteredInterviews.length > 0 && (
                <div className="space-y-3">
                  {filteredInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
                    >
                      <div
                        className="p-4 cursor-pointer active:bg-gray-50"
                        onClick={() => viewInterviewDetails(interview)}
                      >
                        <div className="flex items-start">
                          <div className="bg-red-100 text-red-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-3">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-800 truncate">{interview.candidate_name}</h3>
                            <div className="flex flex-col text-xs text-gray-500 mt-1">
                              <span className="flex items-center">
                                <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="truncate">{interview.candidate_email}</span>
                              </span>
                              <span className="flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                                {formatDate(interview.started_at)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-2 flex flex-col items-end">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${interview.responses.length > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                              {interview.responses.length > 0 ? "Completed" : "Incomplete"}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              {interview.responses.length} {interview.responses.length === 1 ? "response" : "responses"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )
        }

        {/* Detail View */}
        {
          !loading && viewMode === "detail" && selectedInterview && (
            <div className="space-y-4">
              {/* Candidate Info Card */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-red-100 text-red-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 mr-3">
                        <User className="h-6 w-6" />
                      </div>
                      {editMode === `interview-${selectedInterview.id}` ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editData.candidate_name}
                            onChange={(e) => setEditData({ ...editData, candidate_name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Candidate Name"
                          />
                          <input
                            type="email"
                            value={editData.candidate_email}
                            onChange={(e) => setEditData({ ...editData, candidate_email: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Email Address"
                          />
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => handleUpdateInterview(selectedInterview.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h2 className="font-bold text-lg text-gray-800">{selectedInterview.candidate_name}</h2>
                          <div className="text-sm text-gray-600 mt-1">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {selectedInterview.candidate_email}
                            </div>
                            <div className="flex items-center mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(selectedInterview.started_at)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {!editMode && (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => startEditInterview(selectedInterview)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Edit Interview"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(`interview-${selectedInterview.id}`)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Interview"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Delete Confirmation */}
                  {deleteConfirm === `interview-${selectedInterview.id}` && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 font-medium mb-3 text-sm">
                        Are you sure you want to delete this interview? This action cannot be undone.
                      </p>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleDeleteInterview(selectedInterview.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Responses Section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <button
                  onClick={() => toggleExpandSection("responses")}
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-200"
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-red-600" />
                    <span className="font-medium">Responses ({selectedInterview.responses.length})</span>
                  </div>
                  {expandedSection.responses ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>

                {expandedSection.responses && (
                  <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    {selectedInterview.responses.length === 0 ? (
                      <div className="text-center py-8">
                        <Info className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No responses recorded</p>
                      </div>
                    ) : (
                      selectedInterview.responses.map((response) => (
                        <div
                          key={response.id}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-gray-800 text-sm">{getQuestionText(response.question)}</h4>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => startEditResponse(response)}
                                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Edit Response"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(`response-${response.id}`)}
                                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                title="Delete Response"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {editMode === `response-${response.id}` ? (
                            <div className="space-y-2">
                              <textarea
                                value={editData.transcript}
                                onChange={(e) => setEditData({ ...editData, transcript: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[100px]"
                                placeholder="Response transcript"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleUpdateResponse(selectedInterview.id, response.id)}
                                  className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Save
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="bg-gray-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="bg-gray-50 p-3 rounded-md mb-3">
                                <p className="text-gray-700 whitespace-pre-wrap text-sm">{response.transcript}</p>
                              </div>

                              <div className="flex flex-wrap items-center justify-between text-xs">
                                <span className="text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {formatDate(response.answered_at)}
                                </span>

                                {response.audio && (
                                  <a
                                    href={response.audio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-red-600 hover:text-red-800 mt-2 sm:mt-0 bg-red-50 px-2 py-1 rounded-md"
                                  >
                                    <Mic className="h-3 w-3 mr-1" />
                                    Listen to Audio
                                  </a>
                                )}
                              </div>

                              {/* Delete Confirmation */}
                              {deleteConfirm === `response-${response.id}` && (
                                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                  <p className="text-red-800 font-medium mb-3 text-sm">
                                    Are you sure you want to delete this response?
                                  </p>
                                  <div className="flex space-x-3">
                                    <button
                                      onClick={() => handleDeleteResponse(selectedInterview.id, response.id)}
                                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                                    >
                                      Yes, Delete
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirm(null)}
                                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-sm"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Profile Section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <button
                  onClick={() => toggleExpandSection("profile")}
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors border-b border-gray-200"
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-red-600" />
                    <span className="font-medium">Candidate Profile</span>
                  </div>
                  {expandedSection.profile ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>

                {expandedSection.profile && (
                  <div className="p-4">
                    {!selectedInterview.profile ? (
                      <div className="text-center py-8">
                        <Info className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No profile information available</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Project Links */}
                        <div>
                          <h4 className="font-medium text-gray-800 mb-3 flex items-center border-b border-gray-200 pb-2 text-sm">
                            <LinkIcon className="h-4 w-4 mr-2 text-red-600" />
                            Project Links
                          </h4>
                          {!selectedInterview.profile.project_links ? (
                            <p className="text-gray-500 italic text-sm">No project links provided</p>
                          ) : (
                            <div className="space-y-2">
                              {parseProjectLinks(selectedInterview.profile.project_links).map((link, index) => (
                                <div
                                  key={index}
                                  className="flex items-center bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-600 hover:text-red-800 hover:underline flex items-center text-sm"
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <span className="break-all">{link}</span>
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Resume */}
                        <div>
                          <h4 className="font-medium text-gray-800 mb-3 flex items-center border-b border-gray-200 pb-2 text-sm">
                            <FileText className="h-4 w-4 mr-2 text-red-600" />
                            Resume
                          </h4>
                          {!selectedInterview.profile.resume ? (
                            <p className="text-gray-500 italic text-sm">No resume uploaded</p>
                          ) : (
                            <div className="flex items-center">
                              <a
                                href={selectedInterview.profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg flex items-center transition-colors text-sm"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download Resume
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Profile Image */}
                        {selectedInterview.profile.profile_image && (
                          <div>
                            <h4 className="font-medium text-gray-800 mb-3 flex items-center border-b border-gray-200 pb-2 text-sm">
                              <User className="h-4 w-4 mr-2 text-red-600" />
                              Profile Image
                            </h4>
                            <div className="flex justify-center">
                              <img
                                src={selectedInterview.profile.profile_image || "/placeholder.svg"}
                                alt={`${selectedInterview.candidate_name}'s profile`}
                                className="max-w-full h-auto rounded-lg border border-gray-200 shadow-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        }
      </main >






    </div >
  )
}
