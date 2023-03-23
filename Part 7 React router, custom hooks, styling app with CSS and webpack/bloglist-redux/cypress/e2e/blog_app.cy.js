describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "harry",
      username: "kane",
      password: "scorer",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    const user2 = {
      name: "lionel",
      username: "messi",
      password: "scorer",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("blogs");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("kane");
      cy.get("#password").type("scorer");
      cy.get("#login-button").click();

      cy.contains("kane Logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("Player");
      cy.get("#password").type("scorer");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong username or password:")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "kane logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "kane", password: "scorer" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title-input").type("tottenham have not won the league");
      cy.get("#author-input").type("levy");
      cy.get("#url-input").type("tottenham.com");

      cy.get("#create-button").click();
      cy.contains("tottenham have not won the league");
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({ title: "first blog", author: "levy", url: "son.com" });
        cy.createBlog({
          title: "second blog",
          author: "jane",
          url: "austen.com",
        });
        cy.createBlog({
          title: "third blog",
          author: "darwin",
          url: "chrome.com",
        });
      });
      it("like button can be clicked", function () {
        cy.contains("second blog").parent().find("#view-button").click();
        cy.get("#likes-button").click();
        cy.get("#likes").should("contain", 1);
        cy.contains("second blog").parent().find("#hide-button").click();
      });

      it("the user who created a blog can delete it", function () {
        cy.contains("second blog").parent().find("#view-button").click();
        cy.contains("second blog").parent().find("#remove-button").click();
        cy.get("html").should("contain", "Remove second blog");
      });

      describe("other user login", function () {
        beforeEach(function () {
          cy.login({ username: "messi", password: "scorer" });
        });
        it("other users but the creator do not see the delete button", function () {
          cy.contains("second blog").parent().find("#view-button").click();
          cy.contains("second blog").parent().should("not.contain", "remove");
          cy.contains("second blog").parent().find("#hide-button").click();
        });

        it("first blog clicked once, second twice, third three times", function () {
          cy.contains("first blog").parent().find("#view-button").click();
          cy.contains("second blog").parent().find("#view-button").click();
          cy.contains("third blog").parent().find("#view-button").click();
          cy.contains("first blog").parent().find("#likes-button").click();
          cy.contains("third blog").parent().find("#likes-button").click();
          cy.contains("second blog").parent().find("#likes-button").click();
          cy.contains("third blog").parent().find("#likes-button").click();
          cy.contains("second blog").parent().find("#likes-button").click();
          cy.contains("third blog").parent().find("#likes-button").click();
          cy.get(".blog").eq(0).should("contain", "third blog");
          cy.get(".blog").eq(1).should("contain", "second blog");
          cy.get(".blog").eq(2).should("contain", "first blog");
        });
      });
    });
  });
});
