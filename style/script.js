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


// Inclusão do ano dinamicamente    

let spansAno = document.querySelectorAll(".AnoAtual");

let novadata = new Date();

let ano = novadata.getFullYear();

spansAno.forEach(function (span) {
    span.innerHTML = ano;
});

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

// Verificação cadastro 

if (window.location.pathname.endsWith("cadastro-fisica.html") || window.location.pathname.endsWith("cadastro-juridica.html")) {

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