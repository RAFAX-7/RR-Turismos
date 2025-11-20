//-----------------------pagina do guia---------
if (window.location.pathname.endsWith("guia.html")) {
    // ====== GALERIA LIGHTBOX ======
    const imagensGaleria = document.querySelectorAll(".galeria-img");
    const lightbox = document.getElementById("lightbox");
    const imgLightbox = lightbox.querySelector("img");
    const fecharLightbox = document.getElementById("fecharLightbox");

    imagensGaleria.forEach(img => {
        img.addEventListener("click", () => {
            imgLightbox.src = img.src;
            lightbox.style.display = "flex";
        });
    });

    fecharLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // ====== AVALIAÇÃO GERAL (estrelas do guia) ======
    function criarEstrelas(media) {
        const estrelasDiv = document.getElementById("estrelasGuia");
        estrelasDiv.innerHTML = "";
        for (let i = 1; i <= 5; i++) {
            const span = document.createElement("span");
            span.classList.add("estrela");
            if (i <= media) {
                span.classList.add("ativa");
            }
            span.textContent = "★";
            estrelasDiv.appendChild(span);
        }
    }

    // ====== COMENTÁRIOS ======
    const form = document.getElementById("comentForm");
    const comentariosContainer = document.getElementById("comentariosContainer");
    const verMaisBtn = document.getElementById("verMais");

    // Comentários iniciais (igual seu original)
    let comentarios = [
        {
            nome: "Marina S.",
            comentario: "Donizet foi um guia incrível, muito atencioso e conhecedor dos lugares.",
            estrelas: 5,
            foto: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
            nome: "Lucas T.",
            comentario: "Adorei a excursão com Donizet. Ele tornou tudo muito divertido e educativo.",
            estrelas: 5,
            foto: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
            nome: "Ana P.",
            comentario: "Experiência inesquecível, recomendo para quem gosta de viajar com segurança e informação.",
            estrelas: 5,
            foto: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
            nome: "Carlos M.",
            comentario: "Ótima condução e paciência para responder todas as dúvidas do grupo.",
            estrelas: 5,
            foto: "https://randomuser.me/api/portraits/men/55.jpg",
        },
        {
            nome: "Beatriz F.",
            comentario: "Muito profissional e simpático, fez da viagem algo memorável.",
            estrelas: 5,
            foto: "https://randomuser.me/api/portraits/women/22.jpg",
        },
    ];

    // Exibir inicialmente 3 comentários
    let comentariosVisiveis = 3;

    function exibirComentarios() {
        comentariosContainer.innerHTML = "";

        let listaParaExibir = comentarios.slice(0, comentariosVisiveis);

        listaParaExibir.forEach(c => {
            const div = document.createElement("div");
            div.classList.add("comentario-card");

            let estrelasHtml = "";
            for (let i = 1; i <= 5; i++) {
                estrelasHtml += i <= c.estrelas ? "★" : "☆";
            }

            div.innerHTML = `
          <div class="coment-topo">
            <img src="${c.foto}" alt="Foto de ${c.nome}" />
            <div>
              <strong>${c.nome}</strong>
              <div class="coment-stars" style="color: gold;">${estrelasHtml}</div>
            </div>
          </div>
          <p>${c.comentario}</p>
        `;
            comentariosContainer.appendChild(div);
        });

        if (comentariosVisiveis >= comentarios.length) {
            verMaisBtn.textContent = "Ver menos";
        } else {
            verMaisBtn.textContent = "Ver mais";
        }
    }

    // Alternar ver mais / ver menos
    verMaisBtn.addEventListener("click", () => {
        if (verMaisBtn.textContent === "Ver mais") {
            comentariosVisiveis = comentarios.length;
        } else {
            comentariosVisiveis = 3;
        }
        exibirComentarios();
    });

    // Envio do formulário de comentários
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nomeInput = document.getElementById("nome");
        const comentarioInput = document.getElementById("comentario");
        const estrelasInput = document.querySelectorAll(".estrelas-input .estrela.ativa").length;

        if (!nomeInput.value.trim() || !comentarioInput.value.trim() || estrelasInput === 0) {
            alert("Por favor, preencha todos os campos e selecione a avaliação em estrelas.");
            return;
        }

        comentarios.unshift({
            nome: nomeInput.value.trim(),
            comentario: comentarioInput.value.trim(),
            estrelas: estrelasInput,
            foto: "https://randomuser.me/api/portraits/lego/1.jpg", // Foto genérica
        });

        // Atualiza avaliação média e comentários
        atualizarMediaAvaliacoes();

        // Mostrar somente os primeiros 3 depois de adicionar novo comentário
        comentariosVisiveis = 3;
        exibirComentarios();

        // Limpar formulário e estrelas selecionadas
        nomeInput.value = "";
        comentarioInput.value = "";
        comentarioInput.blur();

        document.querySelectorAll(".estrelas-input .estrela").forEach(s => {
            s.classList.remove("ativa");
            s.setAttribute("aria-checked", "false");
            s.tabIndex = -1;
        });
        document.querySelector(".estrelas-input .estrela").tabIndex = 0;
    });

    // Sistema de seleção de estrelas no formulário (igual seu código original)
    const estrelasInput = document.querySelectorAll(".estrelas-input .estrela");
    estrelasInput.forEach((estrela, idx) => {
        estrela.addEventListener("click", () => {
            setEstrelas(idx + 1);
        });
        estrela.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setEstrelas(idx + 1);
            }
        });
    });

    function setEstrelas(qtde) {
        estrelasInput.forEach((estrela, idx) => {
            if (idx < qtde) {
                estrela.classList.add("ativa");
                estrela.setAttribute("aria-checked", "true");
                estrela.tabIndex = 0;
            } else {
                estrela.classList.remove("ativa");
                estrela.setAttribute("aria-checked", "false");
                estrela.tabIndex = -1;
            }
        });
    }

    // Atualiza média das avaliações (estrelas do guia)
    function atualizarMediaAvaliacoes() {
        let soma = 0;
        comentarios.forEach(c => soma += c.estrelas);
        let media = (soma / comentarios.length) || 0;
        media = Math.round(media);

        criarEstrelas(media);
        document.getElementById("mediaAval").textContent = `Média: ${media}.0 ⭐ (${comentarios.length} avaliações)`;
    }

    // Inicialização
    atualizarMediaAvaliacoes();
    exibirComentarios()
}

