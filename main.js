const data = {
    "company": {
        "name": "ServeGames",
        "slogan": "Innovation in every byte, power in every play.",
        "vision": "Ser líderes en soluciones integrales de seguridad y tecnología, transformando la protección en un pilar de confianza.",
        "mission": "Proveer soluciones de tecnología personalizadas, desde cámaras de vigilancia y GPS hasta software especializado y redes LAN.",
        "ruc": "10407047178",
        "address": "FONAVI II A13 int. 503",
        "email": "ventas@servegames.net",
        "phones": ["982138505", "920019377"],
        "colors": {
            "primary": "#ff0000",
            "secondary": "#050505",
            "accent": "#ffffff"
        }
    },
    "developer": {
        "name": "Xavier Russell",
        "tagline": "Senior Technical Specialist & Systems Developer",
        "bio": "Especialista técnico con una sólida base en ingeniería de sistemas y desarrollo de bajo nivel. Con dominio de lenguajes que van desde C y Perl hasta TypeScript, Xavier se enfoca en resolver problemas complejos mediante soluciones tecnológicas eficientes, robustas y escalables para el ecosistema de ServeGames",
        "photo": "Img/16343135.jpg",
        "stack": ["C", "C++", "Perl", "TypeScript", "Python", "C#", "SQL", "Networking"],
        "repos": [
            { "name": "servegames", "desc": "Ecosistema principal y servicios corporativos." },
            { "name": "SisFact Sunat", "desc": "Plataforma de facturación electrónica certificada." },
            { "name": "FastAttender", "desc": "Algoritmos de gestión de colas en tiempo real." },
            { "name": "TicketGo", "desc": "Software de alta concurrencia para eventos masivos." }
        ]
    },
    "featured": [
        {
            "id": 1,
            "title": "SERVEGAMES",
            "subtitle": "Expertos en soluciones tecnológicas integrales para empresas exigentes.",
            "image": "Img/photo-1550745165-9bc0b252726f.avif",
            "cta": "Conócenos",
            "link": "#about",
            "isMain": true
        },
        {
            "id": 2,
            "title": "SOFTWARE A MEDIDA",
            "subtitle": "Desarrollamos herramientas modulares y escalables para optimizar tu negocio.",
            "image": "Img/hero_software.png",
            "cta": "Ver Soluciones",
            "link": "#services"
        },
        {
            "id": 3,
            "title": "NUESTRO JUEGO",
            "subtitle": "Mundos inmersivos y tecnología de vanguardia en entretenimiento.",
            "image": "Img/uploaded_image_1765372531914.jpg",
            "cta": "Explorar Mundo",
            "link": "#projects"
        },
        {
            "id": 4,
            "title": "SEGURIDAD & REDES",
            "subtitle": "CCTV avanzado y Cableado Estructurado con certificación profesional.",
            "image": "Img/hero_cctv.png",
            "cta": "Infraestructura",
            "link": "#services"
        }
    ],
    "services": [
        { "id": "soft", "title": "Software & Hardware", "description": "Soluciones tecnológicas modulares y de alta calidad.", "image": "Img/service_soft.png" },
        { "id": "cctv", "title": "Video Vigilancia", "description": "Sistemas CCTV análogos e IP con monitoreo remoto Full HD.", "image": "Img/service_sec.png" },
        { "id": "cab", "title": "Cableado Estructurado", "description": "Redes de Cobre y Fibra Óptica con certificaciones.", "image": "Img/service_cabling.png" },
        { "id": "gps", "title": "GPS Vehicular", "description": "Seguimiento en tiempo real y telemetría para flotas.", "image": "Img/service_gps.png" },
        { "id": "bill", "title": "Facturación Electrónica", "description": "Control de ventas e inventarios con validez Sunat.", "image": "Img/service_soft.png" },
        { "id": "dom", "title": "Domótica", "description": "Automatización inteligente para el hogar moderno.", "image": "Img/service_sec.png" },
        { "id": "cloud", "title": "Cloud & Hosting", "description": "Servidores VPS y hosting de alta disponibilidad para gaming.", "image": "Img/service_soft.png" },
        { "id": "sms", "title": "API Envíos SMS", "description": "Integración de mensajería masiva para alertas y notificaciones.", "image": "Img/service_soft.png" }
    ],
    "projects": [
        { "id": "sis", "title": "SisFact Sunat", "type": "Software", "description": "Sistema completo de facturación electrónica y gestión de inventarios.", "status": "Enterprise" },
        { "id": "tik", "title": "TiketGo", "type": "Facturación", "description": "Facturador instantáneo para eventos masivos, discotecas y estadios.", "status": "Production" },
        { "id": "fast", "title": "FastAttender", "type": "Gestión", "description": "Sistema de control de colas para bancos y centros de atención.", "status": "New" },
        { "id": "click", "title": "ClickGPS", "type": "Logística", "description": "Plataforma avanzada de control vehicular y logística con GPS.", "status": "Active" },
        { "id": "mon", "title": "Centro de Control", "type": "Seguridad", "description": "Software de monitoreo para atención de emergencias.", "status": "Live" },
        { "id": "geo", "title": "GeoForce GPS", "type": "Hardware", "description": "Control de vehículos con avisos de motor y telemetría.", "status": "Production" }
    ],
    "clients": [
        "Img/p1 (1).jpg", "Img/p1 (1).png", "Img/p1 (2).jpg", "Img/p1 (2).png",
        "Img/p1 (3).jpg", "Img/p1 (4).jpg", "Img/p1 (5).jpg", "Img/p1 (6).jpg"
    ]
};

