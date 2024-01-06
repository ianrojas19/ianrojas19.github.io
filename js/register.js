document.getElementById('show-hide-btn').addEventListener('click', function () {
    const passwordField = document.getElementById('passwd');
    const icon = document.querySelector('#show-hide-btn img');
    const fieldType = passwordField.getAttribute('type');

    if (fieldType === 'password') {
        passwordField.setAttribute('type', 'text');
        icon.setAttribute('src', '/assets/img/icons/eye-off.svg');
        icon.setAttribute('alt', 'Ocultar');
    } else {
        passwordField.setAttribute('type', 'password');
        icon.setAttribute('src', '/assets/img/icons/eye.svg');
        icon.setAttribute('alt', 'Mostrar');
    }
});

document.getElementById('show-hide-btn-cf').addEventListener('click', function () {
    const confirmPasswordField = document.getElementById('cfpasswd');
    const icon = document.querySelector('#show-hide-btn-cf img');
    const fieldType = confirmPasswordField.getAttribute('type');

    if (fieldType === 'password') {
        confirmPasswordField.setAttribute('type', 'text');
        icon.setAttribute('src', '/assets/img/icons/eye-off.svg');
        icon.setAttribute('alt', 'Ocultar');
    } else {
        confirmPasswordField.setAttribute('type', 'password');
        icon.setAttribute('src', '/assets/img/icons/eye.svg');
        icon.setAttribute('alt', 'Mostrar');
    }
});

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtén los valores del formulario
    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let birthday = document.getElementById('fecha').value;
    let password = document.getElementById('passwd').value;
    let confirmPassword = document.getElementById('cfpasswd').value;

    // Realiza las validaciones
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }

    if (email.indexOf('@') === -1) {
        alert('El correo electrónico debe contener @.');
        return;
    }

    let currentDate = new Date();
    let birthDate = new Date(birthday);
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
        alert('Debes ser mayor de edad para registrarte.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.username === username)) {
        alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
        return;
    }

    if (users.some(user => user.email === email)) {
        alert('El correo electrónico ya está registrado. Por favor, utiliza otro.');
        return;
    }

    // Crea el objeto usuario
    let usuario = {
        email: email,
        name: name,
        username: username,
        birthday: birthday,
        password: password
    };

    users.push(usuario);

    localStorage.setItem('users', JSON.stringify(users));

    alert('¡Registro exitoso!');

    window.location.href = '/log-in.html';
});
