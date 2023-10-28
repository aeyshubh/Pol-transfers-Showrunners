import { Inject, Service } from "typedi";
import { Logger } from "winston";
import config from "../../config";
import { EPNSChannel } from "../../helpers/epnschannel";
import { mockMessages } from "./messages";
import { ethers } from "ethers";
import { abi } from "./abi";
import Web3 from "web3";
const tokenMessengerAbi = require("./abis/cctp/TokenMessenger.json");
const messageAbi = require("./abis/cctp/Message.json");
const usdcAbi = require("./abis/Usdc.json");
const messageTransmitterAbi = require("./abis/cctp/MessageTransmitter.json");
@Service()
export default class HelloWorldChannel extends EPNSChannel {
  constructor(@Inject("logger") public logger: Logger) {
    super(logger, {
      networkToMonitor: config.web3MainnetNetwork,
      dirname: __dirname,
      name: "Hello World",
      url: "https://epns.io/",
      useOffChain: true,
    });
  }
  // Checks for profile Expiration and Sends notification to users
  // Whose Profile is about to be expired
  // To be fired to initialize a transaction
  async sendReq(info) {
    try {
      const notificationType = 1;
      if(info){
        //this.logInfo(`Got ${info.from} value ${ethers.utils.parseUnits(info.amount)}`);
        const recipients = this.channelAddress;
        const amount = ethers.utils.formatEther(info.value);
           await this.sendNotification({
            recipient: recipients,
            title: "A Swap of Matic to Pol has been made",
            message: `A Swap of ${amount} has been made by ${info.to}`,
            payloadTitle: `A Swap of ${amount} has been made by ${info.to}`,
            payloadMsg: `A Swap of ${amount} has been made by ${info.to}`,
            notificationType: notificationType,
            cta: "",
            image: null,
            simulate: false,
          }); 
        return { success: true };
      }
     
    } catch (error) {
      this.logError(error);
    }
    }
  /**
   * The method responsible for handling webhook payload
   * @param payload
   */
  public async webhookPayloadHandler(payload: any, simulate: any) {
    const { Message } = payload;

    // do something with the payload
  }
}
