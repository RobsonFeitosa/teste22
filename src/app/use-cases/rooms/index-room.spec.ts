import { TypeormRoomsRepository } from '@infra/database/typeorm/repositories/typeorm-rooms-repository';
import { IndexRoom } from './index-room';

describe('IndexRoom', () => {
    let indexRoom: IndexRoom;
    let roomsRepository: jest.Mocked<TypeormRoomsRepository>;

    beforeEach(() => {
        roomsRepository = {
            findAll: jest.fn(),
        } as any;
        indexRoom = new IndexRoom(roomsRepository);
    });

    it('should be able to list all rooms', async () => {
        const rooms = [{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }];
        roomsRepository.findAll.mockResolvedValue(rooms as any);

        const result = await indexRoom.execute();

        expect(result).toEqual(rooms);
        expect(roomsRepository.findAll).toHaveBeenCalled();
    });
});
