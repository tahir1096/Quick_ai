import React, { useState } from 'react'
import { Plus, Search, FileText } from 'lucide-react'

const dummyBlogs = [
  { id: 1, title: 'The Future of AI in Healthcare', date: 'Oct 5, 2025', length: '800 words' },
  { id: 2, title: 'Top 10 JavaScript Tips for Developers', date: 'Oct 4, 2025', length: '1200 words' },
  { id: 3, title: 'Climate Change & Technology Innovations', date: 'Oct 2, 2025', length: '1000 words' },
]

export const BlogTitles = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBlogs = dummyBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-full overflow-y-auto p-6 text-slate-700">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="w-6 text-[#4A7AFF]" />
          Blog Titles
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white rounded-lg shadow hover:opacity-90">
          <Plus className="w-4" />
          New Blog
        </button>
      </div>

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
