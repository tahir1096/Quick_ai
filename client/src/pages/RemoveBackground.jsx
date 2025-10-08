import React, { useState } from 'react'
import { Upload, Loader2, Trash2, Scissors, Image as ImageIcon, Download } from 'lucide-react'

export const RemoveBackground = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // 📤 Handle image upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(URL.createObjectURL(file))
      setProcessedImage(null)
      setError('')
    }
  }

  // ❌ Remove uploaded file
  const handleRemoveUpload = () => {
    setUploadedFile(null)
    setProcessedImage(null)
    setError('')
  }

  // ✨ Simulated background removal
  const handleRemoveBackground = async () => {
    if (!uploadedFile) {
      setError('Please upload an image first.')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulate API delay (Replace this with your actual API call)
    setTimeout(() => {
      // Using placeholder transparent image as processed result
      setProcessedImage('https://via.placeholder.com/600x400.png?text=Background+Removed')
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="h-full overflow-y-auto p-6 text-slate-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Scissors className="w-6 text-[#4A7AFF]" />
        <h1 className="text-2xl font-semibold">Remove Background</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Upload & Action */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 text-[#4A7AFF]" />
            Upload Your Image
          </h2>

          {/* Upload Section */}
          <label className="flex flex-col items-center justify-center gap-3 w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-300">
            <ImageIcon className="w-10 h-10 text-gray-400" />
            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleRemoveBackground}
              disabled={!uploadedFile || isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg shadow hover:shadow-md transition disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Scissors className="w-5" />}
              {isLoading ? 'Removing...' : 'Remove Background'}
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

          {/* Uploaded Preview */}
          {uploadedFile && !processedImage && (
            <div className="mt-4">
              <h3 className="text-sm text-gray-600 mb-2">Uploaded Image:</h3>
              <img
                src={uploadedFile}
                alt="Uploaded Preview"
                className="w-full max-w-md rounded-md border shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Right Column - Result */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-sm">Processing your image...</p>
            </div>
          ) : processedImage ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <h3 className="text-sm text-gray-600">Background Removed Image:</h3>
              <img
                src={processedImage}
                alt="Processed Result"
                className="w-full max-w-md rounded-md border shadow-lg"
              />
              <button className="px-4 py-2 text-sm bg-[#226BFF] text-white rounded-lg hover:shadow-md flex items-center gap-2">
                <Download className="w-4" />
                Download Image
              </button>
            </div>
          ) : (
            <div className="text-gray-400 flex flex-col items-center gap-3">
              <ImageIcon className="w-10 h-10" />
              <p className="text-sm">Upload an image and click "Remove Background" to see the result here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
