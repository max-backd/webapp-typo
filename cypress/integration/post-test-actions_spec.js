import { initWeb3, returnCrypto, WEB3_TIMEOUT } from "../support";

describe("Post test actions", () => {
  it("Should Innitialise Web3", () => {
    initWeb3("/pools");
    cy.get('[id="walletConnect.wallets.metaMask"]').click();
    cy.get("#pool-row-bkddai", { timeout: WEB3_TIMEOUT }).click();
  });
  it("Should withdraw DAI", () => {
    cy.get('[id="pool.tabs.withdraw.tab"]').click();
    cy.wait(30_000);
    cy.get("#available-amount", { timeout: WEB3_TIMEOUT }).contains("DAI", {
      timeout: WEB3_TIMEOUT,
    });
    cy.get("#input-button").click();
    cy.get("#withdraw-button").click();
    cy.get("#withdrawal-confirmation-popup-button").click();
    cy.get("#withdrawal-confirmation-popup-button").should("be.disabled");
    cy.get("#withdrawal-confirmation-popup-exit").click();
    cy.get("#withdrawal-confirmation-popup-header").should("not.be.visible");
    cy.get("#desktop-connector").click();
    cy.get("#account-details-transactions div", { timeout: WEB3_TIMEOUT })
      .first()
      .contains("Withdraw");
    cy.get("#connector-loading-indicator", { timeout: WEB3_TIMEOUT }).should(
      "have.css",
      "opacity",
      "0"
    );
    cy.get("#connection-details-popup-exit").click();
  });
  it("Should wait for transactions to finish", () => {
    cy.wait(60_000);
  });
  it("Should return Crypto", () => {
    returnCrypto();
  });
  it("Should wait for crypto to send", () => {
    cy.wait(120_000);
  });
});
