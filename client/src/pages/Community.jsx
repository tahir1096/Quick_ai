import React, { useState } from 'react'
import {
  MessageSquare,
  Heart,
  Send,
  Share2,
  ImagePlus,
  Loader2,
  UserCircle2
} from 'lucide-react'

export const Community = () => {
  const [postText, setPostText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isPosting, setIsPosting] = useState(false)

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Sarah Lee',
      avatar: 'https://i.pravatar.cc/100?img=47',
      content: 'Just landed my first remote frontend dev job! 🚀',
      image: '',
      likes: 14,
      comments: 3,
      time: '2h ago'
    },
    {
      id: 2,
      user: 'Mike Ross',
      avatar: 'https://i.pravatar.cc/100?img=12',
      content:
        'Here’s a free tip: Use TailwindCSS with React to boost your workflow. 🔥',
      image:
        'https://images.unsplash.com/photo-1612831455542-b3a0f214c07c?q=80&w=800',
      likes: 22,
      comments: 5,
      time: '5h ago'
    }
  ])

  // 📝 Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imgURL = URL.createObjectURL(file)
      setSelectedImage(imgURL)
    }
  }

  // 🚀 Submit a new post
  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!postText.trim() && !selectedImage) return

    setIsPosting(true)

    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        user: 'You',
        avatar: 'https://i.pravatar.cc/100?img=67',
        content: postText,
        image: selectedImage || '',
        likes: 0,
        comments: 0,
        time: 'Just now'
      }
      setPosts([newPost, ...posts])
      setPostText('')
      setSelectedImage(null)
      setIsPosting(false)
    }, 1500)
  }

  // ❤️ Like a post
  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6 text-slate-700">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-6 text-[#4A7AFF]" />
        <h1 className="text-2xl font-semibold">Community</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Create Post */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-5 shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4">Create a Post</h2>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              rows={3}
              placeholder="Share your thoughts, tips, or updates..."
              className="w-full text-sm border rounded-lg p-3 outline-none focus:border-blue-400 resize-none"
            ></textarea>

            {selectedImage && (
              <div className="relative w-full">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="rounded-lg border max-h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 text-white bg-black/50 rounded-full px-2"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-blue-600">
                <ImagePlus className="w-5" />
                Add Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              <button
                type="submit"
                disabled={isPosting}
                className="flex items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 text-sm rounded-lg shadow hover:shadow-md transition disabled:opacity-60"
              >
                {isPosting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isPosting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column - Feed */}
        <div className="lg:col-span-2 space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-5"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                  {post.avatar ? (
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle2 className="w-10 h-10 text-gray-400" />
                  )}
                  <div>
                    <h3 className="font-semibold text-sm">{post.user}</h3>
                    <p className="text-xs text-gray-400">{post.time}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-sm text-gray-700 mb-3">{post.content}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="rounded-lg border mb-3 max-h-[300px] object-cover"
                  />
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 hover:text-red-500 transition"
                  >
                    <Heart className="w-4" />
                    {post.likes} Likes
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition">
                    <MessageSquare className="w-4" />
                    {post.comments} Comments
                  </button>
                  <button className="flex items-center gap-1 hover:text-green-500 transition">
                    <Share2 className="w-4" />
                    Share
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-40 text-gray-400">
              No posts yet. Be the first to share!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
