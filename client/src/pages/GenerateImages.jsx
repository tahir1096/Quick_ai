import React, { useState } from 'react'
import { Image, Sparkles, Loader2, Upload, Trash2 } from 'lucide-react'
import { useApi, apiEndpoints } from '../utils/api'

export const GenerateImages = () => {
  const { apiCall } = useApi();
  const [prompt, setPrompt] = useState('')
  const [generatedImages, setGeneratedImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [style, setStyle] = useState('realistic')

  // 📤 Handle image upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(URL.createObjectURL(file))
      setGeneratedImages([]) // Clear generated images when uploading new file
    }
  }

  // ❌ Remove uploaded file
  const handleRemoveUpload = () => {
    setUploadedFile(null)
  }

  // ✨ Image generation using API
  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.')
      return
    }

    setError('')
    setIsLoading(true)
    setGeneratedImages([])

    try {
      const response = await apiCall(apiEndpoints.generateImages, {
        method: 'POST',
        body: JSON.stringify({
          prompt: prompt,
          style: style,
          count: 2
        })
      })
      
      if (response.success) {
        setGeneratedImages(response.images)
        setUploadedFile(null)
      } else {
        setError(response.message || 'Failed to generate images')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating images')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6 text-slate-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Image className="w-6 text-[#4A7AFF]" />
        <h1 className="text-2xl font-semibold">Generate Images</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Input Form */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Sparkles className="w-5 text-[#4A7AFF]" />
            Enter a Prompt
          </h2>

          {/* Prompt Input */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="E.g., A futuristic city skyline at sunset in watercolor style"
            className="w-full p-3 text-sm rounded-md border border-gray-300 outline-none resize-none focus:ring-2 focus:ring-blue-200"
          ></textarea>

          {/* Style Selection */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full p-2 text-sm rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="realistic">Realistic</option>
              <option value="cartoon">Cartoon</option>
              <option value="watercolor">Watercolor</option>
              <option value="oil-painting">Oil Painting</option>
              <option value="digital-art">Digital Art</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleGenerateImage}
              disabled={isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 rounded-lg text-sm hover:shadow-md transition disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5" />}
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>

            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-pointer hover:shadow-sm border border-gray-300 text-sm">
              <Upload className="w-5" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* Uploaded File */}
          {uploadedFile && (
            <div className="mt-4 flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
              <img
                src={uploadedFile}
                alt="Uploaded"
                className="w-16 h-16 object-cover rounded-md border"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-700 truncate">Image uploaded successfully</p>
              </div>
              <button
                onClick={handleRemoveUpload}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Image Preview */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3 text-gray-400 h-full">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-sm">Generating your images...</p>
            </div>
          ) : generatedImages.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Generated Images</h3>
              <div className="grid grid-cols-1 gap-4">
                {generatedImages.map((image, index) => (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <img
                      src={image.url}
                      alt={`Generated ${index + 1}`}
                      className="w-full rounded-lg shadow-lg"
                    />
                    <button className="px-4 py-2 text-sm bg-[#226BFF] text-white rounded-lg hover:shadow-md">
                      Download Image
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : uploadedFile ? (
            <div className="flex flex-col items-center gap-4">
              <img
                src={uploadedFile}
                alt="Uploaded Preview"
                className="w-full max-w-md rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-500">Uploaded image preview</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 gap-3 h-full">
              <Image className="w-10 h-10" />
              <p className="text-sm text-center">No image to display. Generate or upload an image to see preview here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
