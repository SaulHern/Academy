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
    document.addEventListener('DOMContentLoaded', function() {
    
    const loginForm = document.getElementById('login-form'); // Asigna este ID a tu <form> de login
    const errorMessage = document.getElementById('error-message'); // Añade un <p id="error-message"></p> para errores

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            // Prevenir que el formulario se envíe de la forma tradicional
            event.preventDefault();

            // Ocultar mensajes de error previos
            if(errorMessage) errorMessage.style.display = 'none';

            // Obtener los datos del formulario
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            // Enviar los datos a la API usando fetch
            fetch('api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // Si el login es exitoso, redirigir al dashboard
                    alert(result.message); // Muestra mensaje de éxito
                    window.location.href = 'dashboard.html';
                } else {
                    // Si falla, mostrar el mensaje de error
                    if(errorMessage) {
                        errorMessage.textContent = result.message;
                        errorMessage.style.display = 'block';
                    } else {
                        alert(result.message);
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                if(errorMessage) {
                    errorMessage.textContent = 'Ocurrió un error de conexión.';
                    errorMessage.style.display = 'block';
                } else {
                    alert('Ocurrió un error de conexión.');
                }
            });
        });
    }
});

});
