'use client'

import React, { useState } from 'react'

function HeadingForm() {
  const [heading, setHeading] = useState({
    title: '',
    body: '',
    image: '',
    children: [],
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const updateField = (field, value) => {
    setHeading(prev => ({ ...prev, [field]: value }))
  }

  const ChildrenInput = ({ children, setChildren }) => {
    const updateChild = (index, field, value) => {
      const newChildren = [...children]
      newChildren[index] = { ...newChildren[index], [field]: value }
      setChildren(newChildren)
    }

    const addChild = () => {
      setChildren([...children, { title: '', body: '', image: '', children: [] }])
    }

    const removeChild = index => {
      const newChildren = children.filter((_, i) => i !== index)
      setChildren(newChildren)
    }

    return (
      <div className="ml-4 mt-4 space-y-4 border-l border-blue-500/30 pl-6">
        {children.map((child, i) => (
          <div
            key={i}
            className="space-y-4 bg-gray-900/40 p-5 rounded-2xl shadow-lg backdrop-blur-md border border-gray-800/30 transition-all duration-300 hover:shadow-xl hover:border-blue-800"
          >
            <input
              type="text"
              placeholder="Child Title"
              value={child.title}
              onChange={e => updateChild(i, 'title', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-950/50 text-gray-100"
              required
            />
            <textarea
              placeholder="Child Body"
              value={child.body}
              onChange={e => updateChild(i, 'body', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-950/50 text-gray-100"
              rows={3}
            />
            <input
              type="text"
              placeholder="Child Image URL"
              value={child.image}
              onChange={e => updateChild(i, 'image', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-gray-950/50 text-gray-100"
            />

            {/* Recursive Children */}
            <ChildrenInput
              children={child.children || []}
              setChildren={newChildren => {
                updateChild(i, 'children', newChildren)
              }}
            />

            <button
              type="button"
              onClick={() => removeChild(i)}
              className="mt-2 px-4 py-2 text-white bg-red-700 rounded hover:bg-red-600"
            >
              Remove Child
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addChild}
          className="mt-3 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
        >
          + Add Child
        </button>
      </div>
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!heading.title.trim()) {
      setError('Title is required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('https://jain-website-backend.vercel.app/api/headings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heading),
      })

      if (!res.ok) throw new Error('Failed to submit')

      setSuccess(true)
      setHeading({ title: '', body: '', image: '', children: [] })
    } catch (err) {
      setError(err.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl shadow-2xl text-white space-y-6 bg-gradient-to-br from-gray-900/95 to-black/50 backdrop-blur-lg border border-gray-800/30"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-300">Create Heading</h2>

      {error && <p className="text-red-400">{error}</p>}
      {success && <p className="text-green-400">Submitted successfully!</p>}

      <input
        type="text"
        placeholder="Title"
        value={heading.title}
        onChange={e => updateField('title', e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-gray-950/50 text-gray-100"
        required
      />
      <textarea
        placeholder="Body"
        value={heading.body}
        onChange={e => updateField('body', e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-gray-950/50 text-gray-100"
        rows={4}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={heading.image}
        onChange={e => updateField('image', e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-gray-950/50 text-gray-100"
      />

      <div>
        <h3 className="text-blue-400 mb-3">Children</h3>
        <ChildrenInput
          children={heading.children}
          setChildren={children => setHeading(prev => ({ ...prev, children }))}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default HeadingForm
