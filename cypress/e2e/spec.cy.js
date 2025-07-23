//Login no sistema
function login(user,password) {
  cy.get('[data-test="username"]').type(user)
  cy.get('[data-test="password"]').type(password)
  cy.get('[data-test="login-button"]').click()
}

//Verificar se o login foi bem sucedido
function verifyLogin() {
  cy.url().should('include', '/inventory.html')
  cy.contains('span.title', 'Products').should('be.visible')
}

//Adição dos produtos ao carrinho, Produto01 será adicionado no menu inicial e Produto02 será adicioionado acessando a pagina do mesmo
function addProduct(product01,product02) {
  cy.get(product01).click()
  cy.get(product02).click()
  cy.get('[data-test="inventory-item-desc"]').should('be.visible')
  cy.get('[data-test="add-to-cart"]').click()
}

//Preenchimento dos campos "Checkout: Your Information"
function stepOne(name,lastName,postalCode) {
    cy.url().should('include', 'checkout-step-one.html')
    cy.get('[data-test="firstName"]').type(name)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
}

//Finalização e verificação da conclusão da compra
function stepTwo() {
  cy.get('[data-test="continue"]').click()

  cy.url().should('include', 'checkout-step-two.html')
  cy.get('[data-test="finish"]').click()
  cy.get('[data-test="complete-header"]').should('be.visible')
}

describe('Pré condições - teste de acesso ', () => {
  beforeEach(()=>{
    cy.visit('https://www.saucedemo.com')
  })
  
  it('Acesso com credenciais incorretas', () => {
    login('teste', 'teste')
    cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
  })

  it('Acesso com usuario bloqueado', () => {
    login('locked_out_user','secret_sauce')
    cy.contains('Epic sadface: Sorry, this user has been locked out.').should('be.visible')
  })

  it('Acesso com usuario em letras maiusculas', () =>{
    login('STANDARD_USER','secret_sauce')
    cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible')
  })

  it('Acesso ao site com credenciais corretas', () => {
    login('standard_user','secret_sauce')

    verifyLogin()
  })

})

describe('Cenário 2: Simulação de compra', () => {
  beforeEach(()=> {
    cy.visit('https://www.saucedemo.com')
    login('standard_user','secret_sauce')

    verifyLogin()
  })

  it('Adicionar dois produtos ao carrinho, remover e verificar atualização', () => {

    addProduct('[data-test="add-to-cart-sauce-labs-backpack"]', '[data-test="item-1-title-link"] > [data-test="inventory-item-name"]')

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')

    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')

    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click()

    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1')
  })

  it('Verificar se é possivel prosseguir para o checkout com o carrinho vazio', () => {

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')

    cy.get('[data-test="checkout"]').click()
    stepOne('test', 'test', 'test')
    stepTwo()
    })

  it('Verificar opção "Cancel" do Checkout', () => {

    addProduct('[data-test="add-to-cart-sauce-labs-backpack"]', '[data-test="item-1-title-link"] > [data-test="inventory-item-name"]')

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')

    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')

    cy.get('[data-test="cancel"]').click()
    cy.url().should('include','/cart.html')
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')
  })
})

describe('Cenário 3: Realizar compra', () => {
beforeEach(()=> {
    cy.visit('https://www.saucedemo.com')
    login('standard_user','secret_sauce')

    verifyLogin()
  })
  it('Adicionar 2 produtos diferentes ao carrinho e finalizar a compra', () => {
    
    addProduct('[data-test="add-to-cart-sauce-labs-bike-light"]', '[data-test="item-3-title-link"] > [data-test="inventory-item-name"]')

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')
    cy.get('[data-test="cart-list"] > :nth-child(3)').should('be.visible')
    cy.get('[data-test="cart-list"] > :nth-child(4)').should('be.visible')
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2')

    cy.get('[data-test="checkout"]').click()

    stepOne('Maria', 'Silva','123456')
    stepTwo()

  })

  it('Não preenchimento do campo First Name no checkout', () => {

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    stepOne('test','test','test')
    cy.get('[data-test="firstName"]').clear()
    cy.get('[data-test="continue"]').click()
    cy.contains('Error: First Name is required').should('be.visible')
  })
  
  it('Não preenchimento do campo Last Name no checkout', () => {

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    stepOne('test','test','test')
    cy.get('[data-test="lastName"]').clear()
    cy.get('[data-test="continue"]').click()
    cy.contains('Error: Last Name is required').should('be.visible')
  })

  it('Não preenchimento do campo Postal Code no checkout', () => {

    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    stepOne('test','test','test')
    cy.get('[data-test="postalCode"]').clear()
    cy.get('[data-test="continue"]').click()
    cy.contains('Error: Postal Code is required').should('be.visible')
  })

})