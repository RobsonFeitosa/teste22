import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { CreateChat } from '@app/use-cases/chats/create-chat';
import { IndexByRoomChat } from '@app/use-cases/chats/index-by-room-chat';
import { AuthGuard } from '@app/guards/local-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('ChatController', () => {
    let chatController: ChatController;
    let createChat: CreateChat;
    let indexByRoomChat: IndexByRoomChat;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChatController],
            providers: [
                {
                    provide: CreateChat,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: IndexByRoomChat,
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

        chatController = module.get<ChatController>(ChatController);
        createChat = module.get<CreateChat>(CreateChat);
        indexByRoomChat = module.get<IndexByRoomChat>(IndexByRoomChat);
    });

    it('should be defined', () => {
        expect(chatController).toBeDefined();
    });

    describe('create', () => {
        it('should call createChat.execute with correct parameters', async () => {
            const body = { message: 'Hello', room_id: 1 };
            const req = { user: { sub: 'user-id' } };

            jest.spyOn(createChat, 'execute').mockResolvedValue(undefined);

            await chatController.create(body, req);

            expect(createChat.execute).toHaveBeenCalledWith({
                message: body.message,
                room_id: body.room_id,
                user_id: req.user.sub,
            });
        });
    });

    describe('getAllByRoomId', () => {
        it('should call indexByRoomChat.execute and return chats for room', async () => {
            const roomId = 1;
            const chats = [{ id: 1, message: 'Hello' }];
            jest.spyOn(indexByRoomChat, 'execute').mockResolvedValue(chats as any);

            const result = await chatController.getAllByRoomId(roomId);

            expect(indexByRoomChat.execute).toHaveBeenCalledWith(roomId);
            expect(result).toEqual(chats);
        });
    });
});