//----------------Dark Mode----------------

const iconMoon = document.getElementById("iconMoon");
const iconSun = document.getElementById("iconSun");

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        iconMoon.style.visibility = "hidden";
        iconSun.style.visibility = "visible";
    } else {
        iconMoon.style.visibility = "visible";
        iconSun.style.visibility = "hidden";
    }
}

function toggleLangMenu() {
    document.getElementById("langSelector").classList.toggle("open");
}

function setLanguage(langName) {
    // map friendly names to language codes
    const map = { 'portuguese': 'pt', 'english': 'en', 'spanish': 'es', 'french': 'fr', 'espanhol': 'es', 'inglês': 'en', 'ingles': 'en' };
    const key = (langName || '').toString().toLowerCase();
    const lang = map[key] || key; // if passed a code already, use it

    // 1) Try the visible combo (most direct)
    try {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = lang;
            combo.dispatchEvent(new Event('change'));
            return;
        }
    } catch (e) { console.warn('setLanguage: combo method failed', e); }

    // 2) Try clicking the language link inside the google iframe menu
    try {
        const iframe = document.querySelector('iframe.goog-te-menu-frame');
        if (iframe) {
            const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            const links = innerDoc.querySelectorAll('a');
            for (const link of links) {
                const txt = (link.textContent || link.innerText || '').toLowerCase();
                if (txt.indexOf(key) !== -1 || (link.href || '').indexOf('/' + lang) !== -1) {
                    link.click();
                    return;
                }
            }
        }
    } catch (e) { console.warn('setLanguage: iframe method failed', e); }

    // 3) Cookie fallback: set googtrans cookie and reload (works as last resort)
    try {
        const cookieVal = '/pt/' + lang;
        document.cookie = 'googtrans=' + cookieVal + ';path=/';
        // try to set domain cookie too (may fail on file://)
        try { document.cookie = 'googtrans=' + cookieVal + ';domain=.' + location.hostname + ';path=/'; } catch (e) { }
        // reload to apply
        location.reload();
    } catch (e) { console.warn('setLanguage: cookie fallback failed', e); }
}


