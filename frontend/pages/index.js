import { exchangeAddress, exchangeAbi } from "@/constants";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead } from "wagmi";
import { formatEther } from "viem";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // Check if the user's wallet is connected, and it's address using Wagmi's hooks.
  const { address, isConnected } = useAccount();

  // Fetch the balance of the user
  const balanceOfUser = useContractRead({
    abi: exchangeAbi,
    address: exchangeAddress,
    functionName: "balanceOf",
    args: [address],
  });

  if (!isConnected)
    return (
      <div className={inter.className}>
        <Head>
          <title>CryptoDevs DEX</title>
          <meta name="description" content="CryptoDevs DEX" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.connect}>
          <div className={styles.connectBtn}>
            <ConnectButton />
          </div>
          <h1>Welcome to Crypto Devs DEX!</h1>
        </div>
      </div>
    );

  return (
    <div className={inter.className}>
      <Head>
        <title>CryptoDevs DEX</title>
        <meta name="description" content="CryptoDevs DEX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        Your balance: {balanceOfUser.data.toString()}
      </div>
    </div>
  );
}
