import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { ref, onValue, off } from "firebase/database";
import { GroupAmigoSecreto } from "./IGroup";

export function useRoom(groupId: string) {
  const [name, setName] = useState("");
  const [group, setGroup] = useState<GroupAmigoSecreto>(
    {} as GroupAmigoSecreto
  );

  useEffect(() => {
    const groupRef = ref(database, `groups/${groupId}`);

    onValue(groupRef, (group) => {
      const databaseGroup: GroupAmigoSecreto = group.val();
      setGroup(databaseGroup);
    });

    return () => {
      off(groupRef);
    };
  }, [groupId]);

  return { name, group };
}