function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'pt,en,es,fr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');

    document.addEventListener("DOMContentLoaded", function () {
        const accessBtn = document.querySelector(".accessibility-button");
        const panel = document.querySelector(".accessibility-panel");

        // Mostrar painel quando passa o mouse sobre o botão
        accessBtn.addEventListener("mouseenter", () => {
            panel.classList.add("active");
        });

        // Manter visível se passar o mouse no painel
        panel.addEventListener("mouseenter", () => {
            panel.classList.add("active");
        });

        // Ocultar painel se sair do botão e não estiver sobre o painel
        accessBtn.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!panel.matches(":hover")) {
                    panel.classList.remove("active");
                }
            }, 100);
        });

        // Ocultar ao sair do painel
        panel.addEventListener("mouseleave", () => {
            panel.classList.remove("active");
        });
    });
}

// Configuração do Canvas

const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

// Função para ajustar o tamanho do canvas conforme a janela
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
//========== FIM configuração do Canvas ==========

// Criação das partículas

let particlesArray;

function createParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}
//========== FIM criação das partículas ==========
// Classe Particle (partícula)

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
    }

    // Atualiza a posição da partícula
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Faz a partícula "rebater" nas bordas
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    // Desenha a partícula no canvas
    draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
//========== FIM da classe Particle ==========



// Função para conectar partículas próximas

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = dx * dx + dy * dy;

            if (distance < 10000) {
                ctx.strokeStyle = "rgba(255,255,255,0.05)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}
//========== FIM da função de conexão ==========

// Animação das partículas

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    connect();
    requestAnimationFrame(animate);
}
//========== FIM da animação ==========

// Responsividade - atualiza canvas ao redimensionar a janela
window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
});
//========== FIM da responsividade ==========

// Inicialização
createParticles();
animate();
//========== FIM da inicialização ==========



// Inclusão do ano dinamicamente    

let spansAno = document.querySelectorAll(".AnoAtual");

let novadata = new Date();

let ano = novadata.getFullYear();

spansAno.forEach(function (span) {
    span.innerHTML = ano;
});

