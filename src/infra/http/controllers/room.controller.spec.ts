import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { CreateRoom } from '@app/use-cases/rooms/create-room';
import { IndexRoom } from '@app/use-cases/rooms/index-room';
import { AuthGuard } from '@app/guards/local-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('RoomController', () => {
    let roomController: RoomController;
    let createRoom: CreateRoom;
    let indexRoom: IndexRoom;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoomController],
            providers: [
                {
                    provide: CreateRoom,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: IndexRoom,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
            ],
        })
            .overrideGuard(AuthGuard)
            .useValue({
                canActivate: (context: ExecutionContext) => true,
            })
            .compile();

        roomController = module.get<RoomController>(RoomController);
        createRoom = module.get<CreateRoom>(CreateRoom);
        indexRoom = module.get<IndexRoom>(IndexRoom);
    });

    it('should be defined', () => {
        expect(roomController).toBeDefined();
    });

    describe('create', () => {
        it('should call createRoom.execute with correct parameters', async () => {
            const body = { name: 'New Room' };
            const req = { user: { sub: 'user-id' } };
            const expectedResponse = { id: 1, name: 'New Room' };

            jest.spyOn(createRoom, 'execute').mockResolvedValue(expectedResponse as any);

            const result = await roomController.create(body, req);

            expect(createRoom.execute).toHaveBeenCalledWith({
                name: body.name,
                user_id: req.user.sub,
            });
            expect(result).toEqual(expectedResponse);
        });
    });

    describe('getAll', () => {
        it('should call indexRoom.execute and return all rooms', async () => {
            const rooms = [{ id: 1, name: 'Room 1' }];
            jest.spyOn(indexRoom, 'execute').mockResolvedValue(rooms as any);

            const result = await roomController.getAll();

            expect(indexRoom.execute).toHaveBeenCalled();
            expect(result).toEqual(rooms);
        });
    });
});
