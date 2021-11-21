import { Friend } from "./IFriend";

export interface GroupAmigoSecreto {
  name: string;
  owner?: string;
  ownerId?: string;
  date?: string;
  time?: string;
  where?: string;
  value?: string;
  password?: string;
  friends?: Friend[];
  result?: Friend[];
  isDrawn?: boolean;
}
