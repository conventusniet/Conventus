"use client"

import { useState, useEffect } from "react"

export default function QuestionManagementPage() {
    const [questions, setQuestions] = useState([])
    const [newQuestion, setNewQuestion] = useState({ text: "", order: 0 })
    const [editingQuestion, setEditingQuestion] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // Fetch all questions
    const fetchQuestions = async () => {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:8000/api/questions/")
            if (!response.ok) throw new Error("Failed to fetch questions")
            const data = await response.json()
            setQuestions(data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching questions:", error)
            setError("Failed to load questions. Please try again.")
            setLoading(false)
        }
    }

    // Load questions on component mount
    useEffect(() => {
        fetchQuestions()
    }, [])

    // Add a new question
    const addQuestion = async (e) => {
        e.preventDefault()
        if (!newQuestion.text.trim()) {
            setError("Question text cannot be empty")
            return
        }

        try {
            setLoading(true)
            const response = await fetch("http://localhost:8000/api/questions/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: newQuestion.text,
                    order: newQuestion.order,
                }),
            })

            if (!response.ok) throw new Error("Failed to add question")

            setNewQuestion({ text: "", order: questions.length + 1 })
            setSuccess("Question added successfully!")
            fetchQuestions()
        } catch (error) {
            console.error("Error adding question:", error)
            setError("Failed to add question. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // Update an existing question
    const updateQuestion = async (e) => {
        e.preventDefault()
        if (!editingQuestion || !editingQuestion.text.trim()) {
            setError("Question text cannot be empty")
            return
        }

        try {
            setLoading(true)
            const response = await fetch(`http://localhost:8000/api/questions/${editingQuestion.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: editingQuestion.text,
                    order: editingQuestion.order,
                }),
            })

            if (!response.ok) throw new Error("Failed to update question")

            setEditingQuestion(null)
            setSuccess("Question updated successfully!")
            fetchQuestions()
        } catch (error) {
            console.error("Error updating question:", error)
            setError("Failed to update question. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // Delete a question
    const deleteQuestion = async (id) => {
        if (!window.confirm("Are you sure you want to delete this question?")) {
            return
        }

        try {
            setLoading(true)
            const response = await fetch(`http://localhost:8000/api/questions/${id}/`, {
                method: "DELETE",
            })

            if (!response.ok) throw new Error("Failed to delete question")

            setSuccess("Question deleted successfully!")
            fetchQuestions()
        } catch (error) {
            console.error("Error deleting question:", error)
            setError("Failed to delete question. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    // Start editing a question
    const startEditing = (question) => {
        setEditingQuestion({ ...question })
    }

    // Cancel editing
    const cancelEditing = () => {
        setEditingQuestion(null)
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">Interview Question Management</h1>

            {/* Success and Error Messages */}
            {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 flex justify-between items-center">
                    <p className="text-green-700">{success}</p>
                    <button onClick={() => setSuccess("")} className="text-green-700 font-bold">
                        Dismiss
                    </button>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 flex justify-between items-center">
                    <p className="text-red-700">{error}</p>
                    <button onClick={() => setError("")} className="text-red-700 font-bold">
                        Dismiss
                    </button>
                </div>
            )}

            {/* Add New Question Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Add New Question</h2>
                <form onSubmit={addQuestion}>
                    <div className="mb-4">
                        <label htmlFor="questionText" className="block font-medium text-gray-700 mb-2">
                            Question Text
                        </label>
                        <textarea
                            id="questionText"
                            value={newQuestion.text}
                            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-md text-base min-h-[100px] resize-y"
                            placeholder="Enter your interview question here..."
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="questionOrder" className="block font-medium text-gray-700 mb-2">
                            Display Order
                        </label>
                        <input
                            type="number"
                            id="questionOrder"
                            value={newQuestion.order}
                            onChange={(e) => setNewQuestion({ ...newQuestion, order: Number.parseInt(e.target.value) })}
                            className="w-full p-3 border border-gray-300 rounded-md text-base"
                            min="0"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Question"}
                    </button>
                </form>
            </div>

            {/* Edit Question Form */}
            {editingQuestion && (
                <div className="bg-yellow-50 p-6 rounded-lg mb-8 border border-yellow-200">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">Edit Question</h2>
                    <form onSubmit={updateQuestion}>
                        <div className="mb-4">
                            <label htmlFor="editQuestionText" className="block font-medium text-gray-700 mb-2">
                                Question Text
                            </label>
                            <textarea
                                id="editQuestionText"
                                value={editingQuestion.text}
                                onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-md text-base min-h-[100px] resize-y"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="editQuestionOrder" className="block font-medium text-gray-700 mb-2">
                                Display Order
                            </label>
                            <input
                                type="number"
                                id="editQuestionOrder"
                                value={editingQuestion.order}
                                onChange={(e) => setEditingQuestion({ ...editingQuestion, order: Number.parseInt(e.target.value) })}
                                className="w-full p-3 border border-gray-300 rounded-md text-base"
                                min="0"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                type="button"
                                onClick={cancelEditing}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Questions List */}
            <div>
                <h2 className="text-xl font-semibold text-red-600 mb-4">Current Questions</h2>
                {loading && !questions.length ? (
                    <p className="text-center py-4">Loading questions...</p>
                ) : questions.length === 0 ? (
                    <p className="text-center py-4 bg-gray-50 rounded-lg">No questions found. Add your first question above.</p>
                ) : (
                    <div className="space-y-4">
                        {questions
                            .sort((a, b) => a.order - b.order)
                            .map((question) => (
                                <div key={question.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Question {question.order}</p>
                                            <p className="text-lg">{question.text}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => startEditing(question)}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteQuestion(question.id)}
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}
