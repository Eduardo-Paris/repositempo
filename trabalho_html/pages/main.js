document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================================
    // PARTE 1: LÓGICA DO POP-UP DE INFORMAÇÃO
    // ============================================================
    const modalInfo = document.getElementById('info-modal');
    const infoTitulo = document.getElementById('modal-titulo');
    const infoImg = document.getElementById('modal-img');
    const infoPreco = document.getElementById('modal-preco');
    const infoTexto = document.getElementById('modal-texto');
    
    function abrirModalInfo(dados) {
        infoTitulo.textContent = dados.titulo;
        infoImg.src = dados.imagem; 
        infoPreco.textContent = "Valor: R$ " + dados.preco.replace('.', ',');
        infoTexto.textContent = dados.texto;
        // Adiciona a classe 'mostrar' definida no CSS
        modalInfo.classList.add('mostrar');
    }

    document.querySelectorAll('.btn-info').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dadosDoProduto = {
                titulo: e.target.dataset.titulo,
                preco: e.target.dataset.preco,
                imagem: e.target.dataset.imagem,
                texto: e.target.dataset.texto
            };
            abrirModalInfo(dadosDoProduto);
        });
    });

    // Fechar Modal Info
    document.getElementById('btn-fechar-info').addEventListener('click', () => { 
        modalInfo.classList.remove('mostrar'); 
    });
    document.getElementById('btn-fechar-info-botao').addEventListener('click', () => { 
        modalInfo.classList.remove('mostrar'); 
    });


    // ============================================================
    // PARTE 2: LÓGICA DO CARRINHO (POP-UP + SALVAMENTO)
    // ============================================================
    
    // Tenta pegar do localStorage, se não existir, inicia vazio
    let carrinho = JSON.parse(localStorage.getItem('meuCarrinhoLoja')) || [];

    const modalCarrinho = document.getElementById('carrinho-modal');
    const listaCarrinho = document.getElementById('lista-itens-popup');
    const totalCarrinhoElemento = document.getElementById('preco-total-popup');
    const contadorWidget = document.getElementById('contador-carrinho');

    // Função auxiliar para salvar no navegador
    function salvarCarrinho() {
        localStorage.setItem('meuCarrinhoLoja', JSON.stringify(carrinho));
        atualizarCarrinhoUI();
    }

    // Renderiza a lista visual
    function atualizarCarrinhoUI() {
        listaCarrinho.innerHTML = '';
        let totalDinheiro = 0;
        let totalItens = 0;

        if (carrinho.length === 0) {
            listaCarrinho.innerHTML = '<p style="text-align:center; color:#777; padding:20px;">Seu carrinho está vazio.</p>';
        }

        carrinho.forEach((item, index) => {
            let subtotal = item.preco * item.qtd;
            totalDinheiro += subtotal;
            totalItens += item.qtd;

            const div = document.createElement('div');
            div.classList.add('item-carrinho');
            div.innerHTML = `
                <div class="item-linha-topo">${item.nome}</div>
                <div class="item-linha-meio">Qtd: ${item.qtd} x R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                <div class="item-linha-fundo">
                    <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-remover" onclick="removerItem(${index})">Remover</button>
                </div>
            `;
            listaCarrinho.appendChild(div);
        });

        totalCarrinhoElemento.textContent = 'R$ ' + totalDinheiro.toFixed(2).replace('.', ',');
        contadorWidget.textContent = totalItens;
    }

    // Adicionar Item
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nome = e.target.dataset.nome;
            const preco = parseFloat(e.target.dataset.preco);

            let itemExistente = carrinho.find(i => i.nome === nome);
            
            if (itemExistente) {
                itemExistente.qtd++;
            } else {
                carrinho.push({ nome: nome, preco: preco, qtd: 1 });
            }
            
            salvarCarrinho(); // Salva e Atualiza o contador
        });
    });

    // Função Global Remover
    window.removerItem = function(index) {
        carrinho.splice(index, 1);
        salvarCarrinho(); // Salva e Atualiza
    }

    // --- ABRIR E FECHAR CARRINHO ---

    const abrirCarrinho = () => {
        // Usa a classe 'mostrar' do CSS para exibir o modal
        modalCarrinho.classList.add('mostrar');
        atualizarCarrinhoUI();
    };
    
    const fecharCarrinho = () => {
        // Remove a classe para esconder
        modalCarrinho.classList.remove('mostrar');
    };

    // Eventos dos botões do carrinho (Icone e Texto)
    const btnIcone = document.getElementById('btn-abrir-popup-icone');
    const btnTexto = document.getElementById('btn-abrir-popup-texto');

    if(btnIcone) btnIcone.addEventListener('click', abrirCarrinho);
    if(btnTexto) btnTexto.addEventListener('click', abrirCarrinho);

    // Botões de Fechar
    document.getElementById('btn-fechar-carrinho-x').addEventListener('click', fecharCarrinho);
    document.getElementById('btn-fechar-carrinho-texto').addEventListener('click', fecharCarrinho);

    // Fechar ao clicar fora (no fundo preto)
    window.addEventListener('click', (e) => {
        if (e.target === modalInfo) modalInfo.classList.remove('mostrar');
        if (e.target === modalCarrinho) modalCarrinho.classList.remove('mostrar');
    });

    // Inicializa a UI ao carregar a página
    atualizarCarrinhoUI();
});