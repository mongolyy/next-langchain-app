'use client'

import { useCompletion } from 'ai/react'

export default function Chat() {
  const { completion, input, handleInputChange, handleSubmit } = useCompletion()

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch h-screen">
      {completion}

      <form onSubmit={handleSubmit} className="fixed bottom-0 mb-8 flex">
        <label>
          校正したい文章を入力してください
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
