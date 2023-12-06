import { defineConfig } from "cypress";
const {
  lighthouse, prepareAudit,
} = require("@cypress-audit/lighthouse");

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      runMode: 2,
    },
    setupNodeEvents (on) {
      on("before:browser:launch", ( _ , launchOptions) => {
        prepareAudit(launchOptions);
      });
      on("task", {
        lighthouse: lighthouse(),
      });
    },
  },
  video: false,
  screenshotOnRunFailure: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  //chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 720,
});
