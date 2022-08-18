import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="favicon.ico" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="https://devchallenges.io/"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&family=Poppins:wght@400;500;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="scrollbar-none">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
