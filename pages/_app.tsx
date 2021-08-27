import "../styles/globals.css";
import type { AppProps } from "next/app";
import CreaturesProvider from "../context/creaturesContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CreaturesProvider>
      <Component {...pageProps} />
    </CreaturesProvider>
  );
}
export default MyApp;
