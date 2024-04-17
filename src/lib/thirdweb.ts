import { createThirdwebClient, defineChain } from "thirdweb";
import { sepolia } from "thirdweb/chains";

const CLIENT_ID = process.env.NEXT_PUBLIC_TW_CLIENT_ID as string;

export const client = createThirdwebClient({
  clientId: CLIENT_ID,
});

export const chain = defineChain(sepolia);
