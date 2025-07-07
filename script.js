document.addEventListener('DOMContentLoaded', function() {
    
    // --- MANEJO DEL MODAL DE LOGIN ---
    const loginModal = document.getElementById('login-modal');
    const loginBtn = document.getElementById('login-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => loginModal.style.display = 'none');
    }
    if (loginModal) {
        loginModal.addEventListener('click', function(event) {
            if (event.target === loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

    // --- LÓGICA DE LOGIN ---
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = this.email.value;
            const passwordInput = this.password.value;

            // Obtenemos el usuario guardado en localStorage
            const storedUserJSON = localStorage.getItem('user');
            
            if (!storedUserJSON) {
                errorMessage.textContent = 'No hay ningún usuario registrado.';
                errorMessage.style.display = 'block';
                return;
            }

            const storedUser = JSON.parse(storedUserJSON);

            // Comparamos los datos
            if (emailInput === storedUser.email && passwordInput === storedUser.password) {
                // Si son correctos, guardamos un indicador de que la sesión está activa
                localStorage.setItem('isLoggedIn', 'true');
                alert('¡Bienvenido de vuelta!');
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Correo o contraseña incorrectos.';
                errorMessage.style.display = 'block';
            }
        });
    }

});

// --- FUNCIÓN DE LOGOUT ---
// Esta función se puede llamar desde cualquier botón o enlace de "Salir"
function logout() {
    localStorage.removeItem('isLoggedIn'); // Quitamos el indicador de sesión
    // Opcional: también podemos borrar los datos del usuario
    // localStorage.removeItem('user'); 
    alert('Has cerrado la sesión.');
    window.location.href = 'index.html';
}
