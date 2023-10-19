import { ChatBedrock } from 'langchain/chat_models/bedrock'
import { AmazonKendraRetriever } from 'langchain/retrievers/amazon_kendra'
import { RunnablePassthrough, RunnableSequence } from 'langchain/dist/schema/runnable'
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from 'langchain/prompts'
import { StringOutputParser } from 'langchain/dist/schema/output_parser'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const SYSTEM_TEMPLATE = `"context:"に続く文章を元に、最後の質問に答えなさい。
答えがわからない場合は、答えを作ろうとせず、わからないと答えてください。
----------------
context:{context}`;
  const msg = [
    SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
    HumanMessagePromptTemplate.fromTemplate("{question}"),
  ];
  const prompt = ChatPromptTemplate.fromMessages(msg);

  const model = new ChatBedrock({
    model: 'anthropic.claude-instant-v1',
  })

  const chain = RunnableSequence.from([
    {
      context: new AmazonKendraRetriever({
        topK: 10,
        indexId: process.env.KENDRA_INDEX_ID ?? '',
        region: 'ap-northeast-1',
      }),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  return await chain.invoke(messages)
}
