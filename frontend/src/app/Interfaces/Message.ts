
export interface Message{
    messageID: number;
    fromUserID: number;
    fromUsername: string;
    toUserID: number;
    createdAt: number;
    msg: string;
}