NPM version: 10.9.2
Node version: v22.17.0
Cypress version: 14.5.2


🧪 Pré-condições: Login


✅ Cenário: Acesso com credenciais válidas

- Dado que estou na página de login do SauceDemo

- Quando insiro o usuário "standard_user" e a senha "secret_sauce"

- E clico no botão de login

- Então eu devo ser redirecionado para a página de produtos

- E o título "Products" deve ser visível


✅ Cenário: Acesso com credenciais incorretas

- Dado que estou na página de login do SauceDemo

- Quando eu insiro o usuário "teste" e a senha "teste"

- E eu clico no botão de login

- Então a mensagem "Epic sadface: Username and password do not match any user in this service" deve ser visível


✅ Cenário: Acesso com usuário bloqueado

- Dado que estou na página de login do SauceDemo

- Quando eu insiro o usuário "locked_out_user" e a senha "secret_sauce"

- E eu clico no botão de login

- Então a mensagem "Epic sadface: Sorry, this user has been locked out." deve ser visível


✅ Cenário: Acesso com usuário em letras maiúsculas

- Dado que estou na página de login do SauceDemo

- Quando eu insiro o usuário "STANDARD_USER" e a senha "secret_sauce"

- E eu clico no botão de login

- Então a mensagem "Epic sadface: Username and password do not match any user in this service" deve ser visível


🛒Cenário 2: Simulação de compra 


✅ Cenário: Adicionar e remover produtos do carrinho

- Dado que estou logado no sistema

- E estou na página de produtos

- Quando eu adiciono "Sauce Labs Backpack" ao carrinho a partir da página inicial

- E eu adiciono "Sauce Labs Bolt T-Shirt" acessando a página de detalhes do produto

- E clico no ícone do carrinho

- Então tenho que ser direcionado à página do carrinho

- E o contador de itens no carrinho deve mostrar "2"

- Quando eu removo o item "Sauce Labs Bolt T-Shirt" do carrinho

- Então o contador do carrinho deve ser atualizado para "1"


❌ Cenário: Tentativa de prosseguir para o checkout com carrinho vazio

- Dado que estou logado no sistema

- E estou na página de produtos

- Quando eu clico no ícone do carrinho

- E clico no botão "Checkout"

- Então uma mensagem de erro informando que não possuo itens no carrinho deve ser exibida


✅ Cenário: Cancelar compra na opção "Cancel"

- Dado que estou logado no sistema

- E estou na página de produtos

- Quando eu adiciono "Sauce Labs Backpack" ao carrinho a partir da página inicial

- E eu adiciono "Sauce Labs Bolt T-Shirt" acessando a página de detalhes do produto

- E clico no ícone do carrinho

- Então tenho que ser direcionado a pagina do carrinho

- Quando clico no botão "Checkout"

- E clico no botão "Cancel"

- Então devo retornar à página do carrinho

- E o carrinho deve continuar mostrando 2 itens


💰 Cenário 2: Realizar compra 


✅ Cenário: Adicionar produtos ao carrinho e finalizar a compra

- Dado que estou logado no sistema

- E estou na página de produtos

- Quando eu adiciono "Sauce Labs Backpack" ao carrinho a partir da página inicial

- E eu adiciono "Sauce Labs Bolt T-Shirt" acessando a página de detalhes do produto

- E clico no ícone do carrinho

- Então tenho que ser direcionado a pagina do carrinho

- E o contador de itens no carrinho deve mostrar "2"

- Quando clico no botão "Checkout"

- E preencho "First Name" 

- E preencho "Last Name"

- E preencho "Postal Code"

- E clico no botão "Continue"

- E clico no botão "Finish"

- Então uma mensagem de sucesso da compra deve ser exibida ("Thank you for your order!")


✅ Cenário: Não preenchimento do campo First Name

- Dado que estou logado no sistema

- E estou na página do carrinho de compras

- E clico no botão "Checkout"

- E preencho o campo "Last Name" com "test"

- E preencho o campo "Postal Code" com "test"

- E o campo "First Name" está vazio

- Quando clico no botão "Continue" 

- Então uma mensagem de erro "Error: First Name is required" deve ser exibida


✅ Cenário: Não preenchimento do campo Last Name

- Dado que estou logado no sistema

- E estou na página do carrinho de compras

- E clico no botão "Checkout"

- E preencho o campo "First Name" com "test"

- E preencho o campo "Postal Code" com "test"

- E o campo "Last Name" está vazio

- Quando clico no botão "Continue" 

- Então uma mensagem de erro "Error: Last Name is required" deve ser exibida


✅ Cenário: Não preenchimento do campo Postal Code

- Dado que estou logado no sistema

- E estou na página do carrinho de compras

- E clico no botão "Checkout"

- E preencho o campo "First Name" com "test"

- E preencho o campo "Last Name" com "test"

- E o campo "Postal Code" está vazio

- Quando clico no botão "Continue" 

- Então uma mensagem de erro "Error: Postal Code is required" deve ser exibida