import { useRouter } from "next/router";
import { Text, Flex, Button, Link } from "@chakra-ui/react";
//<span onClick={() => router.back()}>Click here to go back</span>
export function Header() {
  const router = useRouter();

  return (
    <Flex w={["95vw", "50vw"]} flexDir="row" align="center" mt="3" mb="3">
      <Flex>
        <Button onClick={() => router.back()} variant="link">
          Voltar
        </Button>
      </Flex>
      <Flex w="100%" justify="center">
        <Text fontFamily="Pacifico" fontSize="2xl">
          Amigo Secreto
        </Text>
      </Flex>
      <Flex>
        <Button variant="link">Ajuda</Button>
      </Flex>
    </Flex>
  );
}
