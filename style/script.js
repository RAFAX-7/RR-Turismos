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
    const iframe = document.querySelector('iframe.goog-te-menu-frame');
    if (!iframe) return;

    const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    const links = innerDoc.querySelectorAll('a');

    for (const link of links) {
        if (link.textContent.toLowerCase().includes(langName.toLowerCase())) {
            link.click();
            break;
        }
    }
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

// Envia Infromações do Card para a página de agendamento

// Função que é chamada na index.html ao clicar no card
function abrirAgendar(card) {
    const local = card.querySelector('.Local')?.innerText || '';
    const guia = card.querySelector('.guiaNome')?.innerText || '';
    const ida = card.querySelector('.ida')?.innerText || '';
    const volta = card.querySelector('.volta')?.innerText || '';

    // const titulo = card.querySelector('.tituloViagem')?.innerText || '';
    const descricao = card.querySelector('.descricaoViagem')?.innerText || '';


    const img1 = card.querySelector('.verimg1')?.src || '';
    const img2 = card.querySelector('.verimg2')?.src || '';
    const img3 = card.querySelector('.verimg3')?.src || '';
    const img4 = card.querySelector('.verimg4')?.src || '';

    const reservaElem = card.querySelector('.reserva');
    const reservaHTML = reservaElem ? encodeURIComponent(reservaElem.outerHTML) : '';

    const url = new URL('agendar.html', window.location.origin);
    url.searchParams.set('local', local);
    url.searchParams.set('guia', guia);
    url.searchParams.set('ida', ida);
    url.searchParams.set('volta', volta);
    url.searchParams.set('descricao', descricao);
    url.searchParams.set('img1', img1);
    url.searchParams.set('img2', img2);
    url.searchParams.set('img3', img3);
    url.searchParams.set('img4', img4);
    url.searchParams.set('reservaHTML', reservaHTML);

    window.location.href = url.toString();
}

// Script que roda na agendar.html para preencher os dados da URL
function preencherDadosDaURL() {
    if (!window.location.search) return;

    const p = new URLSearchParams(window.location.search);

    // document.getElementById('tituloViagem').textContent = p.get('titulo') || 'Título não encontrado';
    document.getElementById('descricaoViagem').textContent = p.get('descricao') || 'Descrição não encontrada';
    document.getElementById('localViagem').textContent = p.get('local') || 'Local não encontrado';
    document.getElementById('guiaViagem').textContent = p.get('guia') || 'Guia não encontrado';
    document.getElementById('dataIda').textContent = p.get('ida') || 'Data ida não encontrada';
    document.getElementById('dataVolta').textContent = p.get('volta') || 'Data volta não encontrada';

    document.getElementById('imgPrincipal').src = p.get('img1') || '';
    document.getElementById('img1').src = p.get('img1') || '';
    document.getElementById('img2').src = p.get('img2') || '';
    document.getElementById('img3').src = p.get('img3') || '';
    document.getElementById('img4').src = p.get('img4') || '';

    const reservaHTML = p.get('reservaHTML');
    if (reservaHTML) {
        document.getElementById('reservaContainer').innerHTML = decodeURIComponent(reservaHTML);
    }
}

