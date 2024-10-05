const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://saucedemo.com/',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          // Disable the password manager prompt
          launchOptions.args.push('--disable-save-password-bubble');
          launchOptions.args.push('--disable-features=AutofillSaveCardBubble');
        }
        return launchOptions;
      });
    },
  },
});
