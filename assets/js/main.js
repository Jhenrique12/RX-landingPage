const headerBtnHamburguer = document.querySelector(".menu-toggle")
const headerNav = document.getElementById("navHeader")
const navLinks = headerNav.querySelectorAll("a")
const mainHeader = document.getElementById("mainHeader")

headerBtnHamburguer.addEventListener('click', () => {
    headerNav.classList.toggle('active')
    headerBtnHamburguer.classList.toggle('active')
})

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        headerNav.classList.remove('active')
        headerBtnHamburguer.classList.remove('active')
    })
})

let lastScrollY = 0
let headerTicking = false

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY
    if (!headerTicking) {
        window.requestAnimationFrame(() => {
            if (lastScrollY > 80) {
                mainHeader.classList.add('header-scrolled')
            } else {
                mainHeader.classList.remove('header-scrolled')
            }
            headerTicking = false
        })
        headerTicking = true
    }
})

const highlightCards = document.querySelectorAll('.highlight-card')
const isMobile = () => window.innerWidth <= 768

highlightCards.forEach(card => {
    card.addEventListener('click', () => {
        if (!isMobile()) return
        card.classList.toggle('flipped')
    })
})

AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
})

const contactForm = document.getElementById('contact-form')

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault()

        const nameField = document.getElementById('name')
        const telefoneField = document.getElementById('tel')
        const emailField = document.getElementById('email')
        const messageField = document.getElementById('message')
        const submitBtn = contactForm.querySelector('button[type="submit"]')

        if (telefoneField.value.trim() === '') {
            alert('Por favor, informe um número de Telefone para contato.')
            telefoneField.focus()
            return
        }

        submitBtn.disabled = true
        submitBtn.textContent = 'Enviando...'

        const formData = new FormData(contactForm)

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                contactForm.reset()
                window.location.href = 'obrigado.html'
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Erro ao enviar mensagem.')
                })
            }
        })
        .catch(error => {
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente ou entre em contato por telefone.')
        })
        .finally(() => {
            submitBtn.disabled = false
            submitBtn.textContent = 'Enviar'
        })
    })
}
