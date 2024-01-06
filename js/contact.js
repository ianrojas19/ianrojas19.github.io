document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();

        
        var email = document.getElementById('email').value;
        var name = document.getElementById('name').value;
        var subject = document.getElementById('subject').value;
        var message = document.getElementById('message').value;

        var phoneNumber = '+50664649512';
        var messageText = 'Hi, I am ' + name + '.\nEmail: ' + email + '.\nSubject: ' + subject + '.\n\n' + message;
        var whatsappUrl = 'whatsapp://send?phone=' + phoneNumber + '&text=' + encodeURIComponent(messageText);

        // Redirige a la aplicación de WhatsApp
        window.location.href = whatsappUrl;
    });
});
