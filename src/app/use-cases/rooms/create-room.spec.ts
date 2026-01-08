import { TypeormRoomsRepository } from '@infra/database/typeorm/repositories/typeorm-rooms-repository';
import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { CreateRoom } from './create-room';
import { UserNotFound } from '../users/errors/user-not-found';

describe('CreateRoom', () => {
    let createRoom: CreateRoom;
    let usersRepository: jest.Mocked<TypeormUsersRepository>;
    let roomsRepository: jest.Mocked<TypeormRoomsRepository>;

    beforeEach(() => {
        usersRepository = {
            findById: jest.fn(),
        } as any;
        roomsRepository = {
            create: jest.fn(),
        } as any;
        createRoom = new CreateRoom(usersRepository, roomsRepository);
    });

    it('should be able to create a new room', async () => {
        usersRepository.findById.mockResolvedValue({ id: 'user-id' } as any);
        roomsRepository.create.mockImplementation((room) => Promise.resolve({ ...room, id: 1 }));

        const room = await createRoom.execute({
            name: 'General',
            user_id: 'user-id',
        });

        expect(room).toHaveProperty('id');
        expect(room.name).toBe('General');
        expect(roomsRepository.create).toHaveBeenCalled();
    });

    it('should not be able to create a room if user does not exist', async () => {
        usersRepository.findById.mockResolvedValue(null);

        await expect(
            createRoom.execute({
                name: 'General',
                user_id: 'nonexistent-user',
            }),
        ).rejects.toThrow(UserNotFound);
    });
});
