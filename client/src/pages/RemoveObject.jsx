import React, { useRef, useState } from 'react'
import {
  Upload,
  Loader2,
  Trash2,
  Eraser,
  Image as ImageIcon,
  Download,
  MousePointerClick
} from 'lucide-react'
import { useApi, apiEndpoints } from '../utils/api'

export const RemoveObject = () => {
  const { apiCall } = useApi();
  const [uploadedFile, setUploadedFile] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedAreas, setSelectedAreas] = useState([]) // stores clicked points

  const imageRef = useRef(null)

  // 📤 Handle image upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(URL.createObjectURL(file))
      setProcessedImage(null)
      setSelectedAreas([])
      setError('')
    }
  }

  // ❌ Remove uploaded file
  const handleRemoveUpload = () => {
    setUploadedFile(null)
    setProcessedImage(null)
    setSelectedAreas([])
    setError('')
  }

  // 🖱️ Select area on click
  const handleImageClick = (e) => {
    if (!uploadedFile) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setSelectedAreas([...selectedAreas, { x, y }])
  }

  // ✨ Object removal using API
  const handleRemoveObject = async () => {
    if (!uploadedFile) {
      setError('Please upload an image first.')
      return
    }
    if (selectedAreas.length === 0) {
      setError('Please select an area on the image to remove.')
      return
    }

    setIsLoading(true)
    setError('')
    setProcessedImage(null)

    try {
      const response = await apiCall(apiEndpoints.removeObject, {
        method: 'POST',
        body: JSON.stringify({
          imageUrl: uploadedFile,
          selectedAreas: selectedAreas
        })
      })
      
      if (response.success) {
        setProcessedImage(response.processedImageUrl)
      } else {
        setError(response.message || 'Failed to remove object')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while processing the image')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6 text-slate-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Eraser className="w-6 text-[#4A7AFF]" />
        <h1 className="text-2xl font-semibold">Remove Object</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Upload & Actions */}
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
              onClick={handleRemoveObject}
              disabled={!uploadedFile || isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg shadow hover:shadow-md transition disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Eraser className="w-5" />}
              {isLoading ? 'Removing...' : 'Remove Object'}
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

          {/* Info */}
          {uploadedFile && !processedImage && (
            <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
              <MousePointerClick className="w-4 text-blue-500" />
              Click on the image preview (right side) to select areas you want to remove.
            </p>
          )}
        </div>

        {/* Right Column - Preview & Result */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center min-h-[400px] relative">
          {isLoading ? (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-sm">Processing your image...</p>
            </div>
          ) : uploadedFile && !processedImage ? (
            <div className="relative w-full flex justify-center">
              <img
                ref={imageRef}
                src={uploadedFile}
                alt="Uploaded Preview"
                onClick={handleImageClick}
                className="max-w-md w-full rounded-md border shadow-sm cursor-crosshair"
              />

              {/* Selected Points */}
              {selectedAreas.map((point, idx) => (
                <span
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: `${point.y}%`,
                    left: `${point.x}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md pointer-events-none"
                ></span>
              ))}
            </div>
          ) : processedImage ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <h3 className="text-sm text-gray-600">Processed Image:</h3>
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
              <p className="text-sm">
                Upload an image and click on the areas you want to remove.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
