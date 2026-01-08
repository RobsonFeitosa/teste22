import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { TypeormRoomsRepository } from '@infra/database/typeorm/repositories/typeorm-rooms-repository';
import { TypeormChatsRepository } from '@infra/database/typeorm/repositories/typeorm-chats-repository';
import { CreateChat } from './create-chat';
import { UserNotFound } from '../users/errors/user-not-found';
import { RoomNotFound } from '../rooms/errors/room-not-found';

describe('CreateChat', () => {
    let createChat: CreateChat;
    let usersRepository: jest.Mocked<TypeormUsersRepository>;
    let roomsRepository: jest.Mocked<TypeormRoomsRepository>;
    let chatsRepository: jest.Mocked<TypeormChatsRepository>;

    beforeEach(() => {
        usersRepository = {
            findById: jest.fn(),
        } as any;
        roomsRepository = {
            findById: jest.fn(),
        } as any;
        chatsRepository = {
            create: jest.fn(),
        } as any;
        createChat = new CreateChat(usersRepository, roomsRepository, chatsRepository);
    });

    it('should be able to create a new chat message', async () => {
        usersRepository.findById.mockResolvedValue({ id: 'user-id' } as any);
        roomsRepository.findById.mockResolvedValue({ id: 1 } as any);
        chatsRepository.create.mockResolvedValue(undefined);

        await expect(
            createChat.execute({
                message: 'Hello World',
                user_id: 'user-id',
                room_id: 1,
            }),
        ).resolves.not.toThrow();

        expect(chatsRepository.create).toHaveBeenCalled();
    });

    it('should not be able to create a chat if user does not exist', async () => {
        usersRepository.findById.mockResolvedValue(null);

        await expect(
            createChat.execute({
                message: 'Hello World',
                user_id: 'nonexistent-user',
                room_id: 1,
            }),
        ).rejects.toThrow(UserNotFound);
    });

    it('should not be able to create a chat if room does not exist', async () => {
        usersRepository.findById.mockResolvedValue({ id: 'user-id' } as any);
        roomsRepository.findById.mockResolvedValue(null);

        await expect(
            createChat.execute({
                message: 'Hello World',
                user_id: 'user-id',
                room_id: 999,
            }),
        ).rejects.toThrow(RoomNotFound);
    });
});
