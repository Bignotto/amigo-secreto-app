import { Text, Flex, Button, Link, Box, Icon } from "@chakra-ui/react";
import { FiAward } from "react-icons/fi";
import { Friend } from "../hooks/IFriend";

interface FriendsListProps {
  friends: Friend[];
  groupName?: string;
}
export function FriendsList({ friends, groupName = "" }: FriendsListProps) {
  return (
    <Flex flexDir="column" mt="3">
      <Text>
        {friends.length} Participantes do grupo {groupName}
      </Text>
      {friends.map((friend, i) => (
        <Flex key={friend.id} bg="gray.700" mt="2" p="1" align="center" pl="3">
          <Text>{friend.name}</Text>
          {!i && <Icon as={FiAward} boxSize="4" mr="1" />}
        </Flex>
      ))}
    </Flex>
  );
}
