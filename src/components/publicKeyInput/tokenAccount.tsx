import React, { useCallback, useState } from "react";
import { utils, web3 } from "@project-serum/anchor";
import { account } from "@senswap/sen-js";

import PublicKeyInput from "./index";

const TokenAccount = ({ onChange }: { onChange: (val: string) => void }) => {
  const [mint, setMint] = useState("");
  const [owner, setOwner] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");

  const validConfirm = !!account.isAddress(mint) && !!account.isAddress(owner);

  const getTokenAccountAddress = useCallback(async () => {
    if (!validConfirm) return;
    try {
      const mintPub = new web3.PublicKey(mint);
      const ownerPub = new web3.PublicKey(owner);
      const newTokenAccount = await utils.token.associatedAddress({
        mint: mintPub,
        owner: ownerPub,
      });
      setTokenAccount(newTokenAccount.toBase58());
    } catch (error) {
      setTokenAccount("");
    }
  }, [mint, owner, validConfirm]);

  return (
    <div>
      <div>
        <PublicKeyInput
          name="Mint"
          value={mint}
          onChange={(e) => setMint(e.publicKey)}
        />
      </div>
      <div>
        <PublicKeyInput
          name="Owner"
          value={owner}
          onChange={(e) => setOwner(e.publicKey)}
        />
      </div>
      {/* Token account generated  */}
      {tokenAccount && <div>Address: {tokenAccount}</div>}
      <div>
        <button onClick={getTokenAccountAddress} disabled={!validConfirm}>
          Fetch PDA
        </button>
      </div>
      <div>
        <button onClick={() => onChange(tokenAccount)} disabled={!tokenAccount}>
          Done
        </button>
      </div>
    </div>
  );
};

export default TokenAccount;