if (window.location.pathname.endsWith("agendar.html")) {

    // travel-detail.js — comportamento da galeria, cálculo de reserva, mapa de assentos e modo escuro
    (function () {

        // === GALERIA DE IMAGENS PRINCIPAL ===
        // Obtém a imagem principal e todas as miniaturas (thumbnails)
        const mainImage = document.getElementById('mainImage').querySelector('img');
        const thumbs = document.querySelectorAll('.thumb');

        // Troca a imagem principal ao clicar em uma miniatura
        thumbs.forEach(t => {
            t.addEventListener('click', e => {
                const src = t.getAttribute('data-src').replace(/'$/, '');
                mainImage.src = src;
            });
        });

        // === CÁLCULO DE RESERVA (valor total por quantidade de passagens) ===

        // Captura o valor da passagem individual
        const rateEl = document.getElementById('rate');

        // Captura o campo de quantidade de passagens (pessoas)
        const peopleEl = document.getElementById('people');

        // Captura as datas de entrada e saída
        const startDateEl = document.getElementById('startDate');
        const endDateEl = document.getElementById('endDate');

        // Captura o campo onde será exibido o número de dias
        const daysEl = document.getElementById('days');

        // Captura o campo onde será exibido o valor total
        const totalEl = document.getElementById('total');

        // Captura o botão de calcular/confirmar
        const bookBtn = document.getElementById('bookBtn');

        // Garante que o valor nunca seja menor que 1
        peopleEl.addEventListener('input', () => {
            if (peopleEl.value < 1 || peopleEl.value === '') {
                peopleEl.value = 1;
            }
            updatePrice();
        });

        // Função que calcula a diferença de dias entre as datas
        function calcularDias() {
            const start = new Date(startDateEl.value);
            const end = new Date(endDateEl.value);

            // Cálculo em milissegundos → dias
            const diffTime = end - start;
            let diffDays = diffTime / (1000 * 60 * 60 * 24);

            // Garante que o mínimo é 1 dia
            if (diffDays < 1) diffDays = 1;

            // Exibe o número de dias
            daysEl.textContent = diffDays;
            return diffDays;
        }

        // Função que calcula o valor total (considerando quantidade e dias)
        function updatePrice() {
            // Pega o valor da passagem (ou 0 se estiver vazio)
            const rate = Number(rateEl.value) || 0;

            // Pega a quantidade de passagens (mínimo 1)
            const people = Math.max(1, Number(peopleEl.value) || 1);

            // Pega a quantidade de dias
            const days = calcularDias();

            // Calcula o total (valor × quantidade × dias)
            const total = rate * people * days;

            // Atualiza o campo de total com duas casas decimais
            totalEl.textContent = total.toFixed(2);
        }

        // Atualiza o preço automaticamente sempre que o usuário altera os campos
        [rateEl, peopleEl, startDateEl, endDateEl].forEach(i =>
            i.addEventListener('input', updatePrice)
        );

        // Quando o usuário clica no botão de calcular
        bookBtn.addEventListener('click', () => {
            // Atualiza o valor total
            updatePrice();

            // Exibe o valor calculado em um alerta
            alert('Valor total: R$ ' + totalEl.textContent);
        });

        // Atualiza automaticamente ao carregar
        updatePrice();

        (function createBusLayout() {
            busMap.innerHTML = ''; // Limpa o mapa antes de gerar

            // Captura o elemento onde será exibido o assento selecionado
            const selectedSeatEl = document.getElementById('selectedSeat');

            // Captura a quantidade de pessoas para limitar a seleção
            const peopleEl = document.getElementById('people');

            // Cria a área do motorista
            const driverDiv = document.createElement('div');
            driverDiv.className = 'driver';
            driverDiv.textContent = 'Motorista / Entrada';
            busMap.appendChild(driverDiv);

            // Espaço de perna opcional
            const leg = document.createElement('div');
            leg.className = 'leg-row';
            busMap.appendChild(leg);

            // Define quantidade de fileiras e letras dos assentos
            const rows = 12;
            const seatLettersLeft = ['A', 'B'];  // lado esquerdo
            const seatLettersRight = ['C', 'D']; // lado direito
            let seatNum = 1;

            // Lista para armazenar assentos selecionados
            let selectedSeats = [];

            // Gera automaticamente os assentos do ônibus
            for (let r = 1; r <= rows; r++) {
                // Lado esquerdo
                for (let i = 0; i < seatLettersLeft.length; i++) {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'seat window';
                    const label = `${r}${seatLettersLeft[i]}`;
                    btn.setAttribute('data-seat', label);
                    btn.textContent = label;

                    // Adiciona o evento de clique
                    btn.addEventListener('click', seatClickHandler);
                    busMap.appendChild(btn);
                }

                // Espaço do corredor (vazio)
                const aisle = document.createElement('div');
                aisle.className = 'col-label';
                aisle.textContent = '';
                busMap.appendChild(aisle);

                // Lado direito
                for (let i = 0; i < seatLettersRight.length; i++) {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'seat window';
                    const label = `${r}${seatLettersRight[i]}`;
                    btn.setAttribute('data-seat', label);
                    btn.textContent = label;

                    btn.addEventListener('click', seatClickHandler);
                    busMap.appendChild(btn);
                }
            }

            // Função que define quantos assentos podem ser escolhidos
            function maxSeatsAllowed() {
                const people = Number(peopleEl.value) || 1;
                // Agora: 1 pessoa = 1 assento, 2 pessoas = 2 assentos, etc.
                return people;
            }

            // Atualiza o texto de assentos selecionados
            function updateSelectedDisplay() {
                if (selectedSeats.length === 0) {
                    selectedSeatEl.textContent = 'Nenhum';
                } else {
                    selectedSeatEl.textContent = selectedSeats.join(', ');
                }
            }

            // Evento ao clicar em um assento
            function seatClickHandler(e) {
                const el = e.currentTarget;

                // Ignora se o assento estiver ocupado
                if (el.classList.contains('occupied')) return;

                const seatLabel = el.getAttribute('data-seat');
                const index = selectedSeats.indexOf(seatLabel);
                const maxSeats = maxSeatsAllowed();

                // Se o assento já estiver selecionado → desmarca
                if (index > -1) {
                    selectedSeats.splice(index, 1);
                    el.classList.remove('selected');
                } else {
                    // Se ainda não estiver selecionado → verifica limite
                    if (selectedSeats.length < maxSeats) {
                        selectedSeats.push(seatLabel);
                        el.classList.add('selected');
                    } else {
                        alert(`Você pode selecionar no máximo ${maxSeats} assento(s) para ${peopleEl.value} passagem(ns).`);
                    }
                }

                // Atualiza o texto com os assentos escolhidos
                updateSelectedDisplay();
            }

            // Sempre que mudar a quantidade de pessoas, limpa as seleções antigas
            peopleEl.addEventListener('input', () => {
                document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
                selectedSeats = [];
                updateSelectedDisplay();
            });

        })();

        // === INTERAÇÃO COM MAPA SVG (arrastar marcador) ===
        const marker = document.getElementById('marker');
        const coordsEl = document.getElementById('coords');

        // Permite mover o marcador pelo mapa e mostrar coordenadas
        marker.addEventListener('mousedown', function (ev) {
            const svg = document.getElementById('localMap');
            const pt = svg.createSVGPoint();

            // Função que atualiza posição enquanto arrasta
            function onMove(e) {
                pt.x = e.clientX;
                pt.y = e.clientY;
                const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
                marker.setAttribute('cx', loc.x);
                marker.setAttribute('cy', loc.y);
                coordsEl.textContent = Math.round(loc.x) + ',' + Math.round(loc.y);
            }

            // Quando soltar o clique, para de mover
            function up() {
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', up);
            }

            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', up);
        });

        // === CHAMA O CÁLCULO INICIAL ===
        updatePrice();

    })();
}

// Dropdown Login

function abrirdropdown() {
    const menu = document.getElementById('dropdownentrar');
    menu.classList.toggle('show');

    document.addEventListener('click', function (event) {
        const menuContainer = document.querySelector('.menulogin');
        if (!menulogin.contains(event.target)) {
            menu.classList.remove('show');
        }
    });
}

// Menu hamburguer

let botaomenu = document.querySelector(".botaoMenu");
botaomenu.addEventListener("click", abrirmenu);

let menu = document.querySelector("header nav");

let botaofecharmenu = document.querySelector(".fecharMenu");
botaofecharmenu.addEventListener("click", fecharmenu);

function abrirmenu() {
    menu.style.right = "0";
}

function fecharmenu() {
    menu.style.right = "-100%";
}

// API Para cadastro pessoa física

if (window.location.pathname.endsWith("cadastro-fisica.html")) {

    const API_URL_FISICA = "http://localhost:3000/api/pessoafisica";

    document.getElementById("formCadastro").addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome")?.value.trim() || "";
        const email = document.getElementById("email")?.value.trim() || "";
        const senha = document.getElementById("senha")?.value || "";
        const confirmarsenha = document.getElementById("confirmarsenha")?.value || "";
        const mensagensErro = document.getElementById("mensagensErro");

        let erros = [];

        // --- VALIDAÇÕES ---
        if (nome.length < 3)
            erros.push("O nome deve ter mais de 3 caracteres.");

        if (email && !email.includes("@"))
            erros.push("O e-mail deve conter '@'.");

        if (senha.length < 6)
            erros.push("A senha deve ter no mínimo 6 caracteres.");

        if (senha !== confirmarsenha)
            erros.push("As senhas não coincidem.");

        mensagensErro.style.display = "block";

        if (erros.length > 0) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.innerHTML = "<ul><li>" + erros.join("</li><li>") + "</li></ul>";
            return;
        }

        mensagensErro.className = "mensagem sucesso";
        mensagensErro.textContent = "Enviando...";

        // --- PAYLOAD ---
        const payload = {
            nome: nome,
            email: email,
            senha: senha
        };

        console.log("Payload enviado:", payload);

        // --- POST PARA API ---
        try {
            const response = await fetch(API_URL_FISICA, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                mensagensErro.className = "mensagem erro";
                mensagensErro.textContent = "Erro ao cadastrar no banco.";
                return;
            }

            mensagensErro.className = "mensagem sucesso";
            mensagensErro.textContent = "Cadastro realizado com sucesso!";
            this.reset();

        } catch (error) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.textContent = "Erro de conexão com o servidor.";
            console.error(error);
        }
    });
}

