$(document).ready(function () {

    const xpand = document.getElementById('store-btn');
    const navStore = document.getElementById('store-menu');
    const navArrow = document.getElementById('store-btn').getElementsByTagName('img')[0];

    const togStore = () => {
        if (navStore.classList.contains('nvfloat-ds')) {
            navStore.classList.remove('nvfloat-ds');
            navStore.classList.add('nvfloat-ac');
            navArrow.style.transition = '0.3s all ease';
            navArrow.style.transform = 'rotate(180deg)';
        } else {
            navStore.classList.add('nvfloat-ds');
            navStore.classList.remove('nvfloat-ac');
            navArrow.style.transition = '0.3s all ease';
            navArrow.style.transform = 'rotate(0deg)'
        }
    }

    xpand.addEventListener('click', togStore);

    if (location.href.includes('cart.html')) {
        $('#cart').remove();
    } else {
        $('#cart').on('click', function () {
            location.assign('../cart.html');
        });

        const cartSize = JSON.parse(localStorage.getItem('productsCart')) || [];

        if (cartSize.length < 9) {
            $('#cart-size').text(cartSize.length);
        } else {
            $('#cart-size').text('+9');
        }
    }

    let userActive = JSON.parse(localStorage.getItem('userActive')) || [];

    if (userActive[1]) {
        $('#acc-label').text(`${userActive[0]}`);
        $('.log').css('display', 'none');
        $('.reg').css('display', 'none');
        $('#opt-out').css('display', 'block');
    } else {
        $('#acc-label').text(`Account`);
        $('.log').css('display', 'block');
        $('.reg').css('display', 'block');
        $('#opt-out').css('display', 'none');
    }

    $('#opt-out').on('click', function () {
        userActive[0] = null;
        userActive[1] = false;

        localStorage.setItem('userActive', JSON.stringify(userActive));

        window.location.href = '/';
    });


});