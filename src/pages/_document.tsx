// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <head>
            <title>Amigo Secreto</title>
          </head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto+Mono&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="description"
            content="Faça o sorteio do seu Amigo Secreto on-line! Não precisa instalar aplicativo, criar uma conta e decorar uma senha. O AmigoSecreto faz o sorteio pra você. Crie um grupo e veja como é fácil!"
          />
          <meta
            property="og:title"
            content="Sorteio de um grupo de Amigo Secreto"
          />
          <meta
            property="og:description"
            content="Faça o sorteio do seu Amigo Secreto on-line! Não precisa instalar aplicativo, criar uma conta e decorar uma senha. O AmigoSecreto faz o sorteio pra você. Crie um grupo e veja como é fácil!"
          />
          <meta
            property="og:url"
            content="https://amigo-secreto-app.vercel.app/"
          />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
