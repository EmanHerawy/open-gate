import Button from '@mui/material/Button'



import { useIsConnected, useAccount, useWallet } from '@fuel-wallet/react';
import { RegistrationAbi__factory } from "../assets/data/";

const CONTRACT_ID =
  "0x76aa2e129f2eee4b0c531431358161bb478fbfae1798d648fe3f1f2f01cbb990";


const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export default function LoginModal() {
  const { isConnected } = useIsConnected()
  const { account } = useAccount();
  const { wallet } = useWallet({ address: account });
 

  const handleSmartContractRegister = async (type) => {
    const contract = RegistrationAbi__factory.connect(CONTRACT_ID, wallet);
    // Creates a transactions to call the increment function
    // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
    try {
      await contract.functions.join_as_open_source_project_creator().call();
      onClose()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Button onClick={handleSmartContractRegister}>Login As Organization</Button>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
