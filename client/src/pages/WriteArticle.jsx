import React, { useState } from 'react'
import { Edit, Sparkles, Loader2 } from 'lucide-react'
import { useApi, apiEndpoints } from '../utils/api'

export const WriteArticle = () => {
  const { apiCall } = useApi();
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [generatedArticle, setGeneratedArticle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!input.trim()) return;
    
    setIsLoading(true)
    setError('')
    setGeneratedArticle('')
    
    try {
      const response = await apiCall(apiEndpoints.generateArticle, {
        method: 'POST',
        body: JSON.stringify({
          prompt: input,
          length: selectedLength.length
        })
      })
      
      if (response.success) {
        setGeneratedArticle(response.content)
      } else {
        setError(response.message || 'Failed to generate article')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while generating the article')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='h-full overflow-y-auto p-6 flex gap-4 text-slate-700'>
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className='w-[48%] p-4 bg-white rounded-lg border border-gray-200'
      >
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>

        <p className='mt-4 text-sm font-medium'>Article Topic</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='The future of artificial intelligence is...'
          required
        />

        <p className='mt-4 text-sm font-medium'>Article Length</p>
        <div className='mt-3 flex gap-3 flex-wrap'>
          {articleLength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength.text === item.text
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'text-gray-500 border-gray-300'
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? <Loader2 className='w-5 animate-spin' /> : <Edit className='w-5' />}
          {isLoading ? 'Generating...' : 'Generate Article'}
        </button>
      </form>

      {/* Right column */}
      <div className='w-[48%] p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Generated Article</h1>
        </div>

        <div className='flex-1 overflow-y-auto'>
          {error && (
            <div className='p-3 bg-red-50 border border-red-200 rounded-md mb-4'>
              <p className='text-red-600 text-sm'>{error}</p>
            </div>
          )}
          
          {generatedArticle ? (
            <div className='prose prose-sm max-w-none'>
              <div className='whitespace-pre-wrap text-sm leading-relaxed'>
                {generatedArticle}
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center h-full'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <Edit className='w-9 h-9' />
                <p>Enter a topic and click "Generate Article" to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
