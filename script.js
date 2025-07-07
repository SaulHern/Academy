document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM para el Modal de Login
    const loginModal = document.getElementById('login-modal');
    const loginBtn = document.getElementById('login-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Función para mostrar el modal
    function showModal() {
        if (loginModal) {
            loginModal.style.display = 'flex';
        }
    }

    // Función para ocultar el modal
    function closeModal() {
        if (loginModal) {
            loginModal.style.display = 'none';
        }
    }

    // Evento para abrir el modal al hacer clic en el botón de Login
    if (loginBtn) {
        loginBtn.addEventListener('click', showModal);
    }

    // Evento para cerrar el modal al hacer clic en la 'X'
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Evento para cerrar el modal si se hace clic fuera del contenido
    if (loginModal) {
        loginModal.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                closeModal();
            }
        });
    }

    // También puedes cerrar el modal con la tecla 'Escape'
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

});
