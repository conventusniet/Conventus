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
            setInterviews(interviews.map((interview) => (interview.id === id ? { ...interview, ...updatedData } : interview)))

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
            setInterviews(
                interviews.map((interview) => {
                    if (interview.id === interviewId) {
                        return {
                            ...interview,
                            responses: interview.responses.filter((resp) => resp.id !== responseId),
                        }
                    }
                    return interview
                }),
            )

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
            setInterviews(
                interviews.map((interview) => {
                    if (interview.id === interviewId) {
                        return {
                            ...interview,
                            responses: interview.responses.map((resp) =>
                                resp.id === responseId ? { ...resp, ...updatedData } : resp,
                            ),
                        }
                    }
                    return interview
                }),
            )

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold mb-4 md:mb-0">Interview Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search candidates..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-64"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => fetchInterviews()}
                                className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                            >
                                Refresh Data
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Error Message */}
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
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-3 text-lg text-gray-700">Loading data...</span>
                    </div>
                )}

                {/* Interviews Table */}
                {!loading && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-800">Interviews ({filteredInterviews.length})</h2>
                            <p className="text-gray-600 mt-1">Manage all candidate interviews</p>
                        </div>

                        {/* Sort Controls */}
                        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2">
                            <span className="text-gray-700 font-medium">Sort by:</span>
                            <button
                                onClick={() => handleSort("started_at")}
                                className={`px-3 py-1 rounded-md flex items-center ${sortConfig.key === "started_at" ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                Date
                                {sortConfig.key === "started_at" &&
                                    (sortConfig.direction === "asc" ? (
                                        <ChevronUp className="ml-1 h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    ))}
                            </button>
                            <button
                                onClick={() => handleSort("candidate_name")}
                                className={`px-3 py-1 rounded-md flex items-center ${sortConfig.key === "candidate_name" ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                Name
                                {sortConfig.key === "candidate_name" &&
                                    (sortConfig.direction === "asc" ? (
                                        <ChevronUp className="ml-1 h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    ))}
                            </button>
                            <button
                                onClick={() => handleSort("responses")}
                                className={`px-3 py-1 rounded-md flex items-center ${sortConfig.key === "responses" ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                Responses
                                {sortConfig.key === "responses" &&
                                    (sortConfig.direction === "asc" ? (
                                        <ChevronUp className="ml-1 h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    ))}
                            </button>
                        </div>

                        {/* No Results */}
                        {filteredInterviews.length === 0 && (
                            <div className="p-8 text-center">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-1">No interviews found</h3>
                                <p className="text-gray-600">
                                    {searchTerm ? "Try adjusting your search terms" : "No interviews have been recorded yet"}
                                </p>
                            </div>
                        )}

                        {/* Interviews List */}
                        <div className="divide-y divide-gray-200">
                            {filteredInterviews.map((interview) => (
                                <div key={interview.id} className="transition-all duration-200 hover:bg-gray-50">
                                    {/* Interview Header */}
                                    <div
                                        className={`p-6 cursor-pointer ${expandedInterview === interview.id ? "bg-gray-50" : ""}`}
                                        onClick={() => toggleExpandInterview(interview.id)}
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className="bg-red-100 text-red-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                                    <User className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    {editMode === `interview-${interview.id}` ? (
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
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleUpdateInterview(interview.id)
                                                                    }}
                                                                    className="bg-green-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
                                                                >
                                                                    <Check className="h-4 w-4 mr-1" />
                                                                    Save
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        cancelEdit()
                                                                    }}
                                                                    className="bg-gray-600 text-white px-3 py-1 rounded-md flex items-center text-sm"
                                                                >
                                                                    <X className="h-4 w-4 mr-1" />
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <h3 className="font-bold text-lg text-gray-800">{interview.candidate_name}</h3>
                                                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
                                                                <span className="flex items-center">
                                                                    <Mail className="h-4 w-4 mr-1" />
                                                                    {interview.candidate_email}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <Calendar className="h-4 w-4 mr-1" />
                                                                    {formatDate(interview.started_at)}
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-4 md:mt-0 space-x-2">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${interview.responses.length > 0
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                >
                                                    {interview.responses.length > 0 ? "Completed" : "Incomplete"}
                                                </span>
                                                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    {interview.responses.length} Responses
                                                </span>
                                                {!editMode && (
                                                    <div className="flex space-x-1 ml-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                startEditInterview(interview)
                                                            }}
                                                            className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                            title="Edit Interview"
                                                        >
                                                            <Edit className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setDeleteConfirm(`interview-${interview.id}`)
                                                            }}
                                                            className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                            title="Delete Interview"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                )}
                                                <button
                                                    className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                    title={expandedInterview === interview.id ? "Collapse" : "Expand"}
                                                >
                                                    {expandedInterview === interview.id ? (
                                                        <ChevronUp className="h-5 w-5" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Delete Confirmation */}
                                        {deleteConfirm === `interview-${interview.id}` && (
                                            <div
                                                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <p className="text-red-800 font-medium mb-3">
                                                    Are you sure you want to delete this interview? This action cannot be undone.
                                                </p>
                                                <div className="flex space-x-3">
                                                    <button
                                                        onClick={() => handleDeleteInterview(interview.id)}
                                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                                                    >
                                                        Yes, Delete
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirm(null)}
                                                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Expanded Interview Details */}
                                    {expandedInterview === interview.id && (
                                        <div className="px-6 pb-6 pt-2">
                                            {/* Responses Section */}
                                            <div className="mb-6">
                                                <button
                                                    onClick={() => toggleExpandSection("responses")}
                                                    className="flex items-center justify-between w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mb-2"
                                                >
                                                    <div className="flex items-center">
                                                        <MessageSquare className="h-5 w-5 mr-2 text-red-600" />
                                                        <span className="font-medium">Responses ({interview.responses.length})</span>
                                                    </div>
                                                    {expandedSection.responses ? (
                                                        <ChevronUp className="h-5 w-5" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5" />
                                                    )}
                                                </button>

                                                {expandedSection.responses && (
                                                    <div className="mt-4 space-y-4">
                                                        {interview.responses.length === 0 ? (
                                                            <p className="text-gray-500 italic text-center py-4">No responses recorded</p>
                                                        ) : (
                                                            interview.responses.map((response) => (
                                                                <div
                                                                    key={response.id}
                                                                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                                                                >
                                                                    <div className="flex justify-between items-start mb-3">
                                                                        <h4 className="font-medium text-gray-800">{getQuestionText(response.question)}</h4>
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
                                                                                    onClick={() => handleUpdateResponse(interview.id, response.id)}
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
                                                                            <p className="text-gray-700 whitespace-pre-wrap mb-3">{response.transcript}</p>

                                                                            <div className="flex flex-wrap items-center justify-between text-sm">
                                                                                <span className="text-gray-500 flex items-center">
                                                                                    <Calendar className="h-4 w-4 mr-1" />
                                                                                    {formatDate(response.answered_at)}
                                                                                </span>

                                                                                {response.audio && (
                                                                                    <a
                                                                                        href={response.audio}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="flex items-center text-red-600 hover:text-red-800 mt-2 sm:mt-0"
                                                                                    >
                                                                                        <Mic className="h-4 w-4 mr-1" />
                                                                                        Listen to Audio
                                                                                    </a>
                                                                                )}
                                                                            </div>

                                                                            {/* Delete Confirmation */}
                                                                            {deleteConfirm === `response-${response.id}` && (
                                                                                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                                                                    <p className="text-red-800 font-medium mb-3">
                                                                                        Are you sure you want to delete this response?
                                                                                    </p>
                                                                                    <div className="flex space-x-3">
                                                                                        <button
                                                                                            onClick={() => handleDeleteResponse(interview.id, response.id)}
                                                                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                                                                                        >
                                                                                            Yes, Delete
                                                                                        </button>
                                                                                        <button
                                                                                            onClick={() => setDeleteConfirm(null)}
                                                                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
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
                                            <div>
                                                <button
                                                    onClick={() => toggleExpandSection("profile")}
                                                    className="flex items-center justify-between w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mb-2"
                                                >
                                                    <div className="flex items-center">
                                                        <User className="h-5 w-5 mr-2 text-red-600" />
                                                        <span className="font-medium">Candidate Profile</span>
                                                    </div>
                                                    {expandedSection.profile ? (
                                                        <ChevronUp className="h-5 w-5" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5" />
                                                    )}
                                                </button>

                                                {expandedSection.profile && (
                                                    <div className="mt-4">
                                                        {!interview.profile ? (
                                                            <p className="text-gray-500 italic text-center py-4">No profile information available</p>
                                                        ) : (
                                                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                                                {/* Project Links */}
                                                                <div className="mb-6">
                                                                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                                                        <LinkIcon className="h-5 w-5 mr-2 text-red-600" />
                                                                        Project Links
                                                                    </h4>
                                                                    {!interview.profile.project_links ? (
                                                                        <p className="text-gray-500 italic">No project links provided</p>
                                                                    ) : (
                                                                        <div className="space-y-2">
                                                                            {interview.profile.project_links.split(",").map((link, index) => (
                                                                                <div key={index} className="flex items-center">
                                                                                    <a
                                                                                        href={link.trim()}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="text-red-600 hover:text-red-800 hover:underline flex items-center"
                                                                                    >
                                                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                                                        {link.trim()}
                                                                                    </a>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Resume */}
                                                                <div className="mb-6">
                                                                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                                                                        <FileText className="h-5 w-5 mr-2 text-red-600" />
                                                                        Resume
                                                                    </h4>
                                                                    {!interview.profile.resume ? (
                                                                        <p className="text-gray-500 italic">No resume uploaded</p>
                                                                    ) : (
                                                                        <div className="flex items-center">
                                                                            <a
                                                                                href={interview.profile.resume}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg flex items-center transition-colors"
                                                                            >
                                                                                <Download className="h-5 w-5 mr-2" />
                                                                                Download Resume
                                                                            </a>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Profile Image */}
                                                                {interview.profile.profile_image && (
                                                                    <div>
                                                                        <h4 className="font-medium text-gray-800 mb-3">Profile Image</h4>
                                                                        <div className="flex justify-center">
                                                                            <img
                                                                                src={interview.profile.profile_image || "/placeholder.svg"}
                                                                                alt={`${interview.candidate_name}'s profile`}
                                                                                className="max-w-xs rounded-lg border border-gray-200 shadow-sm"
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
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>



        </div>
    )
}