// API Para cadastro pessoa jurídica

if (window.location.pathname.endsWith("cadastro-juridica.html")) {

    const API_URL_JURIDICA = "http://localhost:3000/api/pessoajuridica";

    document.getElementById("formCadastro").addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome")?.value.trim() || "";
        const cpfcnpj = document.getElementById("cpfcnpj")?.value.trim() || "";
        const senha = document.getElementById("senha")?.value || "";
        const confirmarsenha = document.getElementById("confirmarsenha")?.value || "";
        const mensagensErro = document.getElementById("mensagensErro");

        let erros = [];

        // --- VALIDAR NOME ---
        if (nome.length < 3)
            erros.push("O nome comercial deve ter mais de 3 caracteres.");

        // --- VALIDAR CPF/CNPJ ---
        if (cpfcnpj) {
            const apenasNumeros = cpfcnpj.replace(/\D/g, "");
            if (apenasNumeros.length !== 11 && apenasNumeros.length !== 14) {
                erros.push("Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.");
            }
        }

        // --- VALIDAR SENHA ---
        if (senha.length < 6)
            erros.push("A senha deve ter no mínimo 6 caracteres.");

        if (senha !== confirmarsenha)
            erros.push("As senhas não coincidem.");

        mensagensErro.style.display = "block";

        if (erros.length > 0) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.innerHTML = "<ul><li>" + erros.join("</li><li>") + "</li></ul>";
            return;
        }

        mensagensErro.className = "mensagem sucesso";
        mensagensErro.textContent = "Enviando...";

        // --- PAYLOAD ---
        const payload = {
            nome_comercial: nome,
            cpf_cnpj: cpfcnpj.replace(/\D/g, ""),
            senha: senha
        };

        console.log("Payload enviado:", payload);

        // --- POST API ---
        try {
            const response = await fetch(API_URL_JURIDICA, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                mensagensErro.className = "mensagem erro";
                mensagensErro.textContent = "Erro ao cadastrar no banco.";
                return;
            }

            mensagensErro.className = "mensagem sucesso";
            mensagensErro.textContent = "Cadastro realizado com sucesso!";
            this.reset();

        } catch (error) {
            console.error("Erro:", error);
            mensagensErro.className = "mensagem erro";
            mensagensErro.textContent = "Erro de conexão com o servidor.";
        }
    });
}

