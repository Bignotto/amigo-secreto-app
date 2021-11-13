import { Text, Flex, Button, Link, Box, Icon } from "@chakra-ui/react";
import { FormEvent } from "react";
import { FiAward, FiXCircle } from "react-icons/fi";
import { Friend } from "../hooks/IFriend";
import { useRoom } from "../hooks/useGroup";

interface FriendsListProps {
  friends: Friend[];
  groupId?: string;
  isAdmin?: boolean;
  isDrawn?: boolean;
}

export function FriendsList({
  friends,
  groupId = "",
  isAdmin = false,
  isDrawn = false,
}: FriendsListProps) {
  const { group, removeFriend } = useRoom(groupId);

  const handleRemoveFriend = async (friendId: string, e: FormEvent) => {
    e.preventDefault();
    await removeFriend(friendId);
  };

  return (
    <Flex flexDir="column" mt="3">
      <Text>
        {friends.length} Participantes do grupo {group.name}
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
              <Button
                variant="link"
                onClick={(e) => handleRemoveFriend(friend.id, e)}
              >
                <Icon as={FiXCircle} boxSize="5" color="red.300" />
              </Button>
            </Flex>
          )}
        </Flex>
      ))}
    </Flex>
  );
}
