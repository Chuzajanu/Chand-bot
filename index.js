const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
/////////////////////////////////////////////
//========= CHECK UPTIME =========//
/////////////////////////////////////////////
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const chalk = require("chalk");
logger("Opened server site...", "[ Starting ]");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ Starting ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "CHAND.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });
  
  child.on("close", (codeExit) => {
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            startBot("Starting up...");
            global.countRestart += 1;
            return;
        } else return;
    });

  child.on("error", function(error) {
    logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
  });
};
////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////


axios.get("https://raw.githubusercontent.com/Mrchandu7/chandv2/main/package.json").then((res) => {
  logger(res['data']['name'], "[ NAME ]");
  logger("Version: " + res['data']['version'], "[ VERSION ]");
  logger(res['data']['description'], "[ DESCRIPTION ]");
});
startBot();
