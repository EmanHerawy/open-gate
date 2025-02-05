/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.60.0
  Forc version: 0.44.0
  Fuel-Core version: 0.20.5
*/

import { Interface, Contract, ContractFactory } from "fuels";
import type { Provider, Account, AbstractAddress, BytesLike, DeployContractOptions } from "fuels";
import type { ContributionPoolAbi, ContributionPoolAbiInterface } from "../ContributionPoolAbi";

const _abi = {
  "types": [
    {
      "typeId": 0,
      "type": "()",
      "components": [],
      "typeParameters": null
    },
    {
      "typeId": 1,
      "type": "b256",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 2,
      "type": "enum Identity",
      "components": [
        {
          "name": "Address",
          "type": 6,
          "typeArguments": null
        },
        {
          "name": "ContractId",
          "type": 8,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 3,
      "type": "enum InitializationError",
      "components": [
        {
          "name": "CannotReinitialize",
          "type": 0,
          "typeArguments": null
        },
        {
          "name": "ContractNotInitialized",
          "type": 0,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 4,
      "type": "enum UserError",
      "components": [
        {
          "name": "AmountCannotBeZero",
          "type": 0,
          "typeArguments": null
        },
        {
          "name": "IncorrectAssetSent",
          "type": 0,
          "typeArguments": null
        },
        {
          "name": "InsufficientBalance",
          "type": 0,
          "typeArguments": null
        },
        {
          "name": "RequestAlreadyUsed",
          "type": 0,
          "typeArguments": null
        },
        {
          "name": "NotRegistered",
          "type": 0,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 5,
      "type": "str[1]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 6,
      "type": "struct Address",
      "components": [
        {
          "name": "value",
          "type": 1,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 7,
      "type": "struct ClaimedEvent",
      "components": [
        {
          "name": "amount",
          "type": 10,
          "typeArguments": null
        },
        {
          "name": "by",
          "type": 2,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 8,
      "type": "struct ContractId",
      "components": [
        {
          "name": "value",
          "type": 1,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 9,
      "type": "struct RequestedEvent",
      "components": [
        {
          "name": "amount",
          "type": 10,
          "typeArguments": null
        },
        {
          "name": "by",
          "type": 2,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 10,
      "type": "u64",
      "components": null,
      "typeParameters": null
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "listing_id",
          "type": 10,
          "typeArguments": null
        },
        {
          "name": "pr_num",
          "type": 10,
          "typeArguments": null
        }
      ],
      "name": "claim",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "token",
          "type": 8,
          "typeArguments": null
        },
        {
          "name": "registration",
          "type": 8,
          "typeArguments": null
        }
      ],
      "name": "constructor",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "request_id",
          "type": 10,
          "typeArguments": null
        },
        {
          "name": "pr_num",
          "type": 10,
          "typeArguments": null
        }
      ],
      "name": "finalize_claim",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "github_repo",
          "type": 5,
          "typeArguments": null
        },
        {
          "name": "payable_amount",
          "type": 10,
          "typeArguments": null
        }
      ],
      "name": "list_repo",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "payable",
          "arguments": []
        },
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [
    {
      "logId": 0,
      "loggedType": {
        "name": "",
        "type": 4,
        "typeArguments": []
      }
    },
    {
      "logId": 1,
      "loggedType": {
        "name": "",
        "type": 9,
        "typeArguments": []
      }
    },
    {
      "logId": 2,
      "loggedType": {
        "name": "",
        "type": 3,
        "typeArguments": []
      }
    },
    {
      "logId": 3,
      "loggedType": {
        "name": "",
        "type": 4,
        "typeArguments": []
      }
    },
    {
      "logId": 4,
      "loggedType": {
        "name": "",
        "type": 4,
        "typeArguments": []
      }
    },
    {
      "logId": 5,
      "loggedType": {
        "name": "",
        "type": 7,
        "typeArguments": []
      }
    },
    {
      "logId": 6,
      "loggedType": {
        "name": "",
        "type": 3,
        "typeArguments": []
      }
    },
    {
      "logId": 7,
      "loggedType": {
        "name": "",
        "type": 4,
        "typeArguments": []
      }
    },
    {
      "logId": 8,
      "loggedType": {
        "name": "",
        "type": 4,
        "typeArguments": []
      }
    },
    {
      "logId": 9,
      "loggedType": {
        "name": "",
        "type": 4,
        "typeArguments": []
      }
    }
  ],
  "messagesTypes": [],
  "configurables": []
}

export class ContributionPoolAbi__factory {
  static readonly abi = _abi
  static createInterface(): ContributionPoolAbiInterface {
    return new Interface(_abi) as unknown as ContributionPoolAbiInterface
  }
  static connect(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider
  ): ContributionPoolAbi {
    return new Contract(id, _abi, accountOrProvider) as unknown as ContributionPoolAbi
  }
  static async deployContract(
    bytecode: BytesLike,
    wallet: Account,
    options: DeployContractOptions = {}
  ): Promise<ContributionPoolAbi> {
    const factory = new ContractFactory(bytecode, _abi, wallet);
    const contract = await factory.deployContract(options);
    return contract as unknown as ContributionPoolAbi;
  }
}
