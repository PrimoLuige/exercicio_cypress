describe('Testes de funcionalidades da Agenda de Contatos', () => {
  const nomeContato = 'João Silva';
  const nomeAlterado = 'João Souza';

  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/');
  });

  it('Deve incluir um novo contato', () => {
    cy.get('input[placeholder="Nome"]').type(nomeContato);
    cy.get('input[placeholder="Telefone"]').type('123456789');
    cy.get('input[placeholder="E-mail"]').type('joao@exemplo.com');
    cy.get('button.adicionar').click();

    // Verifica se o contato foi adicionado
    cy.contains(nomeContato).should('exist');
  });

  it('Deve alterar um contato', () => {
    // Adiciona um novo contato para depois editar
    cy.get('input[placeholder="Nome"]').type(nomeContato);
    cy.get('input[placeholder="Telefone"]').type('123456789');
    cy.get('input[placeholder="E-mail"]').type('joao@exemplo.com');
    cy.get('button.adicionar').click();

    // Clica no botão de editar do contato
    cy.contains(nomeContato)
      .parents('.contato')
      .find('button.edit')
      .click();

    // Altera o nome
    cy.get('input[placeholder="Nome"]').clear().type(nomeAlterado);
    cy.get('button.alterar').click();

    // Verifica se o nome foi alterado
    cy.contains(nomeAlterado).should('exist');
  });

  it('Deve remover um contato', () => {
    // Adiciona um novo contato
    cy.get('input[placeholder="Nome"]').type('João Silva');
    cy.get('input[placeholder="E-mail"]').type('joao@email.com');
    cy.get('input[placeholder="Telefone"]').type('123456789');
    cy.get('button.adicionar').click();

    // Agora deleta o contato com base no e-mail único
    cy.contains('li', 'joao@email.com')
      .parents('.contato')
      .within(() => {
        cy.get('button.delete').click();
      });

    // Verifica se sumiu
    cy.contains('li', 'joao@email.com').should('not.exist');
  });


});

