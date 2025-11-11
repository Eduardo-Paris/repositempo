/* ========================================= */
/* === ARQUIVO JAVASCRIPT (main.js) === */
/* ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // === VARIÁVEIS GLOBAIS ===
    let cart = []; // Nosso carrinho
    let totalPrice = 0; // Preço total

    // === DICIONÁRIO DE INFORMAÇÕES DOS PRODUTOS ===
    const productInfo = {
        'Paracetamol': {
            purpose: 'Propósito: Analgésico e antitérmico.',
            description: 'Descrição longa: Usado para dor e febre. Alivia dores de cabeça, musculares e sintomas de resfriado comum. É um dos medicamentos mais comuns em lares.'
        },
        'Dipirona': {
            purpose: 'Propósito: Analgésico e antitérmico.',
            description: 'Descrição longa: Eficaz contra dor e febre alta. Frequentemente usado para dores de cabeça intensas ou após procedimentos cirúrgicos.'
        },
        'Ibuprofeno': {
            purpose: 'Propósito: Anti-inflamatório, analgésico e antitérmico.',
            description: 'Descrição longa: Usado para dor, febre e inflamação. Muito indicado para dores de garganta, cólicas menstruais e dores de artrite.'
        },
        'Amoxicilina': {
            purpose: 'Propósito: Antibiótico.',
            description: 'Descrição longa: Usado para tratar uma variedade de infecções bacterianas, como sinusite, pneumonia e infecções de ouvido. Requer receita médica.'
        },
        'Loratadina': {
            purpose: 'Propósito: Anti-histamínico (antialérgico).',
            description: 'Descrição longa: Usado para aliviar sintomas de rinite alérgica (espirros, coriza, coceira) e urticária. Não costuma dar sono.'
        },
        'Omeprazol': {
            purpose: 'Propósito: Redutor de acidez do estômago.',
            description: 'Descrição longa: Usado para tratar gastrite, refluxo gastroesofágico e úlceras. Age inibindo a produção de ácido no estômago.'
        },
        'Vitamina C': {
            purpose: 'Propósito: Suplemento vitamínico.',
            description: 'Descrição longa: Usada para fortalecer o sistema imunológico e como antioxidante. Ajuda na prevenção de resfriados e na absorção de ferro.'
        },
        'Xarope para Tosse': {
            purpose: 'Propósito: Alívio da tosse.',
            description: 'Descrição longa: Existem dois tipos principais: expectorantes (para tosse com catarro) e antitussígenos (para tosse seca). A fórmula varia.'
        }
    };

    // === PEGANDO OS ELEMENTOS DO HTML ===
    const infoButtons = document.querySelectorAll('.btn-info');
    const addCartButtons = document.querySelectorAll('.btn-add-cart');
    const cartIcon = document.getElementById('cart-icon');
    
    const infoModal = document.getElementById('info-modal');
    const cartModal = document.getElementById('cart-modal');

    const closeInfoModalBtn = document.getElementById('close-info-modal');
    const closeCartModalBtn = document.getElementById('close-cart-modal');

    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalPurpose = document.getElementById('modal-purpose');
    const modalDescription = document.getElementById('modal-description');

    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalPrice = document.getElementById('cart-total-price');


    // === LÓGICA DO POP-UP "SABER MAIS" ===
    infoButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            const productName = card.querySelector('.product-title').textContent;
            const priceText = card.querySelector('.price').textContent;

            const info = productInfo[productName] || { 
                purpose: 'Propósito: Informação não disponível.', 
                description: 'Descrição longa: Informação não disponível.' 
            };

            // Preenche o pop-up
            modalTitle.textContent = productName;
            modalPrice.textContent = priceText; // Preço redundante
            modalPurpose.textContent = info.purpose; // Propósito
            modalDescription.textContent = info.description; // Descrição longa
            
            // MOSTRA O POP-UP
            infoModal.style.display = 'block';
        });
    });

    // Fecha o pop-up "Saber Mais"
    closeInfoModalBtn.addEventListener('click', () => {
        infoModal.style.display = 'none';
    });

    
    // === LÓGICA DO CARRINHO ===

    // Adiciona ao carrinho
    addCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            const productName = card.querySelector('.product-title').textContent;
            const priceText = card.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('R$ ', '').replace(',', '.'));

            cart.push({ name: productName, price: price });
            totalPrice += price;
            
            updateCartDisplay();
        });
    });

    // Função que atualiza a tela
    function updateCartDisplay() {
        // Atualiza o número vermelho
        cartCount.textContent = cart.length;

        // Limpa a lista no pop-up
        cartItemsList.innerHTML = '';

        // Recria a lista no pop-up
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} <span>R$ ${item.price.toFixed(2).replace('.', ',')}</span>`;
            cartItemsList.appendChild(li);
        });

        // Atualiza o preço total no pop-up
        cartTotalPrice.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    }

    // MOSTRA O POP-UP do carrinho
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    // Fecha o pop-up do carrinho
    closeCartModalBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });


    // Fecha os pop-ups clicando FORA da caixa
    window.addEventListener('click', (event) => {
        if (event.target == infoModal) {
            infoModal.style.display = 'none';
        }
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

});