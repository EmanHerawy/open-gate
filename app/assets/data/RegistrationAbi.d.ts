/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.60.0
  Forc version: 0.44.0
  Fuel-Core version: 0.20.5
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

import type { Option, Enum } from "./common";

export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type OwnershipTransferredEventInput = { previous_owner: Option<IdentityInput>, new_owner: Option<IdentityInput> };
export type OwnershipTransferredEventOutput = { previous_owner: Option<IdentityOutput>, new_owner: Option<IdentityOutput> };

interface RegistrationAbiInterface extends Interface {
  functions: {
    owner: FunctionFragment;
    transfer_ownership: FunctionFragment;
    initialize: FunctionFragment;
    is_project_creator_registered: FunctionFragment;
    join_as_contributor: FunctionFragment;
    join_as_open_source_project_creator: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'owner', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'transfer_ownership', values: [Option<IdentityInput>]): Uint8Array;
  encodeFunctionData(functionFragment: 'initialize', values: [Option<IdentityInput>, Option<IdentityInput>, BigNumberish, ContractIdInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'is_project_creator_registered', values: [IdentityInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'join_as_contributor', values: [T]): Uint8Array;
  encodeFunctionData(functionFragment: 'join_as_open_source_project_creator', values: []): Uint8Array;

  decodeFunctionData(functionFragment: 'owner', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'transfer_ownership', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'initialize', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'is_project_creator_registered', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'join_as_contributor', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'join_as_open_source_project_creator', data: BytesLike): DecodedValue;
}

export class RegistrationAbi extends Contract {
  interface: RegistrationAbiInterface;
  functions: {
    owner: InvokeFunction<[], Option<IdentityOutput>>;
    transfer_ownership: InvokeFunction<[new_owner: Option<IdentityInput>], void>;
    initialize: InvokeFunction<[new_owner: Option<IdentityInput>, treasury_: Option<IdentityInput>, blance_to_join: BigNumberish, dao_token: ContractIdInput], void>;
    is_project_creator_registered: InvokeFunction<[creator_address: IdentityInput], boolean>;
    join_as_contributor: InvokeFunction<[github_username: T], void>;
    join_as_open_source_project_creator: InvokeFunction<[], void>;
  };
}
