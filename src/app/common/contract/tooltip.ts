import { MessageType } from '../enum/message-type';

export class Tooltip<T>
{
    public PK: T;
    public PropertyName: string;
    public Message: string;
    public MessageType: MessageType;
}