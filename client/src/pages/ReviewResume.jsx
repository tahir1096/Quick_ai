import React, { useState } from 'react'
import {
  Upload,
  FileText,
  Loader2,
  Trash2,
  Download,
  CheckCircle,
  XCircle
} from 'lucide-react'

export const ReviewResume = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // 📤 Handle resume upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileURL = URL.createObjectURL(file)
      setUploadedFile(fileURL)
      setFeedback(null)
      setError('')
      setIsLoading(true)

      // Simulate text extraction
      setTimeout(() => {
        setResumeText(
          `John Doe
Software Engineer | MERN Developer
----------------------------------------
Skills:
- React, Node.js, MongoDB, Tailwind
- REST API, GitHub, Docker
Experience:
- Web Developer at XYZ Company (2022-2024)
Education:
- BSc in Computer Science`
        )
        setIsLoading(false)
      }, 2000)
    }
  }

  // ❌ Remove uploaded resume
  const handleRemoveUpload = () => {
    setUploadedFile(null)
    setResumeText('')
    setFeedback(null)
    setError('')
  }

  // 🔍 Simulate AI review
  const handleReviewResume = () => {
    if (!uploadedFile || !resumeText) {
      setError('Please upload a resume to review.')
      return
    }
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      setFeedback({
        strengths: [
          'Strong technical skills with MERN stack',
          'Relevant work experience',
          'Clear educational background'
        ],
        improvements: [
          'Add more measurable achievements in experience section',
          'Include more keywords for ATS systems',
          'Improve formatting consistency'
        ]
      })
      setIsLoading(false)
    }, 2500)
  }

  return (
    <div className="h-full overflow-y-auto p-6 text-slate-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 text-[#4A7AFF]" />
        <h1 className="text-2xl font-semibold">Review Resume</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Upload & Actions */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 text-[#4A7AFF]" />
            Upload Your Resume
          </h2>

          {/* Upload Section */}
          <label className="flex flex-col items-center justify-center gap-3 w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-300">
            <FileText className="w-10 h-10 text-gray-400" />
            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleReviewResume}
              disabled={!uploadedFile || isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg shadow hover:shadow-md transition disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5" />}
              {isLoading ? 'Reviewing...' : 'Review Resume'}
            </button>

            {uploadedFile && (
              <button
                onClick={handleRemoveUpload}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Trash2 className="w-5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Preview & Feedback */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-sm">Analyzing your resume...</p>
            </div>
          ) : uploadedFile && !feedback ? (
            <div>
              <h3 className="text-lg font-semibold mb-3">Extracted Resume Text:</h3>
              <pre className="bg-gray-50 text-xs p-3 rounded-lg border max-h-[350px] overflow-y-auto">
                {resumeText}
              </pre>
            </div>
          ) : feedback ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle className="w-5" />
                Strengths
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {feedback.strengths.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold text-red-500 flex items-center gap-2 mt-4">
                <XCircle className="w-5" />
                Areas for Improvement
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {feedback.improvements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <button className="mt-6 px-4 py-2 text-sm bg-[#226BFF] text-white rounded-lg hover:shadow-md flex items-center gap-2">
                <Download className="w-4" />
                Download Reviewed Resume
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 gap-3 h-full">
              <FileText className="w-10 h-10" />
              <p className="text-sm">
                Upload your resume to get detailed feedback and suggestions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
