// Do Scheduling
// https://github.com/node-schedule/node-schedule
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// Execute a cron job every 5 Minutes = */5 * * * *
// Starts from seconds = * * * * * *

import config from "../../config";
import logger from "../../loaders/logger";
import { ethers } from "ethers";
import { Container } from "typedi";
import schedule from "node-schedule";
import HelloWorldChannel from "./helloWorldChannel";
import { abi } from "./abi";
import { ChainId } from "caip";
export default () => {
  const startTime = new Date(new Date().setHours(0, 0, 0, 0));

  const fiveMinuteRule = new schedule.RecurrenceRule();

  fiveMinuteRule.minute = 1;

  const channel = Container.get(HelloWorldChannel);
  channel.logInfo(
    ` 🛵 Scheduling Showrunner - ${channel.cSettings.name} Channel`
  );

  schedule.scheduleJob("", async function () {
    const taskName = `${channel.cSettings.name} event checks and helloWorld`;

    try {
      function main() {
        channel.logInfo("Sending notification to evidence provider");
        const contract_address = "0x455e53CBB86018Ac2B8092FdCd39d8444aFFC3F6";
        const provider = new ethers.providers.WebSocketProvider(
          `wss://ethereum-mainnet.s.chainbase.online/v1/${process.env.chainBaseKey}`
        );
        const contract = new ethers.Contract(contract_address, abi, provider);
        contract.on("Transfer", (_from, _to, _value) => {
          // Initialized the widthrawl transaction
          let info = {
           from:_from,
           to:_to,
           value:_value
          };
          channel.logInfo(`Info is ${JSON.stringify(info)}`);
          channel.logInfo(`Amount = ${ethers.utils.formatEther(info.value)}`)
          channel.sendReq(info);
        });
        
      }
      main();
      //await channel.helloWorld(false);

      channel.logInfo(`🐣 Cron Task Completed -- ${taskName}`);
    } catch (err) {
      channel.logInfo(`❌ Cron Task Failed -- ${taskName}`);
      channel.logError(`Error Object: %o`);
      channel.logError(err);
    }
  });
};
