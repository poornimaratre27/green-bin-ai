import { useState, useEffect, useRef } from 'react'
import { fetchChatHistory, sendChatMessage } from '../services/chatService'
import useToast from '../hooks/useToast'
import PageLoader from '../components/PageLoader'
import TypingIndicator from '../components/TypingIndicator'
import { ChatIcon, UserIcon } from '../components/icons'

const SUGGESTED_QUESTIONS = ['Is this recyclable?', 'How do I dispose of batteries?', 'Can pizza boxes be recycled?']

const AIChat = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)
  const { showToast } = useToast()

  useEffect(() => {
    fetchChatHistory()
      .then((data) => setMessages(data.messages))
      .catch(() => setError('Failed to load chat history'))
      .finally(() => setLoadingHistory(false))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  const handleSend = async (text) => {
    const content = (text ?? input).trim()
    if (!content || sending) return

    setError('')
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content }])
    setSending(true)

    try {
      const data = await sendChatMessage(content)
      setMessages((prev) => [...prev, { role: 'model', content: data.reply }])
    } catch (err) {
      const message =
        err.response?.data?.message || (err.request ? 'Network error — please try again.' : 'Failed to get a response')
      setError(message)
      showToast(message, 'error')
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSend()
  }

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">AI Sustainability Chat</h1>
        <p className="text-gray-500 dark:text-gray-400">Ask anything about recycling, disposal, and sustainable living.</p>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {loadingHistory ? (
            <PageLoader label="Loading chat..." />
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ChatIcon className="h-10 w-10 text-green-500" />
              <p className="text-gray-500 dark:text-gray-400">Ask me anything about waste and recycling.</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm text-green-700 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <ChatIcon className="h-6 w-6 shrink-0 rounded-full bg-green-100 p-1 text-green-700 dark:bg-green-900/40 dark:text-green-300" />
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'rounded-br-sm bg-green-600 text-white'
                      : 'rounded-bl-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <UserIcon className="h-6 w-6 shrink-0 rounded-full bg-gray-200 p-1 text-gray-600 dark:bg-gray-600 dark:text-gray-200" />
                )}
              </div>
            ))
          )}

          {sending && (
            <div className="flex items-end gap-2">
              <ChatIcon className="h-6 w-6 shrink-0 rounded-full bg-green-100 p-1 text-green-700 dark:bg-green-900/40 dark:text-green-300" />
              <div className="rounded-2xl rounded-bl-sm bg-gray-100 dark:bg-gray-700">
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {error && (
          <p className="mx-4 mb-2 rounded bg-red-100 px-3 py-2 text-sm text-red-700 dark:bg-red-900/40 dark:text-red-300">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-100 p-4 dark:border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about recycling, disposal, or sustainability..."
            className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default AIChat
