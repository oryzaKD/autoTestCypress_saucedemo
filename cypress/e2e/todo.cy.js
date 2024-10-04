beforeEach(() => {
  // Kunjungi halaman login sebelum setiap test dijalankan
  cy.visit('https://www.saucedemo.com/');
});

it('should display the login page correctly', () => {
  // Memastikan elemen input email dan password serta tombol login ada
  cy.get('input[name="user-name"]').should('be.visible');
  cy.get('input[name="password"]').should('be.visible');
  cy.get('input[type="submit"]').should('be.visible');
});

it('should login successfully with correctly user', () => {
  // Isi input email dan password dengan kredensial yang benar
  cy.get('input[name="user-name"]').type('standard_user');
  cy.get('input[name="password"]').type('secret_sauce');

  // Click button login
  cy.get('input[type="submit"]').click();

  // Memastikan pengguna diarahkan ke halaman dashboard setelah login
  cy.url().should('include', 'https://www.saucedemo.com/inventory.html');
  cy.contains('Swag Labs').should('be.visible');
});

// it('should show error message with invalid credentials', () => {
//   // Isi input email dan password dengan kredensial yang salah
//   cy.get('input[name="email"]').type('user@example.com');
//   cy.get('input[name="password"]').type('wrongpassword');

//   // Klik tombol login
//   cy.get('button[type="submit"]').click();

//   // Memastikan pesan error muncul
//   cy.get('.error-message').should('be.visible')
//     .and('contain', 'Invalid email or password');
// });