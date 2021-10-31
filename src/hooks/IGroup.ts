import { Friend } from "./IFriend";

export interface GroupAmigoSecreto {
  name: string;
  owner?: string;
  ownerId?: string;
  date?: string;
  where?: string;
  value?: string;
  password?: string;
  friends?: Friend[];
}
