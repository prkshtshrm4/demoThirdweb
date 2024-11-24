"use client";

import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { useState } from "react";
import { sepolia } from "thirdweb/chains";

export default function Home() {
  const [visible, setVisible] = useState(false)
  const [wallet_Address, setWallet_Address] = useState(null);
  const handleOnConnect = async (data:any) => {
    console.log("Connected",data)
    console.log(data)
    console.log('connect2',data?.getAccount()?.address)
    const address_found = await data?.getAccount()?.address
    setWallet_Address(address_found)
    // console.log(data?.isConected)
    
    if (address_found) setVisible(true);
    setWallet_Address(null)

    }
    const handleOnDisconect = () => {
      setVisible(false)
    }
    const handleSubmit = () => {

      console.log("submit pressed")
    }
    
    function Form() {
      return(
        <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto mt-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300">Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Wallet Address</label>
            <input
              type="text"
              name="address"
              value={wallet_Address || ''}
              readOnly
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 cursor-not-allowed opacity-75"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Role</label>
            <input
              type="text"
              name="role"
              required
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Remarks</label>
            <textarea
              name="remarks"
              rows={3}
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      )
    }
  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        

        <div className="flex justify-center mb-20">
          <p>{wallet_Address}</p>
          <ConnectButton
          onConnect={handleOnConnect}
          onDisconnect={handleOnDisconect}
          accountAbstraction={{
            chain: sepolia,
            sponsorGas: true,
          }}
          detailsModal={{
            assetTabs: ["nft", "token"],
          }}
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
        </div>

        {visible ? <Form  /> : null}
      </div>
    </main>
  );
}



function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        thirdweb SDK
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500"> Next.js </span>
      </h1>

      <p className="text-zinc-300 text-base">
        Read the{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          README.md
        </code>{" "}
        file to get started.
      </p>
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="thirdweb SDK Docs"
        href="https://portal.thirdweb.com/typescript/v5"
        description="thirdweb TypeScript SDK documentation"
      />

      <ArticleCard
        title="Components and Hooks"
        href="https://portal.thirdweb.com/typescript/v5/react"
        description="Learn about the thirdweb React components and hooks in thirdweb SDK"
      />

      <ArticleCard
        title="thirdweb Dashboard"
        href="https://thirdweb.com/dashboard"
        description="Deploy, configure, and manage your smart contracts from the dashboard."
      />
    </div>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
