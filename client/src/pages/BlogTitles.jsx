import React, { useState } from 'react'
import { Plus, Search, FileText, Loader2, Hash } from 'lucide-react'
import { useApi, apiEndpoints } from '../utils/api'

const dummyBlogs = [
  { id: 1, title: 'The Future of AI in Healthcare', date: 'Oct 5, 2025', length: '800 words' },
  { id: 2, title: 'Top 10 JavaScript Tips for Developers', date: 'Oct 4, 2025', length: '1200 words' },
  { id: 3, title: 'Climate Change & Technology Innovations', date: 'Oct 2, 2025', length: '1000 words' },
]

export const BlogTitles = () => {
  const { apiCall } = useApi();
  const [searchTerm, setSearchTerm] = useState('')
  const [input, setInput] = useState('')
  const [generatedTitles, setGeneratedTitles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showGenerator, setShowGenerator] = useState(false)

  const filteredBlogs = generatedTitles.length > 0 ? generatedTitles.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : dummyBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const generateTitles = async (e) => {
    e.preventDefault()
    if (!input.trim()) return;
    
    setIsLoading(true)
    setError('')
    
    try {
      const response = await apiCall(apiEndpoints.generateBlogTitles, {
        method: 'POST',
        body: JSON.stringify({
          prompt: input,
          count: 5
        })
      })
      
      if (response.success) {
        const titles = response.titles.map((title, index) => ({
          id: Date.now() + index,
          title: title.trim(),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          length: 'Generated'
        }))
        setGeneratedTitles(titles)
        setInput('')
      } else {
        setError(response.message || 'Failed to generate titles')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating titles')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6 text-slate-700">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 text-[#4A7AFF]" />
          Blog Titles
        </h1>
        <button 
          onClick={() => setShowGenerator(!showGenerator)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg shadow hover:opacity-90"
        >
          <Hash className="w-4" />
          Generate Titles
        </button>
      </div>

      {/* Generator Form */}
      {showGenerator && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Hash className="w-5 text-[#4A7AFF]" />
            Generate Blog Titles
          </h3>
          <form onSubmit={generateTitles} className="flex gap-3">
            <input
              type="text"
              placeholder="Enter your blog topic or niche..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 text-sm"
              required
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-4 animate-spin" /> : <Hash className="w-4" />}
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </form>
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-6 max-w-sm">
        <input
          type="text"
          placeholder="Search blog titles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 text-sm"
        />
        <Search className="w-5 absolute top-2.5 left-3 text-gray-400" />
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
            >
              <h2 className="text-base font-semibold text-gray-700 line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-xs text-gray-400 mt-2">{blog.date}</p>
              <p className="text-xs text-gray-500">{blog.length}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 text-sm">
            No blogs found
          </p>
        )}
      </div>
    </div>
  )
}
