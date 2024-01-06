
$(document).ready(function () {
    let productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];

    let cartContainer = $('#cart-container');

    //Funciones precargadas para calcular el valor de la compra

    // Funciones para calcular y actualizar los valores del carrito
    function updateCartValues() {
        let subtotal = calculateSubtotal();
        let estShipping = 30; // Valor fijo de envío
        let iva = calculateIVA(subtotal);
        let total = calculateTotal(subtotal, estShipping, iva);

        // Actualizar elementos HTML con los nuevos valores
        $('#cart-subtotal').text('$' + subtotal.toFixed(2));
        $('#cart-shipping').text('$' + estShipping.toFixed(2));
        $('#cart-iva').text('$' + iva.toFixed(2));
        $('#cart-total').text('$' + total.toFixed(2));

        // Actualizar el array 'cartValue' en el localStorage
        let cartValue = [subtotal, estShipping, iva, total];
        localStorage.setItem('cartValue', JSON.stringify(cartValue));
    }

    // Función para calcular el subtotal de los productos en el carrito
    function calculateSubtotal() {
        let productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
        let subtotal = 0;

        for (let index = 0; index < productsCart.length; index++) {
            let product = productsCart[index];
            subtotal += product.productSubtotal;
        }

        return subtotal;
    }

    // Función para calcular el IVA
    function calculateIVA(subtotal) {
        // Supongamos que el IVA es el 13%
        return subtotal * 0.13;
    }

    // Función para calcular el total
    function calculateTotal(subtotal, estShipping, iva) {
        return subtotal + estShipping + iva;
    }

    if (productsCart.length === 0) {
        // Si el carrito está vacío, se le avisa al usuario
        $('#empty-msg-container').css('display', 'block');

        // Y pues no hay precios, todo en ceros
        updateCartValues(); // Actualizar valores del carrito
    } else {
        // Si el carrito tiene productos, no aparece el mensaje de vacío
        $('#empty-msg-container').css('display', 'none');

        // Mostrar los productos del carrito
        for (let index = 0; index < productsCart.length; index++) {
            let product = productsCart[index];

            // Crear elementos HTML para el producto
            let prodContainer = $('<div>').addClass('prod-container row w-100 pt-0 py-4 my-3 mb-2');
            let prodName = $('<p>').addClass('prod-name').text(product.productName);
            let prodImageContainer = $('<div>').addClass('prod-image-container col-md-4 col-5 p-md-2 p-0');
            let prodImage = $('<img>').addClass('prod-image').attr('src', product.productImage);
            let detailsAndPrice = $('<div>').addClass('col-md-8 col-7 px-4 d-grid');
            let prodDetailsAndPrice = $('<div>').addClass('col-12 prod-details-and-price d-flex flex-sm-row flex-column');
            let brandSize = $('<div>').addClass('col-10 brand-size d-flex flex-column');
            let prodBrand = $('<span>').addClass('prod-brand').html('<b>By:</b> ' + product.productBrand);
            let prodSize = $('<span>').addClass('prod-size').html('<b>Size:</b> ' + product.productSize);
            let prodPrice = $('<p>').addClass('col-2 prod-price text-sm-end text-start mt-sm-0 mb-sm-0 mt-2 mb-0')
                .text('$' + product.productSubtotal.toFixed(2));
            let prodQuant = $('<div>').addClass('col-12 prod-quant d-flex mt-0');
            let chooseQuantMinus = $('<span>').addClass('choose-quant minus').text('-');
            let quantityProd = $('<input>').addClass('choose-quant text-center quantity-prod').attr({
                'type': 'number',
                'value': product.productQuantity,
                'min': '1',
                'max': '10',
                'name': 'quantity'
            });
            let chooseQuantPlus = $('<span>').addClass('choose-quant plus').text('+');
            let removeProd = $('<div>').addClass('col-12 remove-prod d-flex mt-2 align-self-end w-100 justify-content-end');
            let removeItem = $('<span>').addClass('d-flex justify-content-end remove-item')
                .html('<img src="/assets/img/icons/trash.svg" alt="Delete from cart">');

            // Manejador de eventos para eliminar productos
            removeItem.click(function () {
                // Eliminar el producto del carrito y actualizar la visualización
                productsCart.splice(index, 1);
                localStorage.setItem('productsCart', JSON.stringify(productsCart));
                prodContainer.remove();
                updateEmptyMessage();
                updateCartValues(); // Actualizar valores del carrito
            });

            // Manejador de eventos para restar cantidad
            chooseQuantMinus.click(function () {
                if (product.productQuantity > 1) {
                    product.productQuantity--;
                    quantityProd.val(product.productQuantity);
                    updateProductSubtotal();
                    updateCartValues(); // Actualizar valores del carrito
                }
            });

            // Manejador de eventos para sumar cantidad
            chooseQuantPlus.click(function () {
                if (product.productQuantity < 10) {
                    product.productQuantity++;
                    quantityProd.val(product.productQuantity);
                    updateProductSubtotal();
                    updateCartValues(); // Actualizar valores del carrito
                }
            });

            // Función para actualizar el subtotal del producto
            function updateProductSubtotal() {
                prodPrice.text('$' + (product.productUnitPrice * product.productQuantity).toFixed(2));
                product.productSubtotal = product.productUnitPrice * product.productQuantity;
                localStorage.setItem('productsCart', JSON.stringify(productsCart));
            }

            // Función para actualizar el mensaje de carrito vacío
            function updateEmptyMessage() {
                if (productsCart.length === 0) {
                    $('#empty-msg-container').css('display', 'block');
                }
            }

            // Construir la estructura del producto
            prodImageContainer.append(prodImage);
            brandSize.append(prodBrand, prodSize);
            prodDetailsAndPrice.append(brandSize, prodPrice);
            prodQuant.append(chooseQuantMinus, quantityProd, chooseQuantPlus);
            removeProd.append(removeItem);
            detailsAndPrice.append(prodDetailsAndPrice, prodQuant, removeProd);
            prodContainer.append(prodName, prodImageContainer, detailsAndPrice);

            // Agregar el producto al contenedor del carrito
            cartContainer.append(prodContainer);
        }

        // Actualizar valores del carrito al cargar la página
        updateCartValues();
    }

    $('#confirm-purchase').on('click', function () {
        // Obtener productos del carrito
        let productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];

        let userActive = JSON.parse(localStorage.getItem('userActive'));

        if (productsCart.length == 0) {
            alert(`Cart is empty, there's nothing to buy :/'`);
        } else if (!userActive[1]) {
            alert('Please, log-in to complete your purchase');
        } else {
            // Realizar acciones de confirmación de compra
            alert('Purchase completed! \n\nThe delivery terms will be defined via email \n\nThanks for trusting in JACKZ Skateshop <3');

            // Guardar la compra en el historial
            let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
            purchases.push(productsCart);
            localStorage.setItem('purchases', JSON.stringify(purchases));

            // Limpiar el carrito y los valores del carrito
            localStorage.removeItem('productsCart');
            localStorage.removeItem('cartValue');

            window.location.href = '/';
        }
    });
});