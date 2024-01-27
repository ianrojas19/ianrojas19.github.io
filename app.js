const buttonEncryptMessage = document.getElementById("msg-encrypt");
const buttonDecryptMessage = document.getElementById("msg-decrypt");
const buttonCopyText = document.getElementById('copy-to-clipboard')
const message = document.getElementById("text-to-encrypt");
let result = document.getElementById('encrypt-result');
let successElements = document.getElementsByClassName("encrypt-success");
let failElements = document.getElementsByClassName("encrypt-fail");

function emptyContent(error) {
    if (message.value !== '' && error != true) {
        Array.from(successElements).forEach(e => {
            e.style.display = 'block';
        });

        Array.from(failElements).forEach(e => {
            e.style.display = 'none';
        });
    } else {
        Array.from(successElements).forEach(e => {
            e.style.display = 'none';
        });

        Array.from(failElements).forEach(e => {
            e.style.display = 'block';
        });
    }
};

function encrypt() {
    let texto = message.value;
    let error = true;

    if (texto.match(/^[a-z ]*$/)) {

        texto = texto
            .replace('e', "enter")
            .replace('i', "imes")
            .replace('a', "ai")
            .replace('o', "ober")
            .replace('u', "ufat");
        result.value = texto;

        error = false;

    } else {
        alert("Solo se permiten letras minusculas, sin caracteres especiales.")
    }

    return error;

}

function decrypt() {
    let texto = message.value;
    let error = true;

    if (texto.match(/^[a-z ]*$/)) {

        texto = texto
            .replace('ai', "a")
            .replace('enter', "e")
            .replace('imes', "i")
            .replace('ober', "o")
            .replace('ufat', "u");
        result.value = texto;

        error = false;

    } else {
        alert("Solo se permiten letras minusculas, sin caracteres especiales.")
    }

    return error;
}

buttonCopyText.addEventListener('click', function () {
    navigator.clipboard.writeText(result.value);
    alert('Copiado en el portapapeles');
});

document.getElementById('goto-enc-box').addEventListener('click', function () {
    message.focus();
});



buttonEncryptMessage.addEventListener('click', function () {
    let stateOfAction = encrypt();
    emptyContent(stateOfAction);
});

buttonDecryptMessage.addEventListener('click', function () {
    let stateOfAction = decrypt();
    emptyContent(stateOfAction);
});
