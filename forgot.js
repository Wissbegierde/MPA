$(function(){
    $("#submit").click(function(){
       
        const username = $('#username').val();

        if(username == "" ){
            alert("¡El nombre de usuario no pueden estar vacíos!");
        }else{
        // Hacer una petición AJAX para verificar si el usuario existe
        $.ajax({
            url: '/verificar-usuario',
            method: 'POST',
            data: { username: username },
            success: function(response) {
                if (response.existe) {
                    // Si el usuario existe, mostrar un cuadro de texto para preguntar la universidad
                    const universidadInput = $('<input>').attr('type', 'text').attr('name', 'universidad').attr('placeholder', 'Universidad');
                    const universidadLabel = $('<label>').attr('for', 'universidad').text('¿Cuál es nuestra universidad?');
                    const universidadDiv = $('<div>').addClass('form-group').append(universidadLabel).append(universidadInput);
                    const form = $('form');
                    form.empty();
                    const newPasswordInput = $('<input>').attr('type', 'password').attr('name', 'newPassword').attr('placeholder', 'New Password');
                    const verifyPasswordInput = $('<input>').attr('type', 'password').attr('name', 'verifyPassword').attr('placeholder', 'Verify Password');
                    const submitButton = $('<button>').attr('type', 'submit').text('Change Password');
                    form.append(universidadDiv).append(newPasswordInput).append(verifyPasswordInput).append(submitButton);
                    // Agregar un listener al formulario para verificar que las contraseñas sean iguales
                    form.submit(function(event) {
                        event.preventDefault();
                        const universidad = universidadInput.val();
                        if (universidad === 'UIS') {
                            const newPassword = newPasswordInput.val();
                            const verifyPassword = verifyPasswordInput.val();
                            if (newPassword === verifyPassword) {
                                // Si las contraseñas son iguales, enviar la petición AJAX para cambiar la contraseña
                                $.ajax({
                                    url: '/cambiar-contrasena',
                                    method: 'POST',
                                    data: { newPassword: newPassword },
                                    success: function(response) {
                                        alert('Contraseña cambiada exitosamente');
                                        window.location.href = "/login"; // Redirigir a la página de login
                                    }
                                });
                            } else {
                                alert('Las contraseñas no coinciden');
                            }
                        } else {
                            alert('La universidad es incorrecta');
                        }
                    });
                } else {
                    // Si el usuario no existe, mostrar un mensaje de alerta
                    alert('El usuario no existe');
                }
            }
        });
    }
    });

});
