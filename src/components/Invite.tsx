import { Text, Flex, Button, Link, Box } from "@chakra-ui/react";

interface InviteProps {
  code: string;
}

export function Invite({ code }: InviteProps) {
  return (
    <Flex
      w={["95vw", "50vw"]}
      mt="3"
      mb="3"
      borderRadius="8"
      bg="white"
      justify="center"
    >
      <Flex justify="center" flexDir="column">
        <Flex mt="3" justify="center">
          <Text
            fontFamily="Roboto"
            color="black"
            fontWeight="bold"
            fontSize="20px"
          >
            Código do Convite:
          </Text>
        </Flex>
        <Flex justify="center">
          <Text
            fontFamily="Roboto Mono"
            fontSize="52"
            color="black"
            fontWeight="bold"
          >
            {code}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
