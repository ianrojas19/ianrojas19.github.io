onload = () => {
    document.body.classList.remove("container");
};


let broma = document.querySelector('#Bromita');

broma.addEventListener('click', function () {
    broma.innerHTML = 'No mames te la creiste???? JAJAJAJ';
});

function messageAppear(message, tittle) {

    const messageContainer = document.querySelector('#message');
    const messageTitle = document.querySelector('#msg-title');
    const messageText = document.querySelector('#msg-text');
    const btnBack = document.querySelector('#msg-back');

    messageContainer.style.display = 'flex';
    messageTitle.innerHTML = tittle;
    messageText.innerHTML = message;

    setTimeout(function () {
        messageContainer.style.opacity = '0';

    }, 20000);

    setTimeout(function () {
        messageContainer.style.display = 'none';
    }, 21000)

}

function msgb() {
    messageAppear('Sé que no siempre es fácil entendernos ya que pues, soy una persona un poco (si paa) terca, que a veces tenemos diferencias y desacuerdos. Pero también sé que nos amamos y que juntos podemos superar cualquier obstáculo. Gracias por comprenderme, apoyarme y respetarme aun cuando ni yo pienso que es posible hacerlo.', 'Amor')

}

function msgy() {
    messageAppear('Tengo la fortuna de tener como novia a la niña más tierna y cariñosa que conozco. Me encanta como nos llenamos de abrazos, besos, mimos y detalles que me hacen sentir especial y bendecido. Eres mi alegría, mi consuelo, mi refugio.', 'Comprensión')
}

function msgr() {
    messageAppear('Mi amor, sos la luz que a mi vida le faltaba, el sueño de mi infancia de tener una novia que me amara como mi familia me enseño a amor, con fuerza, con pasión, con deseo de que nunca se acabe lo que sea que formace con esa mujer. Te quiero con todo mi corazón y te agradezco por estar a mi lado en las buenas y en las malas.', 'Ternura')
}

function msgw() {
    messageAppear('Y... tal vez hoy no celebramos un año más de nuestra relación, pero celebramos un día mas de poder estar juntos hasta cumplir uno y muchos más años juntos, también miramos hacia el futuro con ilusión y esperanza. Quiero que sepas que te elijo cada día, que quiero compartir contigo todos mis sueños y planes, que quiero envejecer a tu lado. Feliz día de san valentín, MI PRINCESAAAA!!!!.', 'Nuestro futuro juntos');
    let final = document.querySelector('#continue');

    final.style.display = 'flex';
}