// Verificação cadastro 

// ========================= PÁGINA: CADASTRO PESSOA FÍSICA =========================
if (window.location.pathname.endsWith("cadastro-fisica.html")) {

    // Ícones animados
    document.addEventListener('DOMContentLoaded', function () {

        const inputNome = document.getElementById('nome');
        const iconNome = document.getElementById('icon-nome');
        if (inputNome && iconNome) {
            inputNome.addEventListener('focus', () => {
                iconNome.setAttribute('trigger', 'loop');
                setTimeout(() => iconNome.removeAttribute('trigger'), 1000);
            });
        }

        const inputEmail = document.getElementById('email');
        const iconEmail = document.getElementById('icon-email');
        if (inputEmail && iconEmail) {
            inputEmail.addEventListener('focus', () => {
                iconEmail.setAttribute('trigger', 'loop');
                setTimeout(() => iconEmail.removeAttribute('trigger'), 900);
            });
        }

        const inputSenha = document.getElementById('senha');
        const iconSenha = document.getElementById('icon-senha');
        if (inputSenha && iconSenha) {
            inputSenha.addEventListener('focus', () => {
                iconSenha.setAttribute('trigger', 'loop');
                setTimeout(() => iconSenha.removeAttribute('trigger'), 900);
            });
        }

        const inputConfirmar = document.getElementById('confirmarsenha');
        const iconConfirmar = document.getElementById('icon-confirmarsenha');
        if (inputConfirmar && iconConfirmar) {
            inputConfirmar.addEventListener('focus', () => {
                iconConfirmar.setAttribute('trigger', 'loop');
                setTimeout(() => iconConfirmar.removeAttribute('trigger'), 900);
            });
        }
    });

    // Validação do formulário pessoa física
    document.getElementById('formCadastro').addEventListener('submit', function (event) {

        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarsenha = document.getElementById('confirmarsenha').value;
        const mensagensErro = document.getElementById('mensagensErro');

        let erros = [];

        if (nome.length <= 3) erros.push("O nome deve ter mais de 3 caracteres.");
        if (!email.includes('@')) erros.push("O email deve conter '@'.");
        if (senha.length < 6) erros.push("A senha deve ter no mínimo 6 caracteres.");
        if (senha !== confirmarsenha) erros.push("A confirmação de senha não corresponde.");

        mensagensErro.style.display = "block";

        if (erros.length > 0) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.innerHTML = "<ul><li>" + erros.join("</li><li>") + "</li></ul>";
        } else {
            mensagensErro.className = "mensagem sucesso";
            mensagensErro.textContent = "Cadastro realizado com sucesso!";
            this.reset();
        }
    });

}


