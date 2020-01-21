import { Message } from './Message';
import { User } from './User';

export interface UserMessage{
    user: User;
    message: Message;
}