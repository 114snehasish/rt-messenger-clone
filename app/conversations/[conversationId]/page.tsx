import getMessages from '@/app/actions/getMessages';
import getConversationById from '@/app/actions/getConversationById';
import { EmptyState } from '@/app/components/EmptyState';
import { Header } from '@/app/conversations/[conversationId]/components/Header';
import { Body } from '@/app/conversations/[conversationId]/components/Body';
import { Form } from '@/app/conversations/[conversationId]/components/Form';

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  if (!conversation)
    return (
      <div className='lg:pl-80 h-full lg:block'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    );
  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <Body />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
