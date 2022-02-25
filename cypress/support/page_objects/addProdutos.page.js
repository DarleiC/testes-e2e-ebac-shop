class addProduto {
    adicionaProduto(nome, tamanho, cor, quantidade) {
        cy.get('[class="product-block grid"]')
            .contains(nome).click()
        cy.wait(200)
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-' + cor).click() // Mudei para Green, porque o Purple estava fora de estoque
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }
}
export default new addProduto()