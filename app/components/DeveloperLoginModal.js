import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import GithubLogin from './GithubLogin'
import ConnectWallet from './ConnectWallet'

 

import { useIsConnected, useAccount, useWallet } from '@fuel-wallet/react';
import {RegistrationAbi__factory} from "../assets/data/";

 const CONTRACT_ID =
  "0x76aa2e129f2eee4b0c531431358161bb478fbfae1798d648fe3f1f2f01cbb990";

 
export default function LoginModal({ onClose, open }) {
  const { data: session } = useSession()
  const { isConnected } = useIsConnected()
  const { account } = useAccount();
  const { wallet } = useWallet({ address: account });

 

 

 

  const handleSmartContractRegister = async (type) => {
    const contract = RegistrationAbi__factory.connect(CONTRACT_ID, wallet);
    // Creates a transactions to call the increment function
    // because it creates a TX and updates the contract state this requires the wallet to have enough coins to cover the costs and also to sign the Transaction
    try {
      await contract.functions.join_as_contributor().callParams({
        github_username: session?.user.name
      })        .call();
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
