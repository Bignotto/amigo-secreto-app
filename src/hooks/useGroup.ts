import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { ref, onValue, off, set } from "firebase/database";
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

  async function removeFriend(friendId: string) {
    console.log("remove friend function", friendId);

    const newFriendsList = friends.filter((f) => f.id !== friendId);

    //TODO: fix multiple requests to firebase
    await set(ref(database, `groups/${groupId}`), {
      ...group,
      friends: newFriendsList,
    });
    await set(ref(database, `users/${friendId}`), null);
  }

  return { group, friends, result, removeFriend };
}
