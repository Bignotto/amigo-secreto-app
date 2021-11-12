import { Text, Flex, Button, Link, Box, Icon } from "@chakra-ui/react";
import { FiAward, FiXCircle } from "react-icons/fi";
import { Friend } from "../hooks/IFriend";

interface FriendsListProps {
  friends: Friend[];
  groupName?: string;
  isAdmin?: boolean;
  isDrawn?: boolean;
}
export function FriendsList({
  friends,
  groupName = "",
  isAdmin = false,
  isDrawn = false,
}: FriendsListProps) {
  return (
    <Flex flexDir="column" mt="3">
      <Text>
        {friends.length} Participantes do grupo {groupName}
      </Text>
      {friends.map((friend, i) => (
        <Flex
          key={friend.id}
          bg="gray.700"
          mt="2"
          p="1"
          align="center"
          pl="3"
          justify="space-between"
        >
          <Text>{friend.name}</Text>
          {!i && <Icon as={FiAward} boxSize="4" mr="3" />}
          {!!i && isAdmin && (
            <Flex>
              <Button variant="link">
                <Icon as={FiXCircle} boxSize="5" color="red.300" />
              </Button>
            </Flex>
          )}
        </Flex>
      ))}
    </Flex>
  );
}
