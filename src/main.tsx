import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PrivyProvider } from "@privy-io/react-auth";
import { baseSepolia } from "viem/op-stack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_ID}
      config={{
        defaultChain: baseSepolia,
        // the privy ethers signer is derived from the supported chains
        // so these chains need to include rpcUrls that point to where we want - alchemy, infura, transient rpc node, etc
        supportedChains: [baseSepolia],
        embeddedWallets: {
          createOnLogin: "all-users",
        },
        // Order of login methods:
        // Google
        // X
        // Farcaster
        // Apple (can we hide behind a "more" link"?)
        // SMS (can we hide behind a "more" link"?)
        // Email (can we hide behind a "more" link"?)
        loginMethodsAndOrder: {
          primary: ["google", "twitter", "farcaster"],
          overflow: ["apple", "sms", "email"],
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