// ========================= PÁGINA: CADASTRO PESSOA JURÍDICA =========================
if (window.location.pathname.endsWith("cadastro-juridica.html")) {

    // Ícones animados
    document.addEventListener('DOMContentLoaded', function () {

        const inputNome = document.getElementById('nome');
        const iconNome = document.getElementById('icon-nome');
        if (inputNome && iconNome) {
            inputNome.addEventListener('focus', () => {
                iconNome.setAttribute('trigger', 'loop');
                setTimeout(() => iconNome.removeAttribute('trigger'), 1000);
            });
        }

        const inputCpfCnpj = document.getElementById('cpfcnpj');
        const iconCpfCnpj = document.getElementById('icon-cpfcnpj');
        if (inputCpfCnpj && iconCpfCnpj) {
            inputCpfCnpj.addEventListener('focus', () => {
                iconCpfCnpj.setAttribute('trigger', 'loop');
                setTimeout(() => iconCpfCnpj.removeAttribute('trigger'), 1000);
            });
        }

        const inputSenha = document.getElementById('senha');
        const iconSenha = document.getElementById('icon-senha');
        if (inputSenha && iconSenha) {
            inputSenha.addEventListener('focus', () => {
                iconSenha.setAttribute('trigger', 'loop');
                setTimeout(() => iconSenha.removeAttribute('trigger'), 900);
            });
        }

        const inputConfirmar = document.getElementById('confirmarsenha');
        const iconConfirmar = document.getElementById('icon-confirmarsenha');
        if (inputConfirmar && iconConfirmar) {
            inputConfirmar.addEventListener('focus', () => {
                iconConfirmar.setAttribute('trigger', 'loop');
                setTimeout(() => iconConfirmar.removeAttribute('trigger'), 900);
            });
        }
    });

    // Validação do formulário pessoa jurídica
    document.getElementById('formCadastro').addEventListener('submit', function (event) {

        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const cpfcnpj = document.getElementById('cpfcnpj').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarsenha = document.getElementById('confirmarsenha').value;
        const mensagensErro = document.getElementById('mensagensErro');

        let erros = [];

        if (nome.length <= 3) erros.push("O nome deve ter mais de 3 caracteres.");
        if (cpfcnpj.length < 11 || cpfcnpj.length > 18) erros.push("Informe um CPF ou CNPJ válido.");
        if (senha.length < 6) erros.push("A senha deve ter no mínimo 6 caracteres.");
        if (senha !== confirmarsenha) erros.push("A confirmação de senha não corresponde.");

        mensagensErro.style.display = "block";

        if (erros.length > 0) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.innerHTML = "<ul><li>" + erros.join("</li><li>") + "</li></ul>";
        } else {
            mensagensErro.className = "mensagem sucesso";
            mensagensErro.textContent = "Cadastro realizado com sucesso!";
            this.reset();
        }
    });

}