if (window.location.pathname.endsWith('agendar.html')) {
    window.addEventListener('DOMContentLoaded', preencherDadosDaURL);
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

// Dropdown Passagens

const valorUnitario = 500;
let qtd = 1;

// Abrir ou fechar o dropdown
function dropdownpassagem() {
    const dropdown = document.getElementById('dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Seleciona a quantidade e atualiza texto e preço
function selecionaPassagem(quantidade) {
    qtd = quantidade;

    const texto = quantidade === 1 ? '1 passagem' : `${quantidade} passagens`;
    document.getElementById('qtdPassagem').innerText = texto;

    const valorTotal = valorUnitario * quantidade;
    document.getElementById('preco').innerHTML = `R$ ${valorTotal},00 <span>Por Dia</span>`;

    // Fecha o dropdown após selecionar
    dropdownpassagem();
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

// Verificação cadastro 

if (window.location.pathname.endsWith("cadastro-fisica.html") || window.location.pathname.endsWith("cadastro-juridica.html") || window.location.pathname.endsWith("acessar.html") || window.location.pathname.endsWith("contato.html")) {


    //------------------------------mascara telefone-----------------------------------

    document.addEventListener('DOMContentLoaded', function () {
        const input = document.getElementById('telefone');

        const mascara = '(__) _____-____';

        function aplicarMascara(valor) {
            const numeros = valor.replace(/\D/g, '');
            let resultado = '';
            let i = 0;

            for (const char of mascara) {
                if (char === '_') {
                    resultado += i < numeros.length ? numeros[i++] : '_';
                } else {
                    resultado += char;
                }
            }

            return resultado;
        }

        function getProximaPosicao(texto) {
            const pos = texto.indexOf('_');
            return pos === -1 ? texto.length : pos;
        }

        input.value = mascara;

        input.addEventListener('focus', () => {
            setTimeout(() => {
                const pos = getProximaPosicao(input.value);
                input.setSelectionRange(pos, pos);
            }, 0);
        });

        input.addEventListener('input', () => {
            const numeros = input.value.replace(/\D/g, '');
            input.value = aplicarMascara(numeros);

            const pos = getProximaPosicao(input.value);
            input.setSelectionRange(pos, pos);
        });

        input.addEventListener('keydown', (e) => {
            const cursor = input.selectionStart;

            if (e.key === 'Backspace') {
                // Permite apagar número anterior, pulando caracteres fixos
                e.preventDefault();

                let valor = input.value;
                let numeros = valor.replace(/\D/g, '');

                // Descobre quantos números estão preenchidos
                const preenchidos = mascara.split('').filter((c, i) => c === '_' && valor[i] !== '_').length;

                // Remove o último número
                numeros = numeros.slice(0, preenchidos - 1);

                // Reaplica a máscara
                input.value = aplicarMascara(numeros);

                const novaPos = getProximaPosicao(input.value);
                input.setSelectionRange(novaPos, novaPos);
            }
        });
    });


    //-----------------------------mascara CPF/CNPJ-----------------------------------
    function aplicarMascaraCpfCnpj(valor) {
        // Remove tudo que não é número
        valor = valor.replace(/\D/g, '');

        // Aplica máscara de CPF se até 11 dígitos
        if (valor.length <= 11) {
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
            // Aplica máscara de CNPJ
            valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
            valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
        }

        return valor;
    }

    const inputCpfCnpj = document.getElementById('cpfcnpj');
    if (inputCpfCnpj) {
        inputCpfCnpj.addEventListener('input', function (e) {
            let somenteNumeros = e.target.value.replace(/\D/g, ''); // Mantém só números
            e.target.value = aplicarMascaraCpfCnpj(somenteNumeros);
        });
    }

    //-----------------------------mascara nome-----------------------------------
    document.addEventListener('DOMContentLoaded', function () {
        const nomeInput = document.getElementById('nome');

        nomeInput.addEventListener('input', function () {
            let valor = nomeInput.value;

            // Remove tudo que não seja letra, espaço ou hífen (permite acentos)
            valor = valor.replace(/[^a-zA-ZÀ-ú\s\-]/g, '');

            // Substitui múltiplos espaços por apenas um
            valor = valor.replace(/\s{2,}/g, ' ');

            // Capitaliza a primeira letra de cada palavra
            valor = valor.toLowerCase().replace(/(^|\s)\S/g, function (letra) {
                return letra.toUpperCase();
            });

            nomeInput.value = valor;
        });


    });
    document.getElementById('formCadastro').addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarsenha = document.getElementById('confirmarsenha').value;
        const mensagensErro = document.getElementById('mensagensErro');

        let erros = [];

        if (nome.length <= 3) {
            erros.push("O nome deve ter mais de 3 caracteres.");
        }

        if (!email.includes('@')) {
            erros.push("O email deve conter '@'.");
        }

        if (senha.length < 6) {
            erros.push("A senha deve ter no mínimo 6 caracteres.");
        }

        if (senha !== confirmarsenha) {
            erros.push("A confirmação de senha não corresponde à senha anterior.");
        }

        mensagensErro.style.display = "block";

        if (erros.length > 0) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.innerHTML = "<ul><li>" + erros.join("</li><li>") + "</li></ul>";
        } else {
            mensagensErro.className = "mensagem sucesso";
            mensagensErro.textContent = "Cadastro realizado com sucesso!";

            // Opcional: limpar os campos
            document.getElementById('formCadastro').reset();
        }
    });
    //-----------------------------mensagem erro fisica-----------------------------------
    document.getElementById('formCadastro').addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarsenha = document.getElementById('confirmarsenha').value;
        const mensagensErro = document.getElementById('mensagensErro');

        let erros = [];

        if (nome.length <= 3) {
            erros.push("O nome deve ter mais de 3 caracteres.");
        }

        if (!email.includes('@')) {
            erros.push("O email deve conter '@'.");
        }

        if (senha.length < 6) {
            erros.push("A senha deve ter no mínimo 6 caracteres.");
        }

        if (senha !== confirmarsenha) {
            erros.push("A confirmação de senha não corresponde à senha anterior.");
        }

        mensagensErro.style.display = "block";

        if (erros.length > 0) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.innerHTML = "<ul><li>" + erros.join("</li><li>") + "</li></ul>";
        } else {
            mensagensErro.className = "mensagem sucesso";
            mensagensErro.textContent = "Cadastro realizado com sucesso!";

            // Opcional: limpar os campos
            document.getElementById('formCadastro').reset();
        }
    });

    //-----------------------------mensagem erro juridica-----------------------------------
    document.getElementById('formCadastro').addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const cpfcnpj = document.getElementById('cpfcnpj').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarsenha = document.getElementById('confirmarsenha').value;
        const mensagensErro = document.getElementById('mensagensErro');

        let erros = [];

        // Validação nome: mais que 3 caracteres
        if (nome.length <= 3) {
            erros.push("O nome deve ter mais de 3 caracteres.");
        }

        // Validação CPF ou CNPJ: mínimo 11 caracteres (CPF) e máximo 18 (com máscara)
        if (cpfcnpj.length < 11 || cpfcnpj.length > 18) {
            erros.push("Informe um CPF ou CNPJ válido.");
        }

        // Validação senha: mínimo 6 caracteres
        if (senha.length < 6) {
            erros.push("A senha deve ter no mínimo 6 caracteres.");
        }

        // Confirmação de senha igual a senha
        if (senha !== confirmarsenha) {
            erros.push("A confirmação de senha não corresponde à senha.");
        }

        mensagensErro.style.display = "block";

        if (erros.length > 0) {
            mensagensErro.className = "mensagem erro";
            mensagensErro.innerHTML = "<ul><li>" + erros.join("</li><li>") + "</li></ul>";
        } else {
            mensagensErro.className = "mensagem sucesso";
            mensagensErro.textContent = "Cadastro realizado com sucesso!";

            // Limpar formulário após sucesso
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

document.addEventListener('DOMContentLoaded', function () {
    // Nome
    const inputNome = document.getElementById('nome');
    const iconNome = document.getElementById('icon-nome');
    if (inputNome && iconNome) {
        inputNome.addEventListener('focus', () => {
            iconNome.setAttribute('trigger', 'loop');
            setTimeout(() => iconNome.removeAttribute('trigger'), 1000);
        });
    }

    // Email (CPF ou CNPJ)
    const inputEmail = document.getElementById('email');
    const iconEmail = document.getElementById('icon-email');
    if (inputEmail && iconEmail) {
        inputEmail.addEventListener('focus', () => {
            iconEmail.setAttribute('trigger', 'loop');
            setTimeout(() => iconEmail.removeAttribute('trigger'), 900);
        });
    }
    // CPF ou CNPJ
    const inputCpfCnpj = document.getElementById('cpfcnpj');
    const iconCpfCnpj = document.getElementById('icon-cpfcnpj');
    if (inputCpfCnpj && iconCpfCnpj) {
        inputCpfCnpj.addEventListener('focus', () => {
            iconCpfCnpj.setAttribute('trigger', 'loop');
            setTimeout(() => iconCpfCnpj.removeAttribute('trigger'), 1000); // aumente aqui!
        });
    }

    // Senha
    const inputSenha = document.getElementById('senha');
    const iconSenha = document.getElementById('icon-senha');
    if (inputSenha && iconSenha) {
        inputSenha.addEventListener('focus', () => {
            iconSenha.setAttribute('trigger', 'loop');
            setTimeout(() => iconSenha.removeAttribute('trigger'), 900);
        });
    }

    // Confirmar Senha
    const inputConfirmar = document.getElementById('confirmarsenha');
    const iconConfirmar = document.getElementById('icon-confirmarsenha');
    if (inputConfirmar && iconConfirmar) {
        inputConfirmar.addEventListener('focus', () => {
            iconConfirmar.setAttribute('trigger', 'loop');
            setTimeout(() => iconConfirmar.removeAttribute('trigger'), 900);
        });
    }
});