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
            erros.push("A confirmação de senha não corresponde à senha.");
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

    const modal = document.getElementById('modal');
    const modalTitulo = document.querySelector('.modal-titulo');
    const modalDetalhes = document.getElementById('modal-detalhes');
    const closeBtn = document.getElementById('closeModal');
    const closeFooterBtn = document.getElementById('closeBtn');

    // Função para abrir modal com dados do card
    function abrirModalComCard(card) {
        const local = card.querySelectorAll('.tituloViagem')[0].innerText;
        const pais = card.querySelectorAll('.tituloViagem')[1].innerText;
        const ida = card.querySelectorAll('.tituloViagem')[2].innerText;
        const volta = card.querySelectorAll('.tituloViagem')[3].innerText;
        const preco = card.querySelector('.preco').innerText;

        modalTitulo.innerText = local; // Título será o "Local"
        modalDetalhes.innerHTML = `
    <strong>${pais}</strong><br>
    <strong>${ida}</strong><br>
    <strong>${volta}</strong><br>
    <strong>Preço:</strong> ${preco}
  `;

        modal.style.display = 'flex';
    }

    // Adiciona evento a todos os botões
    document.querySelectorAll('.btnagenda').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            abrirModalComCard(card);
        });
    });

    // Fechar modal
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    closeFooterBtn.addEventListener('click', () => modal.style.display = 'none');

}




document.addEventListener('DOMContentLoaded', function () {
    // Nome
    const inputNome = document.getElementById('nome');
    const iconNome = document.getElementById('icon-nome');
    inputNome.addEventListener('focus', () => {
        iconNome.setAttribute('trigger', 'loop');
        setTimeout(() => iconNome.removeAttribute('trigger'), 2000);
    });

    // Email (CPF ou CNPJ)
    const inputEmail = document.getElementById('email');
    const iconEmail = document.getElementById('icon-email');
    inputEmail.addEventListener('focus', () => {
        iconEmail.setAttribute('trigger', 'loop');
        setTimeout(() => iconEmail.removeAttribute('trigger'), 400);
    });

    // Senha
    const inputSenha = document.getElementById('senha');
    const iconSenha = document.getElementById('icon-senha');
    inputSenha.addEventListener('focus', () => {
        iconSenha.setAttribute('trigger', 'loop');
        setTimeout(() => iconSenha.removeAttribute('trigger'), 900);
    });

    // Confirmar Senha
    const inputConfirmar = document.getElementById('confirmarsenha');
    const iconConfirmar = document.getElementById('icon-confirmarsenha');
    inputConfirmar.addEventListener('focus', () => {
        iconConfirmar.setAttribute('trigger', 'loop');
        setTimeout(() => iconConfirmar.removeAttribute('trigger'), 900);
    });
});

