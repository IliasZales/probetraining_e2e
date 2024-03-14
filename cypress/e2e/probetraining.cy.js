import "@testing-library/cypress/add-commands";

describe("Probetraining Anmeldung", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("grecaptcha.execute is not a function")) {
      return false;
    }
  });
  it("Füllt das Anmeldeformular aus und sendet es ab", () => {
    cy.visit("https://ta-wt.com/probetraining"); // URL anpassen

    cy.get("#CookieBoxTextHeadline").should("be.visible").click();
    cy.get("._brlbs-accept").first().click();
    cy.contains("[class=_brlbs-btn]", "Lade Google reCAPTCHA").click();

    cy.contains("[class=fusion-toggle-heading]", "Seelze").click();
    cy.get("#geschlechtSeelze")
      .find('input[type="radio"][value="männlich"]')
      .check();
    cy.get("#ageSeelze").select("7");
    cy.get("#minisSeelzeDi").check();

    cy.get("#datepickerSeelze").click();
    cy.get('td[data-handler="selectDay"]').then((days) => {
      if (days.length > 0) {
        cy.wrap(days[0]).click();
      }
    });

    cy.get("#referenzSeelze")
      .find('input[type="radio"][value="Google"]')
      .check();

    cy.get("#nameSeelze").type("Max Mustermann");
    cy.get("#emailSeelze").type("test@mail.de");
    cy.get("#telefonSeelze").type("012567890");
    cy.get("#areaSeelze").type("test automation");

    cy.get("input.wpcf7-form-control.wpcf7-submit").last().click();

    cy.contains("Vielen Dank für deine Nachricht. Sie wurde gesendet.", {
      timeout: 6000,
    }).should("be.visible");
  });
});
