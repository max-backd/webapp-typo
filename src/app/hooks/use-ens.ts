import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Optional } from "../../lib/types";

const useENS = (): { ensName: Optional<string>; ensAvatar: Optional<string> } => {
  const { account } = useWeb3React();
  const [ensName, setENSName] = useState<Optional<string>>(null);
  const [ensAvatar, setENSAvatar] = useState<Optional<string>>(null);

  const resolveENS = async (): Promise<void> => {
    setENSAvatar(null);
    if (!account) return;
    const provider = ethers.providers.getDefaultProvider();
    const ensName = await provider.lookupAddress(account);
    setENSName(ensName);
    if (!ensName) return;
    const resolver = await provider.getResolver(ensName);
    if (!resolver) return;
    const avatar = await resolver.getAvatar();
    if (!avatar) return;
    setENSAvatar(avatar.url);
  };

  useEffect(() => {
    resolveENS();
  }, [account]);

  return { ensName, ensAvatar };
};

export default useENS;
