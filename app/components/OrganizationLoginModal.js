import Button from '@mui/material/Button'

import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import registrationContract from '../assets/data/Registration.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export default function LoginModal() {
  const joinConfig = usePrepareContractWrite({
    address: contractAddress,
    abi: registrationContract.abi,
    functionName: 'joinAsOpenSourceProjectCreator',
    enabled: false,
  })

  if (joinConfig.error) {
    console.error(joinConfig.error)
  }

  const joinAction = useContractWrite(joinConfig.config)

  if (joinAction.error) {
    console.error(joinAction.error)
  }

  useWaitForTransaction({
    hash: joinAction.data?.hash,
    onSuccess() {},
    onError(e) {
      console.log(e)
    },
  })

  const handleSmartContractRegister = async (type) => {
    try {
      await joinAction.write?.()
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
