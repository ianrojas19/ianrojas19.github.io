document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('passwd').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userActive = [];
    let userFound = false;

    // Busca el usuario con el correo electrónico proporcionado
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            userFound = true;
            userActive[0] = users[i].username;
            userActive[1] = true;

            var actUsername = users[i].username;
            break;
        }
    }

    if (userFound) {
        localStorage.setItem('userActive', JSON.stringify(userActive));

        console.log(userActive);

        alert(`¡Welcome, ${actUsername}!`);

        window.location.href = '/';
    } else {
        alert('Invalid credentials :(');
    }
});


document.getElementById('show-hide-btn').addEventListener('click', function () {
    const passwordField = document.getElementById('passwd');
    const icon = document.querySelector('#show-hide-btn img');
    const fieldType = passwordField.getAttribute('type');

    if (fieldType === 'password') {
        passwordField.setAttribute('type', 'text');
        icon.setAttribute('src', '/assets/img/icons/eye-off.svg');
        icon.setAttribute('alt', 'Hide');
    } else {
        passwordField.setAttribute('type', 'password');
        icon.setAttribute('src', '/assets/img/icons/eye.svg');
        icon.setAttribute('alt', 'Show');
    }
});