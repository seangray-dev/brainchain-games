import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { CONTRACT_ABI } from "./contractAbi";

const CLIENT_ID = process.env.NEXT_PUBLIC_TW_CLIENT_ID as string;

export const client = createThirdwebClient({
  clientId: CLIENT_ID,
});

export const chain = defineChain(sepolia);

export const CONTRACT_ADDRESS = "0x1d3cb7fa283395D6E8dA966dF97aC7Fc7fcEa969";
export const CONTRACT_ID = "37154c8a-023b-47a4-9d05-b42bacac892a";

export const CONTRACT = getContract({
  client,
  chain,
  address: CONTRACT_ADDRESS,
});
