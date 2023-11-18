import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import GithubLogin from './GithubLogin'
import ConnectWallet from './ConnectWallet'

import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import registrationContract from '../assets/data/Registration.json'

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

export default function LoginModal({ onClose, open }) {
  const { data: session } = useSession()
  const { isConnected } = useAccount()

  const joinConfig = usePrepareContractWrite({
    address: contractAddress,
    abi: registrationContract.abi,
    functionName: 'joinAsContributor',
    args: [session?.user.name],
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
    onSuccess() {
      onClose()
    },
    onError(e) {
      console.log(e)
      onClose()
    },
  })

  const handleSmartContractRegister = async (type) => {
    try {
      await joinAction.write?.()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (session && isConnected) {
      handleSmartContractRegister()
    }
  }, [session, isConnected])

  return (
    <>
      <Modal
        sx={{ zIndex: 2 }}
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <ConnectWallet />
            <GithubLogin />
          </Box>
        </Box>
      </Modal>
    </>
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
