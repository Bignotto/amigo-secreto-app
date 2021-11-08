import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { ref, onValue, off } from "firebase/database";
import { GroupAmigoSecreto } from "./IGroup";
import { Friend } from "./IFriend";

export function useRoom(groupId: string) {
  const [group, setGroup] = useState<GroupAmigoSecreto>(
    {} as GroupAmigoSecreto
  );
  const [friends, setFriends] = useState<Friend[]>([]);
  const [result, setResult] = useState<Friend[]>([]);

  useEffect(() => {
    if (groupId === "AAAAAA") return () => {};

    const groupRef = ref(database, `groups/${groupId}`);

    onValue(groupRef, (group) => {
      const databaseGroup: GroupAmigoSecreto = group.val();

      setGroup(databaseGroup);
      setFriends(databaseGroup.friends || []);
      setResult(databaseGroup.result || []);
    });

    return () => {
      console.log("off database groupref");
      off(groupRef);
    };
  }, [groupId]);

  return { group, friends, result };
}
