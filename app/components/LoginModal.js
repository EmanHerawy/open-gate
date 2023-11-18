import { useState } from 'react'
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

  const joinConfig = usePrepareContractWrite({
    address: contractAddress,
    abi: registrationContract.abi,
    functionName: 'joinAsContributor',
    args: ['ismail9k'],
  })

  const joinAction = useContractWrite(joinConfig.config)

  useWaitForTransaction({
    hash: joinAction.data?.hash,
    onSuccess() {
      console.log('d')
    },
    onError(e) {
      console.log(e)
    },
  })

  const handleSmartContractRegister = async (type) => {
    try {
      const res = await joinAction.write?.()
      console.log('res', res)
      // Handle successful transaction
    } catch (error) {
      // Handle errors
      console.error(error)
    }
  }

  return (
    <>
      <Modal
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

          <Box>
            <Button onClick={() => handleSmartContractRegister('organzine')}>
              Login as organzine
            </Button>
            <Button onClick={() => handleSmartContractRegister('organzine')}>
              Login as developer
            </Button>
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
