# PUSH Showrunners (Server)

The PUSH Showrunners handles the channels created and maintaned by us. It also shows how easy it is to interact with the protocol to build highly customized notifications for your dApp, smart contracts or even centralized services.

# Project POL transfers
- This project uses Push showrunners and Chainbases Ethereum mainner websocket .
- User can subscribe to this channel https://staging.push.org/channels?channel=0x82a7A0828fa8EB902f0508620Ee305b08634318A  ,to receive notification about every transfer/swap event of POL token done using Chainbase websocket .
- ![pushNotif1](https://github.com/aeyshubh/Pol-transfers-Showrunners/assets/50445649/87746deb-95ac-4f34-8fec-28bfa44c7bff)

- This channel can also be uses to track Whale address and see their transactions ,like one shown in the demo,a user transfered 5700 POL tokens,with his address shown in the notification,you can see his past trading history and what tokens does it holds.
- Chainbase code Link : https://github.com/aeyshubh/Pol-transfers-Showrunners/blob/1f88520b847572dd838105b74bc370a2b9b3459c/src/showrunners/helloWorld/helloWorldJobs.ts#L43
- Tracking : https://etherscan.io/address/0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6#events
- Tracks my project fit in : 
  - Top 3
  - Completeness Track (Completeness - Historical On-chain Data)
  - Best Innovative Application/User Application

## Installation and Set Up Guide

- Install docker 
- Clone the repo
``` git clone https://github.com/ethereum-push-notification-service/epns-showrunners-staging-v2.git```
- Open the root folder in a terminal and enter 
```docker-compose up```. This initalises mongodb, redis and ipfs local instances
- Open the root folder in another terminal and enter
```npm install```
```npm start```

### To exit 
- To stop running the showrunners server, press ```Ctrl + C```
- To stop running the docker, press ```Ctrl + C``` and enter
```docker-compose down```


## Showrunner Channels


- To subscribe to channels, please visit our [Alpha dApp](https://app.epns.io)
- Currently notifications can be recieved through our [Google Play Alpha App](https://play.google.com/store/apps/details?id=io.epns.epns)
- The alpha protocol and product are working and are in ropsten network
- **Have an idea for protocol or product?** Awesome! get in touch by joining our [Telegram Group](https://t.me/epnsproject) or following us on [Twitter](https://twitter.com/epnsproject)

## Technical Details

Following definitions are used in the rest of the spec to refer to a particular category or service.
| Term | Description
| ------------- | ------------- |
| Showrunners | Showrunners are Channels on PUSH protocol notification protocol that are created and maintained by us |

### Tech Specs

The Showrunners run on node.js server and are modularized on the ideas and architecture of [Bulletproof NodeJS](https://github.com/santiq/bulletproof-nodejs), the essential features in the architeture are as follows:

- **config** defines all the necessary configuration
- **Jobs** is used to handle waking up different channels for various purpose. Very useful in sending notifications from channel at a specific interval
- **dbListener** can be used to listen to and trigger functions on DB changes, we have left the interpretation and an example over there for whoever wants to use them
- **showrunners** are the actual channels and contain logic which is required for them to construct notification according to their use cases
- **middlewares and routes** will probably not be active on your production server but are given to test the channel in development mode. for example: triggering functions using postman or similar service and seeing the response
- **database** the architecture has been changed from MongoDB to mysql to show how easy it is to have either of the database if required

### Credits

- [Bulletproof NodeJS](https://github.com/santiq/bulletproof-nodejs)

### External Services

We would need external services of:

- [Mongodb](https://www.mongodb.com/) - Primary Database : [Installation](https://docs.mongodb.com/manual/installation/) We would be using Mongodb Atlas
- [Redis](https://www.mongodb.com/) - Internal Cache : [Installation](https://redis.io/topics/quickstart)
- [Mongodb Atlas](https://www.mongodb.com/cloud/atlas)

For local ease of development, we make use of [Docker](https://docs.docker.com/get-docker/).

