import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { ref, onValue, off } from "firebase/database";

type Friend = {
  id: string;
  name: string;
  size?: number;
  shoeSize?: number;
  like?: string;
  dontLike?: string;
};

type GroupAmigoSecreto = {
  name: string;
  owner?: string;
  ownerId?: string;
  friends?: Friend[];
};

export function useRoom(groupId: string) {
  const [name, setName] = useState("");

  useEffect(() => {
    const groupRef = ref(database, `groups/${groupId}`);

    onValue(groupRef, (group) => {
      const databaseGroup: GroupAmigoSecreto = group.val();
      setName(databaseGroup.name);
    });

    return () => {
      off(groupRef);
    };
  }, [groupId]);

  return { name, groupId };
}