// ========================= PÁGINA: ACESSAR LOGIN =========================
if (window.location.pathname.endsWith("acessar.html")) {

    document.getElementById("formLogin").addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const mensagensErro = document.getElementById("mensagensErro");

        let erros = [];

        if (nome.length < 3) erros.push("O nome deve ter pelo menos 3 caracteres.");
        if (senha.length < 6) erros.push("A senha deve ter pelo menos 6 caracteres.");

        mensagensErro.style.display = "block";

        if (erros.length > 0) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.innerHTML = "<ul><li>" + erros.join("</li><li>") + "</li></ul>";
        } else {
            mensagensErro.className = "mensagem sucesso";
            mensagensErro.textContent = "Acessando...";
            this.reset();
        }
    });
}


// ========================= PÁGINA: CONTATO =========================
if (window.location.pathname.endsWith("contato.html")) {

    document.getElementById("formContato").addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const empresa = document.getElementById("empresa").value.trim();
        const cidade = document.getElementById("cidade").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const assunto = document.getElementById("assunto").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();
        const mensagensErro = document.getElementById("mensagensErro");

        let erros = [];

        if (nome.length < 3) erros.push("O nome deve ter pelo menos 3 caracteres.");
        if (empresa.length < 2) erros.push("Informe o nome da empresa.");
        if (cidade.length < 2) erros.push("Informe a cidade.");
        if (!email.includes("@")) erros.push("Informe um email válido.");
        if (telefone.length < 8) erros.push("Informe um telefone válido.");
        if (assunto.length < 3) erros.push("Informe o assunto.");
        if (mensagem.length < 10) erros.push("A mensagem deve ter no mínimo 10 caracteres.");

        mensagensErro.style.display = "block";

        if (erros.length > 0) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.innerHTML = "<ul><li>" + erros.join("</li><li>") + "</li></ul>";
        } else {
            mensagensErro.className = "mensagem sucesso";
            mensagensErro.textContent = "Mensagem enviada com sucesso!";
            this.reset();
        }
    });

}

// Banner slides

if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {

    const slidesContainer = document.querySelector(".slides");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentIndex = 1;
    let autoSlideInterval;
    let isTransitioning = false;

    const slides = slidesContainer.children;
    const totalSlides = dots.length;

    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);

    slidesContainer.insertBefore(lastSlideClone, slides[0]);
    slidesContainer.appendChild(firstSlideClone);

    slidesContainer.style.transform = `translateX(-${currentIndex * 100}vw)`;

    function updateSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        slidesContainer.style.transition = "transform 0.5s ease-in-out";
        slidesContainer.style.transform = `translateX(-${index * 100}vw)`;

        dots.forEach(dot => dot.classList.remove("active"));
        dots[(index - 1 + totalSlides) % totalSlides].classList.add("active");

        currentIndex = index;

        setTimeout(() => {
            if (currentIndex === totalSlides + 1) {
                slidesContainer.style.transition = "none";
                slidesContainer.style.transform = `translateX(-100vw)`;
                currentIndex = 1;
            }

            if (currentIndex === 0) {
                slidesContainer.style.transition = "none";
                slidesContainer.style.transform = `translateX(-${totalSlides * 100}vw)`;
                currentIndex = totalSlides;
            }

            isTransitioning = false;
        }, 500);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            updateSlide(currentIndex + 1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    nextBtn.addEventListener("click", () => {
        updateSlide(currentIndex + 1);
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        updateSlide(currentIndex - 1);
        resetAutoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            let index = parseInt(dot.dataset.index);
            updateSlide(index + 1);
            resetAutoSlide();
        });
    });

    updateSlide(currentIndex);
    startAutoSlide();
}

// Verificação cadastro 

if (window.location.pathname.endsWith("agendar.html")) {

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupGaleria);
    } else {
        try { setupGaleria(); } catch (e) { }
    }
}