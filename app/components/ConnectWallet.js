import { useConnect, useIsConnected } from '@fuel-wallet/react';

export default function ConnectButton() {
  const { connect } = useConnect();
  const { isConnected } = useIsConnected()

const connectWallet = async () => {
  try {
    console.log({ isConnected });
      await  connect();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="App">
        {
          isConnected ? (
            <>
              <h3>Connected</h3>
            
            </>
          ) : (
              <button  onClick={connectWallet}>Connect</button>
          )
        }
      </div>
    </>
  );
}
