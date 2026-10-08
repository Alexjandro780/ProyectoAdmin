document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad de mostrar/ocultar el menú lateral
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    // Verificar el estado inicial del menú
    const isSidebarHidden = sidebar.classList.contains('hidden');
    
    // Asegurar que el botón de menú esté sincronizado con el estado del sidebar
    if (!isSidebarHidden) {
        menuToggle.classList.add('menu-visible');
        content.classList.add('content-with-menu');
    } else {
        menuToggle.classList.remove('menu-visible');
        content.classList.remove('content-with-menu');
    }
    
    menuToggle.addEventListener('click', function() {
        const isNowVisible = sidebar.classList.contains('hidden');
        
        sidebar.classList.toggle('hidden');
        
        if (isNowVisible) {
            // Si el sidebar estaba oculto y ahora se mostrará
            menuToggle.classList.add('menu-visible');
            content.classList.add('content-with-menu');
        } else {
            // Si el sidebar estaba visible y ahora se ocultará
            menuToggle.classList.remove('menu-visible');
            content.classList.remove('content-with-menu');
        }
    });
   
    // Funcionalidad para los submenús con animación
    const menuItems = document.querySelectorAll('.menu-item-toggle');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Encontrar el submenú asociado a este elemento
            const submenu = this.nextElementSibling;
            const isCurrentlyActive = submenu.classList.contains('active');
            
            // Cerrar todos los submenús activos
            const allActiveSubmenus = document.querySelectorAll('.submenu.active');
            const allActiveToggles = document.querySelectorAll('.menu-item-toggle.active');
            
            allActiveSubmenus.forEach(sub => {
                sub.classList.remove('active');
            });
            
            allActiveToggles.forEach(toggle => {
                toggle.classList.remove('active');
                // Resetear la flecha a su estado cerrado
                const arrow = toggle.querySelector('.arrow');
                if (arrow) {
                    arrow.textContent = '▶'; // Flecha hacia la derecha para menú cerrado
                }
            });
            
            // Si el submenú no estaba activo, abrirlo
            if (!isCurrentlyActive) {
                submenu.classList.add('active');
                this.classList.add('active');
                
                // Cambiar la flecha a su estado abierto
                const arrow = this.querySelector('.arrow');
                if (arrow) {
                    arrow.textContent = '▼'; // Flecha hacia abajo para menú abierto
                }
                
                // Guardar el identificador del submenú abierto en localStorage
                if (this.dataset.page) {
                    localStorage.setItem('activeSubmenu', this.dataset.page);
                }
            }
            // Si ya estaba activo, quedará cerrado por las líneas anteriores
        });
    });
    
    // PASO 1: Cerrar todos los submenús primero (antes de aplicar cualquier activación)
    const allSubmenus = document.querySelectorAll('.submenu');
    const allToggles = document.querySelectorAll('.menu-item-toggle');
    
    allSubmenus.forEach(sub => {
        sub.classList.remove('active');
    });
    
    allToggles.forEach(toggle => {
        toggle.classList.remove('active');
        // Resetear la flecha a su estado cerrado
        const arrow = toggle.querySelector('.arrow');
        if (arrow) {
            arrow.textContent = '▶';
        }
    });
    
    // PASO 2: Determinar qué submenú debe estar activo basado en la URL o localStorage
    const currentPath = window.location.pathname;
    let activeSubmenuId = localStorage.getItem('activeSubmenu');
    let targetToggle = null;
    
    // Primero intentamos encontrar el submenú basado en la URL actual
    if (currentPath.includes('oferta-educativa')) {
        targetToggle = document.querySelector('.menu-item-toggle[data-page="oferta-educativa"]');
        activeSubmenuId = 'oferta-educativa';
    } else if (currentPath.includes('messages')) {
        targetToggle = document.querySelector('.menu-item-toggle[data-page="messages"]');
        activeSubmenuId = 'messages';
    } else if (activeSubmenuId) {
        // Si no hay coincidencia en la URL pero tenemos un valor en localStorage, usamos ese
        targetToggle = document.querySelector(`.menu-item-toggle[data-page="${activeSubmenuId}"]`);
    }
    
    // Si aún no hemos encontrado el toggle, usar el primero como predeterminado solo si no hay 
    // un submenú activo definido en localStorage
    if (!targetToggle && !activeSubmenuId) {
        targetToggle = document.querySelector('.menu-item-toggle');
        // Si el toggle predeterminado tiene un data-page, guardarlo
        if (targetToggle && targetToggle.dataset.page) {
            localStorage.setItem('activeSubmenu', targetToggle.dataset.page);
        }
    }
    
    // PASO 3: Activar solo el submenú correspondiente
    if (targetToggle) {
        const targetSubmenu = targetToggle.nextElementSibling;
        if (targetSubmenu) {
            targetSubmenu.classList.add('active');
            targetToggle.classList.add('active');
            
            // Actualizar la flecha si existe
            const arrow = targetToggle.querySelector('.arrow');
            if (arrow) {
                arrow.textContent = '▼';
            }
        }
    }
    
    // Guardar el estado del menú en localStorage al hacer clic en los enlaces
    document.querySelectorAll('.submenu a').forEach(link => {
        link.addEventListener('click', function() {
            // Encontrar qué menú contiene este enlace
            const parentSubmenu = this.closest('.submenu');
            const parentToggle = parentSubmenu.previousElementSibling;
            
            // Guardar el data-page del toggle padre
            if (parentToggle && parentToggle.dataset.page) {
                localStorage.setItem('activeSubmenu', parentToggle.dataset.page);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.querySelector('.map-container');
    
    // Detener la animación después de 5 segundos
    setTimeout(function() {
        mapContainer.classList.remove('animated-pulse');
    }, 5000);
});
