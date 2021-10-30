import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { ref, onValue, off } from "firebase/database";

export function useRoom(groupId: string) {
  const [name, setName] = useState("");

  useEffect(() => {
    const groupRef = ref(database, `groups/${groupId}`);

    onValue(groupRef, (group) => {
      const databaseGroup = group.val();

      setName(databaseGroup.name);
    });

    return () => {
      off(groupRef);
    };
  }, [groupId]);

  return { name, groupId };
}
