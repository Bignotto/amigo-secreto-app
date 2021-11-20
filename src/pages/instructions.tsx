import { NextPage } from "next";
import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";

const Instructions: NextPage = () => {
  return (
    <Flex align="center" justify="center">
      <Flex
        w={["95vw", "25vw"]}
        align="center"
        justify="center"
        flexDir="column"
      >
        <Header />
        <Text fontWeight="bold">
          Faça o sorteio do seu grupo de Amigo Secreto.
        </Text>
        <br />
        <Text>
          Não é preciso criar uma conta, confirmar endereço de email ou decorar
          uma senha.
        </Text>
        <br />

        <Text>O Amigo Secreto faz o sorteio pra você, on line.</Text>
        <br />

        <Text>
          Para criar o seu Amigo Secreto, comece dando um nome para o seu grupo.
          Depois você pode dizer quando será a revelação, onde será a festa e
          pode sugerir o valor médio para os presentes. Você vai precisar criar
          uma senha bem simples para seus amigos entrarem.
        </Text>
        <br />

        <Text>
          Agora que o grupo foi criado, envie o código de convite e a senha para
          seus amigos entrarem no grupo.
        </Text>
        <br />

        <Text>
          Depois que todos entraram você pode realizar o sorteio do grupo.
        </Text>
        <br />

        <Text>
          Clique no botão Ver meu Amigo Secreto para ver quem você tirou no
          sorteio!
        </Text>
        <br />

        <Text>
          Tire um print da tela com o seu amigo secreto. O AmigoSecretoApp não
          guarda suas informações por muito tempo e você não terá como recuperar
          o resultado do sorteio mais tarde.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Instructions;
