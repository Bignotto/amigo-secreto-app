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
        <Text fontFamily="Roboto" color="black" fontWeight="bold">
          Código do Convite:
        </Text>
        <Text fontFamily="Roboto Mono" fontSize="52" color="black">
          {code}
        </Text>
      </Flex>
    </Flex>
  );
}
