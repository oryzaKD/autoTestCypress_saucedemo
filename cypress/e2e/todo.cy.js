describe('saucedemo', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    const baseUrl = Cypress.config('baseUrl');
    // cy.viewport(800, 600); // Adjust dimensions as needed
    cy.viewport(1280, 720)
    cy.visit(baseUrl);
    // Inject CSS to set the zoom level to 70%
    cy.document().then((doc) => {
      const style = doc.createElement('style');
      style.innerHTML = 'body { transform: scale(0.7); transform-origin: 0 0; }';
      doc.head.appendChild(style);
    });
  });

  it('Make sure the email and password input elements and login button are present.', () => {
    cy.get('input[name="user-name"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="login-button"]').should('be.visible');
  });

  it('Input Username and Password using locked values', () => {
    cy.get('input[name=user-name]').type('locked_out_user');
    cy.get('input[name=password]').type('secret_sauce');
    cy.get('input[name="login-button"]').click();
    cy.contains('Epic sadface: Sorry, this user has been locked out.').should('be.visible');
  });

  it('Input Username dan Password correctly values', () => {
    cy.get('input[name="user-name"]').type('standard_user');
    cy.get('input[name="password"]').type('secret_sauce');
    cy.get('input[type="submit"]').click();
    cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
    cy.contains('Products').should('be.visible');

    // Add some Products to Cart
    cy.get('button[name="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('button[name="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('button[name="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.wait(3000)

    //Check products in Menu "Your Cart"
    cy.get('div[id="shopping_cart_container"]').click();
    cy.url().should('include', 'https://www.saucedemo.com/cart.html');
    cy.contains('Your Cart').should('be.visible');
    cy.wait(3000)

    //Try to remove Product and Click button Continue Shopping
    cy.get('button[id="remove-sauce-labs-bolt-t-shirt"]').click();
    cy.get('button[id="continue-shopping"]').click();
    cy.wait(3000)
    cy.get('button[id="add-to-cart-sauce-labs-fleece-jacket"]').click();
    cy.get('div[id="shopping_cart_container"]').click();
    cy.url().should('include', 'https://www.saucedemo.com/cart.html');
    cy.contains('Your Cart').should('be.visible');
    cy.wait(3000)

    // //Checkout the Products
    cy.get('button[id="checkout"]').click();
    cy.url().should('include', 'https://www.saucedemo.com/checkout-step-one.html');
    cy.contains('Checkout: Your Information').should('be.visible');
    cy.wait(3000)

    // //Input Form Information
    cy.get('input[name="firstName"]').type('Bunga');
    cy.get('input[name="lastName"]').type('Citra');
    cy.get('input[name="postalCode"]').type('12345');
    cy.get('input[name="continue"]').click();
    cy.url().should('include', 'https://www.saucedemo.com/checkout-step-two.html');
    cy.contains('Checkout: Overview').should('be.visible');
    cy.wait(3000)

    // //Finish the process
    cy.get('button[name="finish"]').click();
    cy.url().should('include', 'https://www.saucedemo.com/checkout-complete.html');
    cy.contains('Checkout: Complete!').should('be.visible');
    cy.get('button[name="back-to-products"]').click();
    cy.wait(3000)

    //Logout
    cy.get('button[id="react-burger-menu-btn"]').click();
    cy.wait(3000)
    cy.get('#logout_sidebar_link').should('be.visible').click();
  });

})