let currentServicePage = 1;
let currentProjectPage = 1;
let servicesPerPage = 6;
let projectsPerPage = 3;

function updateItemsPerPage() {
    const width = window.innerWidth;
    const oldServices = servicesPerPage;
    const oldProjects = projectsPerPage;

    if (width <= 768) {
        servicesPerPage = 2;
        projectsPerPage = 2;
    } else {
        servicesPerPage = 6;
        projectsPerPage = 3;
    }

    if (oldServices !== servicesPerPage || oldProjects !== projectsPerPage) {
        currentServicePage = 1;
        currentProjectPage = 1;
        renderPaginatedServices();
        renderPaginatedProjects();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    setTimeout(() => {
        if (introOverlay) {
            introOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
            initReveal();
        }
    }, 2500);

    updateItemsPerPage();
    renderAll(data);

    window.addEventListener('resize', updateItemsPerPage);

    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Contact Button Logic (WA)
    const contactBtns = document.querySelectorAll('.btn-contact');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const sendWa = document.getElementById('send-wa');
    const chatInput = document.getElementById('chat-input');
    const waNumber = "51913907785";

    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (isMobile) {
                window.location.href = `https://wa.me/${waNumber}?text=Hola ServeGames, me gustaría recibir más información.`;
            } else {
                chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    });

    if (closeChat) {
        closeChat.addEventListener('click', () => chatWidget.style.display = 'none');
    }

    if (sendWa) {
        sendWa.addEventListener('click', () => {
            const msg = chatInput.value || "Hola ServeGames, me gustaría recibir más información.";
            const url = `https://web.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
            chatWidget.style.display = 'none';
            chatInput.value = '';
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendWa.click();
        });
    }

    // Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
});

function renderAll(data) {
    renderHero(data.featured);
    renderPaginatedServices();
    renderPaginatedProjects();
    renderClients(data.clients);
    renderDeveloper(data.developer);
    renderFooter(data.company);
    initCarousel();
}

function renderDeveloper(dev) {
    const container = document.getElementById('developer-container');
    if (!container) return;
    container.innerHTML = `
        <div class="dev-grid">
            <div class="dev-photo-box reveal">
                <img src="${dev.photo}" alt="${dev.name}" class="dev-photo">
            </div>
            <div class="dev-info reveal">
                <span class="dev-tagline">${dev.tagline}</span>
                <h2>${dev.name}</h2>
                <p class="dev-bio">${dev.bio}</p>
                <div class="dev-stack">
                    ${dev.stack.map(s => `<span class="stack-badge">${s}</span>`).join('')}
                </div>
                <div class="dev-repos">
                    <h4>Proyectos Destacados (GitHub)</h4>
                    <div class="repo-list">
                        ${dev.repos.map(r => `
                            <div class="repo-card">
                                <h5>${r.name}</h5>
                                <p>${r.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPaginatedServices() {
    const container = document.getElementById('services-container');
    const paginator = document.getElementById('services-paginator');
    if (!container || !paginator) return;

    const start = (currentServicePage - 1) * servicesPerPage;
    const end = start + servicesPerPage;
    const items = data.services.slice(start, end);

    container.innerHTML = items.map(service => `
        <div class="service-card reveal active">
            <div class="service-img-container">
                <img src="${service.image}" alt="${service.title}" class="service-img">
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');

    const totalPages = Math.ceil(data.services.length / servicesPerPage);
    paginator.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const span = document.createElement('span');
        span.innerText = i;
        if (i === currentServicePage) span.classList.add('active');
        span.onclick = () => { currentServicePage = i; renderPaginatedServices(); };
        paginator.appendChild(span);
    }
}

function renderPaginatedProjects() {
    const container = document.getElementById('projects-container');
    const paginator = document.getElementById('projects-paginator');
    if (!container || !paginator) return;

    const start = (currentProjectPage - 1) * projectsPerPage;
    const end = start + projectsPerPage;
    const items = data.projects.slice(start, end);

    container.innerHTML = items.map(project => `
        <div class="project-item reveal active">
            <div class="project-type">${project.type}</div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
            <div class="project-status">${project.status}</div>
        </div>
    `).join('');

    const totalPages = Math.ceil(data.projects.length / projectsPerPage);
    paginator.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const span = document.createElement('span');
        span.innerText = i;
        if (i === currentProjectPage) span.classList.add('active');
        span.onclick = () => { currentProjectPage = i; renderPaginatedProjects(); };
        paginator.appendChild(span);
    }
}

function renderClients(clients) {
    const container = document.getElementById('clients-container');
    if (!container) return;
    container.innerHTML = clients.map(client => `
        <div class="client-logo-box reveal">
            <img src="${client}" alt="Cliente" class="client-logo">
        </div>
    `).join('');
}

function renderHero(featured) {
    const slidesContainer = document.getElementById('carousel-slides');
    const tabsContainer = document.getElementById('hero-tabs');
    if (!slidesContainer || !tabsContainer) return;

    slidesContainer.innerHTML = featured.map((item, index) => `
        <div class="hero-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="slide-bg" style="background-image: url('${item.image}')"></div>
            <div class="slide-content container">
                <h1 class="${item.isMain ? 'glitch hero-title' : 'hero-title'}" ${item.isMain ? `data-text="${item.title}"` : ''}>
                    ${item.title}
                </h1>
                <p class="hero-subtitle">${item.subtitle}</p>
                <div class="hero-btns">
                    <a href="${item.link}" class="btn btn-primary">${item.cta}</a>
                </div>
            </div>
        </div>
    `).join('');

    tabsContainer.innerHTML = featured.map((item, index) => `
        <div class="selector-tab ${index === 0 ? 'active' : ''}" data-index="${index}">
            <h4>${item.title.split(' ')[0]}</h4>
            <p>${item.subtitle}</p>
        </div>
    `).join('');
}

function initCarousel() {
    const tabs = document.querySelectorAll('.selector-tab');
    const slides = document.querySelectorAll('.hero-slide');
    if (tabs.length === 0) return;
    let currentIndex = 0;
    let interval;
    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));
        slides[index].classList.add('active');
        tabs[index].classList.add('active');
        currentIndex = index;
    }
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => { showSlide(index); resetInterval(); });
    });
    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(() => {
            let next = (currentIndex + 1) % slides.length;
            showSlide(next);
        }, 8000);
    }
    resetInterval();
}

function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
}

function renderFooter(company) {
    const footerContainer = document.querySelector('.footer .container');
    if (!footerContainer) return;
    footerContainer.innerHTML = `
        <div class="footer-grid">
            <div class="footer-col">
                <div class="footer-logo">${company.name.split(' ')[0]}<span></span></div>
                <p>${company.slogan}</p>
                <p style="margin-top: 1rem; font-size: 0.8rem; opacity: 0.7;">RUC: ${company.ruc}</p>
            </div>
            <div class="footer-col">
                <h4>Contacto</h4>
                <p>${company.address}</p>
                <p>Email: <a href="mailto:${company.email}" style="color: #fff; text-decoration: none;">${company.email}</a></p>
                ${company.phones.map(p => `<p>Tel: ${p}</p>`).join('')}
            </div>
            <div class="footer-col">
                <h4>Ecosistema</h4>
                <p>Desarrollo de Software</p>
                <p>Seguridad Electrónica</p>
                <p>Networking & Fibra</p>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2026 ${company.name}. Todos los derechos reservados. | Huánuco, Perú</p>
        </div>
    `;
}
