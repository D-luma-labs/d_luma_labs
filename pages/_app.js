import "../styles/tailwind.css";
import "../styles/slick.css";
import '../styles/globals.css'
import { Orbis, OrbisProvider } from "@orbisclub/components";
import "@orbisclub/components/dist/index.modern.css";

/** Set the global forum context here (you can create categories using the dashboard by clicking on "Create a sub-context" from your main forum context) */
global.orbis_context = "kjzl6cwe1jw1482gp9vd5kn8b8dsru1l7w5ztdb9pctc9konioqu3c3g9g7qslh";
/** Set the global chat context here (the chat displayed when users click on the "Community Chat" button) */
global.orbis_chat_context = "kjzl6cwe1jw14b8qudhl0iup2newktbclb1p2wrnv1zl90t3akqf5damzdnn89d";

let orbis = new Orbis({
  useLit: false,
  node: "https://node2.orbis.club",
  PINATA_GATEWAY: 'https://orbis.mypinata.cloud/ipfs/',
  PINATA_API_KEY: process.env.pinata_api_key,
  PINATA_SECRET_API_KEY: process.env.pinata_secret_api_key
});

export default function App({ Component, pageProps }) {
  return <OrbisProvider defaultOrbis={orbis}><Component {...pageProps} /></OrbisProvider>
}
