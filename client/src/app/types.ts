export interface User {
  id: string;
  nickname: string;
}

export interface Message {
  id: string;
  userId: string;
  timeStamp: number;
  text: string;
  user: User;
}
export interface Messages {
  messages: Message[];
}

export type Mutate = ({ text, id }: { text: string; id?: string }) => void;
export type MutateDelete = ({ id }: { id: string }) => void;

export interface MsgQueryData {
  pages: { messages: Message[] }[];
  pageParams: string[];
}
