describe('Testes de funcionalidades da Agenda de Contatos', () => {
  const nomeContato = 'João Silva';
  const nomeAlterado = 'João Souza';

  beforeEach(() => {
    // Visitar a aplicação antes de cada teste
    cy.visit('https://agenda-contatos-react.vercel.app/');
  });

  it('Deve incluir um novo contato', () => {
    cy.get('input[placeholder="Nome"]').type(nomeContato);
    cy.get('input[placeholder="Telefone"]').type('123456789');
    cy.get('input[placeholder="E-mail"]').type('joao@exemplo.com');
    cy.get('button.adicionar').click();

    // Verificar se o contato foi adicionado
    cy.contains(nomeContato).should('exist');
  });

  it('Deve alterar um contato', () => {
    // Adicionar um novo contato para alterar
    cy.get('input[placeholder="Nome"]').type(nomeContato);
    cy.get('input[placeholder="Telefone"]').type('123456789');
    cy.get('input[placeholder="E-mail"]').type('joao@exemplo.com');
    cy.get('button.adicionar').click();

    // Alterar o nome do contato
    cy.contains(nomeContato)
      .parent()
      .find('[data-testid="btn-editar"]')
      .click();
    cy.get('[data-testid="nome"]').clear().type(nomeAlterado);
    cy.get('[data-testid="btn-salvar"]').click();

    // Verificar se o nome foi alterado
    cy.contains(nomeAlterado).should('exist');
  });

  it('Deve remover um contato', () => {
    // Adicionar um novo contato para remover
    cy.get('input[placeholder="Nome"]').type(nomeContato);
    cy.get('input[placeholder="Telefone"]').type('123456789');
    cy.get('input[placeholder="E-mail"]').type('joao@exemplo.com');
    cy.get('button.adicionar').click();

    // Remover o contato
    cy.contains(nomeContato)
      .parent()
      .find('[data-testid="btn-remover"]')
      .click();

    // Verificar se o contato foi removido
    cy.contains(nomeContato).should('not.exist');
  });
});
