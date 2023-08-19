import { StreamingTextResponse, LangChainStream } from 'ai'
import { OpenAI } from 'langchain'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const { stream, handlers } = LangChainStream()

  const llm = new OpenAI({
    modelName: 'text-davinci-003',
    streaming: true
  })

  llm
    .call(
      `「本文」の後に文章を記述するので、誤字があるかどうか判定してください。
      レスポンスは配列で返し、 [{"誤字1", "誤字1に対する訂正案"}, {"誤字2", "誤字2に対する訂正案"} ...] もしくは、誤字がない場合は空の配列 [] を返してください。本文:
      ${prompt}

      Output:\n`,
      {},
      [handlers]
    )
    .catch(console.error)

  return new StreamingTextResponse(stream)
}
