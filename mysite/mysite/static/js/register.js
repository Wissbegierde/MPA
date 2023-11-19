const $formulario = document.getElementById("formulario");

$formulario.addEventListener('submit', function (e) {
        
        var data = {
            name: $('#name').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            confirm_password: $('#confirm_password').val()  
        };

        
        if (data.name === '' || data.email === '' || data.password === '') {
            alert('Por favor, complete todos los campos.');
            e.preventDefault();
            return;
        }

        if (!isValidEmail(data.email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            e.preventDefault();
            return;
        }
        if (data.password !== data.confirm_password) {
            alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
            e.preventDefault();
            return;
        }


    // Función para verificar si un correo electrónico es válido
    function isValidEmail(email) {
        // Expresión regular para verificar si el correo electrónico es válido
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

});    
