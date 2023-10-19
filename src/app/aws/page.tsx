'use client'

import { useChat } from 'ai/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch h-screen">
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="fixed bottom-0 mb-8 flex">
        <label>
          AIへの質問を入力してください
          <input
            className="w-full px-2 border border-gray-300 rounded shadow-xl caret-black"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="mt-auto mx-2 px-3 text-white bg-gray-800 border rounded">Send</button>
      </form>
    </div>
  )
}
