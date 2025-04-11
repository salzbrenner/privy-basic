import "./App.css";
import { useLogin, useLogout } from "@privy-io/react-auth";
import { useEmbeddedWallet } from "./privy";
import { baseSepolia } from "viem/op-stack";
import { getSigner } from "./privy/getSigner";

function App() {
  const {
    wallets,
    walletsReady,
    privyReady,
    privyAuthenticated,
    embeddedWallet,
  } = useEmbeddedWallet();
  const { login } = useLogin();
  const { logout } = useLogout();

  const signMessage = async () => {
    const signer = await getSigner(embeddedWallet, baseSepolia.id);
    const message = "Hello, world!";
    const signature = await signer?.signMessage(message);
    console.log(signature);
  };

  return (
    <>
      <button onClick={() => login()}>Login</button>
      <button onClick={() => signMessage()}>Sign Message</button>
      <button onClick={() => logout()}>Logout</button>
      <hr />
      <p>Wallets Ready</p>
      <pre>{JSON.stringify(walletsReady, null, 2)}</pre>
      <hr />
      <p>Privy Ready</p>
      <pre>{JSON.stringify(privyReady, null, 2)}</pre>
      <hr />
      <p>Privy Authenticated</p>
      <pre>{JSON.stringify(privyAuthenticated, null, 2)}</pre>
      <hr />
      <p>Embedded Wallet</p>
      <pre>{JSON.stringify(embeddedWallet, null, 2)}</pre>
      <hr />
      <p>Wallets</p>
      <pre>{JSON.stringify(wallets, null, 2)}</pre>
    </>
  );
}

export default App;
