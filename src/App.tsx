import "./App.css";
import { useMemo } from "react";

import Home from "./Home";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { createTheme, ThemeProvider } from "@material-ui/core";

const treasury = new anchor.web3.PublicKey(
  process.env.REACT_APP_TREASURY_ADDRESS!
);

const treasury2 = new anchor.web3.PublicKey(
  process.env.REACT_APP_2_TREASURY_ADDRESS!
);

const treasury3 = new anchor.web3.PublicKey(
  process.env.REACT_APP_3_TREASURY_ADDRESS!
);

const config = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_CONFIG!
);

const config2 = new anchor.web3.PublicKey(
  process.env.REACT_APP_2_CANDY_MACHINE_CONFIG!
);

const config3 = new anchor.web3.PublicKey(
  process.env.REACT_APP_3_CANDY_MACHINE_CONFIG!
);

const candyMachineId = new anchor.web3.PublicKey(
  process.env.REACT_APP_CANDY_MACHINE_ID!
);

const candyMachineId2 = new anchor.web3.PublicKey(
  process.env.REACT_APP_2_CANDY_MACHINE_ID!
);

const candyMachineId3 = new anchor.web3.PublicKey(
  process.env.REACT_APP_3_CANDY_MACHINE_ID!
);

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const startDateSeed2 = parseInt(process.env.REACT_APP_2_CANDY_START_DATE!, 10);

const startDateSeed3 = parseInt(process.env.REACT_APP_3_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const theme = createTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: '12px 16px',
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
        getPhantomWallet(),
        getSlopeWallet(),
        getSolflareWallet(),
        getSolletWallet({ network }),
        getSolletExtensionWallet({ network })
    ],
    []
  );

  return (
    
      <ThemeProvider theme={theme}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect={true}>
            <WalletDialogProvider>
              <Home
                candyMachineId={candyMachineId}
                config={config}
                connection={connection}
                startDate={startDateSeed}
                treasury={treasury}
                txTimeout={txTimeout}
              />
              <Home2
                candyMachineId={candyMachineId2}
                config={config2}
                connection={connection}
                startDate={startDateSeed2}
                treasury={treasury2}
                txTimeout={txTimeout}
              />
              <Home3
                candyMachineId={candyMachineId3}
                config={config3}
                connection={connection}
                startDate={startDateSeed3}
                treasury={treasury3}
                txTimeout={txTimeout}
              />
              <Home4
                candyMachineId={candyMachineId3}
                config={config3}
                connection={connection}
                startDate={startDateSeed3}
                treasury={treasury3}
                txTimeout={txTimeout}
              />
            </WalletDialogProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
  );
};

export default App;
