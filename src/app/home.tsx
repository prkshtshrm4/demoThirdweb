import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

export const YourApp = () => {
  const address = useAddress();
  return (
    <div>
      <ConnectWallet />
    </div>
  );
};