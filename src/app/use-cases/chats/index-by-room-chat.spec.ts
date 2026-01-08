import { TypeormChatsRepository } from '@infra/database/typeorm/repositories/typeorm-chats-repository';
import { IndexByRoomChat } from './index-by-room-chat';

describe('IndexByRoomChat', () => {
    let indexByRoomChat: IndexByRoomChat;
    let chatsRepository: jest.Mocked<TypeormChatsRepository>;

    beforeEach(() => {
        chatsRepository = {
            findByRoomId: jest.fn(),
        } as any;
        indexByRoomChat = new IndexByRoomChat(chatsRepository);
    });

    it('should be able to list chats by room id', async () => {
        const chats = [{ id: 1, message: 'Hello' }, { id: 2, message: 'World' }];
        chatsRepository.findByRoomId.mockResolvedValue(chats as any);

        const result = await indexByRoomChat.execute(1);

        expect(result).toEqual(chats);
        expect(chatsRepository.findByRoomId).toHaveBeenCalledWith(1);
    });
});
