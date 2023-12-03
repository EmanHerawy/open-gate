import { useFuel } from '@fuel-wallet/react';
import { useConnect, isConnected } from '@fuel-wallet/react';

export default function ConnectButton() {
  const { connect } = useConnect();

const connectWallet = async () => {
    try {
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
