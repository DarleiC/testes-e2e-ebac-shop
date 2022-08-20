/// <reference types="cypress" />

import addProduto from '../support/page_objects/addProdutos.page';
const dadosProdutos = require('../fixtures/produtos.json');
var faker = require('faker-br');
describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */
    
    beforeEach(() => {
        cy.visit('produtos/')
    });
    it.skip('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let empresaFaker = faker.company.companyName()
        let enderecoFaker = faker.address.streetName()
        let complementoFaker = faker.lorem.sentence()
        let cidadeFaker = faker.address.city()
        let estatdoFaker = faker.address.state()
        let cepFaker = faker.address.zipCodeValid()
        let telefoneFaker = faker.phone.phoneNumber()
        let emailFaker = faker.internet.userName()
        let dominio = '@ebac.com' 
        let adicionaisFaker = faker.lorem.paragraph()

        addProduto.adicionaProduto(
            dadosProdutos[0].nome,
            dadosProdutos[0].tamanho,
            dadosProdutos[0].cor,
            dadosProdutos[0].quantidade
        )
        cy.get('.woocommerce-message').should('contain', '“'+ dadosProdutos[0].nome +'” foi adicionado no seu carrinho.')
        cy.visit('produtos/')
        addProduto.adicionaProduto(
            dadosProdutos[1].nome,
            dadosProdutos[1].tamanho,
            dadosProdutos[1].cor,
            dadosProdutos[1].quantidade
        )
        cy.get('.woocommerce-message').should('contain', '“'+ dadosProdutos[1].nome +'” foi adicionado no seu carrinho.')
        cy.visit('produtos/')
        addProduto.adicionaProduto(
            dadosProdutos[2].nome,
            dadosProdutos[2].tamanho,
            dadosProdutos[2].cor,
            dadosProdutos[2].quantidade
        )
        cy.get('.woocommerce-message').should('contain', '“'+ dadosProdutos[2].nome +'” foi adicionado no seu carrinho.')
        cy.visit('produtos/')
        addProduto.adicionaProduto(
            dadosProdutos[3].nome,
            dadosProdutos[3].tamanho,
            dadosProdutos[3].cor,
            dadosProdutos[3].quantidade
        )
        cy.get('.woocommerce-message').should('contain', '“'+ dadosProdutos[3].nome +'” foi adicionado no seu carrinho.')
            // verificar quantidade no carrinho
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 4)
            // concluir compra
        cy.get('.woocommerce-message > .button').contains('VER CARRINHO',{ matchCase: false }).click()
            .get('.breadcrumb > .active').should('contain','Carrinho')
        cy.get('.checkout-button').contains('CONCLUIR COMPRA',{ matchCase: false }).click()
            .get('.breadcrumb > .active').should('contain','Checkout')
            // detalhes do faturamento
        cy.detalheFaturamento(nomeFaker, sobrenomeFaker, empresaFaker, 'Brasil', enderecoFaker, complementoFaker, cidadeFaker, estatdoFaker, cepFaker, telefoneFaker, emailFaker + dominio, adicionaisFaker)
            // checar se foi finalizado com sucesso
        cy.get('#terms').check()
        cy.get('#place_order').contains('FINALIZAR COMPRA',{ matchCase: false }).click()
        cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.')
    });
});