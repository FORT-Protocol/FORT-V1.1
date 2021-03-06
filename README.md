# FORT-V1.1

A DeFi Development and Application System with Unlimited Liquidity.

![](https://img.shields.io/github/issues/FORT-Protocol/FORT-V1.1)
![](https://img.shields.io/github/forks/FORT-Protocol/FORT-V1.1)
![](https://img.shields.io/github/stars/FORT-Protocol/FORT-V1.1)
![](https://img.shields.io/github/license/FORT-Protocol/FORT-V1.1)
![](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2FFORT-Protocol%2FFORT-V1.1)

## Whitepaper

**[https://docs.fortprotocol.com/](https://docs.fortprotocol.com/)**

## Documents

**[FORT-V1.1 Contract Specification](docs/IFortOptions.md)**

**[FORT-V1.1 Contract Structure Diagram](docs/structure.svg)**

**[Audit Report](https://www.certik.com/projects/fort)**

**[Learn More...](https://fortprotocol.com/)**

## Usage

### Run test

```shell
npm install

npx hardhat test
```

### Compile

Run `npx hardhat compile`, get build results in `artifacts/contracts` folder, including `ABI` json files.

## Contract Addresses

### 2021-11-27@bsc_main
| Name | Interfaces | bsc_main |
| ---- | ---- | ---- |
| dcu | IERC20 | 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF |
| fortGovernance | IFortGovernance | 0x3e7D350BbAb71cAA2304e979aa6Af007EF5ECcB8 |
| nestOpenPrice | INestOpenPrice | 0x09CE0e021195BA2c1CDE62A8B187abf810951540 |
| fortOptions | IFortOptions | 0x284935F8C571d054Df98eDA8503ea13cde5fd8Cc |
| fortFutures | IFortFutures | 0x8c5052f7747D8Ebc2F069286416b6aE8Ad3Cc149 |
| fortSwap | IFortSwap | 0x2Cd1Bf9345E969b5DFc6D88000475aD6d487363A |

### 2021-10-20@mainnet
| Name | Interfaces | mainnet |
| ---- | ---- | ---- |
| nest | IERC20 | 0x04abEdA201850aC0124161F037Efd70c74ddC74C |
| nhbtc | IERC20 | 0x1F832091fAf289Ed4f50FE7418cFbD2611225d46 |
| cofi | IERC20 | 0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1 |
| pusd | IERC20 | 0xCCEcC702Ec67309Bc3DDAF6a42E9e5a6b8Da58f0 |
| fortube | IERC20 | 0x1FCdcE58959f536621d76f5b7FfB955baa5A672F |
| peth | IERC20 | 0x53f878Fb7Ec7B86e4F9a0CB1E9a6c89C0555FbbD |
| dcu | IERC20 | 0xf56c6eCE0C0d6Fbb9A53282C0DF71dBFaFA933eF |
| nestPriceFacade | INestPriceFacade, INestQuery | 0xB5D2890c061c321A5B6A4a4254bb1522425BAF0A |
| fortGovernance | IFortGovernance | 0xfD6dF48df7E0989355B23f200d0D454b9101d17D |
| fortVaultForStaking | IFortVaultForStaking | 0xE3940A3E94bca34B9175d156a5E9C5728dFE922F |
| fortOptions | IFortOptions | 0x6C844d364c2836f2111891111F25C7a24da976A9 |
| fortFutures | IFortFutures | 0x622f1CB39AdE2131061C68E61334D41321033ab4 |
| fortSwap | IFortSwap | 0x6e7fd4BA02A5a7a75Ea3CcE37e221dC144D606Dd |

### 2021-10-04@rinkeby
| Name | Interfaces | rinkeby |
| ---- | ---- | ---- |
| usdt | IERC20 | 0x2d750210c0b5343a0b79beff8F054C9add7d2411 |
| hbtc | IERC20 | 0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B |
| dcu | IERC20 | 0xc408edF487e98bB932eD4A8983038FF19352eDbd |
| nestPriceFacade | INestPriceFacade, INestQuery | 0x40C3EB032f27fDa7AdcF1B753c75B84e27f26838 |
| fortGovernance | IFortGovernance | 0xA2B48399a579335eF7D410B9C0B50E59E126C48a |
| fortDAO | IFortDAO | 0x5769c37289C9dCfe1AD141773a9ED5aA89c2e069 |
| fortOptions | IFortOptions | 0x702F97D4991e2155576548989fEdEE3971705465 |
| fortFutures | IFortFutures | 0x3Db207CadA55e556ab7A8534A7a6aD9EFfc27B01 |
| fortVaultForStaking | IFortVaultForStaking | 0x5cA5E616310c0Cca41B7E4329021C17a5a79a0F1 |

### 2021-09-28@rinkeby
| Name | Interfaces | rinkeby |
| ---- | ---- | ---- |
| usdt | IERC20 | 0x2d750210c0b5343a0b79beff8F054C9add7d2411 |
| hbtc | IERC20 | 0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B |
| dcu | IERC20 | 0xDB7b4FdF99eEE8E4Cb8373630c923c51c1275382 |
| nestPriceFacade | INestPriceFacade, INestQuery | 0x40C3EB032f27fDa7AdcF1B753c75B84e27f26838 |
| fortGovernance | IFortGovernance | 0x45F2387A06e2c0659c5aA757c3421e26398c1c35 |
| fortDAO | IFortDAO | 0xBd0b5800398FcB35a11e45291B28E7f32c1D435D |
| fortOptions | IFortOptions | 0xAB7B4a58078A76CEBd3f9DeB7cf308C34AAb71F2 |
| fortFutures | IFortFutures | 0x269382F35b76C6d7C30980A9E835D7e6831e0D84 |
| fortVaultForStaking | IFortVaultForStaking | 0x8A68626A4c37481b4941f9a4137C94FDa41e9D91 |

### 2021-09-25@rinkeby
| Name | Interfaces | rinkeby |
| ---- | ---- | ---- |
| usdt | IERC20 | 0x2d750210c0b5343a0b79beff8F054C9add7d2411 |
| hbtc | IERC20 | 0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B |
| dcu | IERC20 | 0xDB7b4FdF99eEE8E4Cb8373630c923c51c1275382 |
| nestPriceFacade | INestPriceFacade, INestQuery | 0x40C3EB032f27fDa7AdcF1B753c75B84e27f26838 |
| fortGovernance | IFortGovernance | 0x43E8330d1725a2978122B49d41197e7Dc073cdf1 |
| fortDAO | IFortDAO | 0x57E481f193df1e69639171506b2c38136e53B7d1 |
| fortOptions | IFortOptions | 0x7557E34f05193b8Ee1edC1A4c0d4f8A158D1Ab61 |
| fortFutures | IFortFutures | 0x183C6068f6e3c25912f0D054e2cC34D11f217f50 |
| fortVaultForStaking | IFortVaultForStaking | 0x3254D21C38c6b8ea4A256A5B474622852F8B6d2A |

### 2021-09-01@rinkeby
| Name | Interfaces | rinkeby |
| ---- | ---- | ---- |
| nestPriceFacade | INestPriceFacade, INestQuery | 0x40C3EB032f27fDa7AdcF1B753c75B84e27f26838 |
| usdt | IERC20 | 0x2d750210c0b5343a0b79beff8F054C9add7d2411 |
| hbtc | IERC20 | 0xaE73d363Cb4aC97734E07e48B01D0a1FF5D1190B |
| dcu | IERC20 | 0xDB7b4FdF99eEE8E4Cb8373630c923c51c1275382 |
| fortGovernance | IFortGovernance | 0xDD61E5604580AfeEe202d533eefE688091b8127e |
| fortDAO | IFortDAO | 0xe7012078Cfa3E083d3Fe7B79bA4d8913Be48362F |
| fortOptions | IFortOptions | 0x5bA7CBD3cC7C3ced0f94FC3CFd331260569E19Ca |
| fortFutures | IFortFutures | 0x1820A4c392d71B65C3C32c1a6E8d94A3FB785fae |
| fortVaultForStaking | IFortVaultForStaking | 0xF06Ca516B6e11AB7843FB0B1a7eECBf0e57B3B64 |
| ETH/USDT+F1 | IERC21 | 0x1BcD7C075C6b94ef4D6a1aEE4496828d61B5f5F1 |
| ETH/USDT+F2 | IERC21 | 0x1B7D9daDBE37Eb6dF32c8682Ee3090b630D24F3e |
| ETH/USDT+F5 | IERC21 | 0x6A308373912a73Fe17AB40637061A5eeeDD16975 |
| ETH/USDT-F1 | IERC21 | 0x9a1Aea23230447Da01E66Caa9D0D96c039805f89 |
| ETH/USDT-F2 | IERC21 | 0x502eAfEB2e8b14C22118e0F5a15427Edc4D3B2bB |
| ETH/USDT-F5 | IERC21 | 0xD46880A5bA1cA2167D71582d8f2D5acdB441aBD5 |
| HBTC/USDT+F1 | IERC21 | 0xD8295D21a9Cec684eC05BAbBECe5c3AAB30eC46D |
| HBTC/USDT+F2 | IERC21 | 0x88F422a7b43162BB106ce84D33f6252B838f7567 |
| HBTC/USDT+F5 | IERC21 | 0x545E158aaBAd59fd487eEf7edaA12c776868E83B |
| HBTC/USDT-F1 | IERC21 | 0xd4eefB03b110f51FD7E28D728CF24BCA067D77EC |
| HBTC/USDT-F2 | IERC21 | 0xA673cc52107c377F2701e7B5dC0aEffAc125a300 |
| HBTC/USDT-F5 | IERC21 | 0x2aDEb401D16eE0c102a6358Bb15570330Ac49075 |

### 2021-08-19@rinkeby
| Name | Interfaces | rinkeby |
| ---- | ---- | ---- |
| nestPriceFacade | INestPriceFacade, INestQuery | 0x40C3EB032f27fDa7AdcF1B753c75B84e27f26838 |
| usdt | IERC20 |  0x2d750210c0b5343a0b79beff8F054C9add7d2411 |
| nest | IERC20 |  0xE313F3f49B647fBEDDC5F2389Edb5c93CBf4EE25 |
| cofi | IERC20 |  0x6b3077dcEe0975017BDd1a7eA9E12d3D9F398695 |
| dcu | IERC20 |  0x6747972f3Fc6f4A4fC9c8a1fF4C2899dc83c4DF7 |
| fortGovernance | IFortGovernance | 0xE1328C673620433e0c1847e5BfB698DbCED9688b |
| fortDAO | IFortDAO | 0x55D6Fe1C851181F5C1779Bf04822675Ae144b38F |
| fortOptions | IFortOptions | 0x66bD0139b6216B740820a54a71a2CDFf2070e76B |
| fortFutures | IFortFutures | 0xc5086B5a9AC3A4036416690E382AbD7808DC307c |
| fortVaultForStaking | IFortVaultForStaking | 0x4A0C01665c10a7635fB33BCC45198dfC2f31db0C |