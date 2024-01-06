//Cuando la pagina este lista para funcionar ejecuta todo el JS
$(document).ready(function () {


    /*Cuando el usuario abra los filtros se scrollea hasta el principio 
    para ver los productos que se encuentren o se filtren*/
    $(".filter-btn-act").on("click", function () {
        // Anima el desplazamiento hacia arriba
        $("html, body").animate({ scrollTop: 0 });
    });

    //Fijar la seccion de SearchBar y Filter Options
    $(window).scroll(function () {
        const scrollY = $(window).scrollTop();
        const windowHeight = $(window).height();
        const footerOffset = $('footer').offset().top;

        //Si pasa la altura del HEADER se FIJA y si esta cerca del FOOTER DESAPARECE
        if (scrollY >= 100 && scrollY + windowHeight < footerOffset) {
            $('#filters-tb').addClass('fixed-filters');
            $('#store-prods').css('margin-top', '90px');
        } else {
            $('#store-prods').css('margin-top', '0px');
            $('#filters-tb').removeClass('fixed-filters');
        }
    });



    /*Asigna la cantidad de productos que se tengan en cada categoria */
    function prodQuantity(category, all) {

        //Asigna la cantidad de productos en las areas de filtros
        const prods = document.getElementsByClassName('prod-card');

        let quantity = 0;

        if (all) {
            quantity = prods.length;
        }
        else {
            for (let i = 0; i < prods.length; i++) {
                const prod = prods[i];
                if (prod.getAttribute('prod-category') == category) {
                    quantity++;
                }
            }
        }

        return quantity;

    }

    $('#quantity-all').text(prodQuantity(null, true));
    $('#quantity-completes').text(prodQuantity('Completes', false));
    $('#quantity-decks').text(prodQuantity('Decks', false));
    $('#quantity-trucks').text(prodQuantity('Trucks', false));
    $('#quantity-wheels').text(prodQuantity('Wheels', false));
    $('#quantity-griptapes').text(prodQuantity('Griptapes', false));
    $('#quantity-bearings').text(prodQuantity('Bearings', false));
    $('#quantity-hardware').text(prodQuantity('Hardware', false));



    //////////////////    SECCION DE FILTROS      //////////////////////////

    /* 1. Busqueda: Funcion para mostrar los productos que coincidan con lo que 
    busca el usuario*/
    $('#search-input').on('keypress', function (e) {
        if (e.which === 13) { // 13 es el código de la tecla "Enter"
            performSearch();
        }
    });

    $('#search-button').on('click', performSearch);

    function performSearch() {
        let findProducts = false;
        // Dirige al usuario al principio de la página
        $("html, body").animate({ scrollTop: 50 }, 0);

        // Toma el valor que tiene el input de búsqueda
        let searchValue = document.getElementById('search-input').value;
        let searchTerm = searchValue.toLowerCase();

        // Toma los card de los productos
        let prodCards = $('.col').toArray();

        prodCards.forEach(element => {
            const productCard = $(element);
            const name = productCard.find('.p-name').text().toLowerCase();
            const brand = productCard.find('.p-brand').text().toLowerCase();

            if (name.includes(searchTerm) || brand.includes(searchTerm)) {
                productCard.css('display', 'block');
                findProducts = true;
            } else {
                productCard.css('display', 'none');
            }
        });

        if (!findProducts) {
            $('#error-msg').css('display', 'flex');
        } else {
            $('#error-msg').css('display', 'none');
        }
    }








    /* 2. Filtros: Funcion para mostrar los productos que coincidan con la categoria
    que seleccionen los usuarios en los filtros*/

    function filterProducts(category) {
        const prods = document.getElementsByClassName('prod-card');

        for (let i = 0; i < prods.length; i++) {
            const prod = prods[i];
            const prodContainer = prod.parentNode;

            if (category === 'All') {
                prodContainer.style.display = 'block';
            } else {
                if (prod.getAttribute('prod-category') !== category) {
                    prodContainer.style.display = 'none';
                } else {
                    prodContainer.style.display = 'block';
                }
            }
        }
    }

    $('#choose-all').change(function () {
        filterProducts('All');
    });
    $('#choose-completes').change(function () {
        filterProducts('Completes');
        if (prodQuantity('Completes', false) == 0) {
            $('#error-msg').css('display', 'flex');
        } else {
            $('#error-msg').css('display', 'none');
        }
    });
    $('#choose-decks').change(function () {
        filterProducts('Decks');
        if (prodQuantity('Decks', false) == 0) {
            $('#error-msg').css('display', 'flex');
        } else {
            $('#error-msg').css('display', 'none');
        }
    });
    $('#choose-trucks').change(function () {
        filterProducts('Trucks');
        if (prodQuantity('Trucks', false) == 0) {
            $('#error-msg').css('display', 'flex');
        } else {
            $('#error-msg').css('display', 'none');
        }
    });
    $('#choose-bearings').change(function () {
        filterProducts('Bearings');
        if (prodQuantity('Bearings', false) == 0) {
            $('#error-msg').css('display', 'flex');
        } else {
            $('#error-msg').css('display', 'none');
        }
    });
    $('#choose-griptapes').change(function () {
        filterProducts('Griptapes');
        if (prodQuantity('Griptapes', false) == 0) {
            $('#error-msg').css('display', 'flex');
        } else {
            $('#error-msg').css('display', 'none');
        }
    });
    $('#choose-hardware').change(function () {
        filterProducts('Hardware');
        if (prodQuantity('Hardware', false) == 0) {
            $('#error-msg').css('display', 'flex');
        } else {
            $('#error-msg').css('display', 'none');
        }
    });
    $('#choose-wheels').change(function () {
        filterProducts('Wheels');
        if (prodQuantity('Wheels', false) == 0) {
            $('#error-msg').css('display', 'flex');
        } else {
            $('#error-msg').css('display', 'none');
        }
    });


    /*Cuando no se encuentren los productos que se insertan
    en la barra de busqueda o no haya nada en la categoria
    seleccionada, aparecera un mensaje de error, por lo cual
    se le da la opcion de cambiar la categoria, o volver a
    buscar algo en la barra de busqueda, esta funcion cubre
    la ultima opcion*/

    $('#btn-research').on('click', function () {
        $('#search-input').focus();
        $('#error-msg').css('display', 'none');
        filterProducts('All');
    });

    $('#btn-change-cat').on('click', function () {
        $('#error-msg').css('display', 'none');
        filterProducts('All');
    });








    /////////// SECCION DE COMPRA ///////////////////////

    /*Toma los botones de ADD CART para que se muestre el modal con
    el producto al que corresponde añadir al carrito (el de su misma card)*/
    const getProduct = document.getElementsByClassName('add-cart');

    // Funcion para generar el modal de compra
    function generateModal(event) {
        //Asignacion de caracteristicas del producto en variables
        const product = event.target.offsetParent;
        const structure = product.childNodes;
        const productImg = structure[1].childNodes[1].src;
        const productName = structure[3].getElementsByClassName('p-name')[0].innerHTML;
        const productBrand = structure[3].getElementsByClassName('p-brand')[0].childNodes[1].innerHTML;
        const productPrice = structure[3].getElementsByClassName('p-price')[0].innerHTML.slice(1);
        const productCategory = product.getAttribute('prod-category');
        const prodBannedSizes = product.getAttribute('bansizes');

        //Asignar imagen de producto en modal
        const cartImage = document.getElementById('cart-img');
        cartImage.src = productImg;


        //Asignar nombre de producto en modal
        const cartName = document.getElementById('cart-prod-name');
        cartName.innerHTML = `${productName}`;

        //Asignar marca o brand de producto en modal
        const cartBrand = document.getElementById('cart-prod-brand');
        cartBrand.innerHTML = `<b>Brand:</b> ${productBrand}`;

        //Asignar precio de producto en modal
        const cartPrice = document.getElementById('cart-prod-price');
        cartPrice.innerHTML = `<b>Unit Price:</b> $${productPrice}`;

        //Funcion para asignar la clase de seleccionado en el Tamaño de Producto
        const selectSize = () => {
            $(".size-option").click(function () {
                // Quita la clase 'seleccionado' de todas las opciones
                $(".size-option").removeClass("size-selected");

                /* Agrega la clase 'seleccionado' solo a la opción clicada
                solo si el tamaño no esta "Baneado"*/
                if (!this.classList.contains('size-disabled')) {
                    $(this).addClass("size-selected");
                }

            });

            /*Si el usuario se sale del modal de compra, resetea los
            valores de seleccion del producto (Tamaño y Cantidad)*/
            $("#close-cart").click(
                function () {
                    $(".size-option").removeClass("size-selected");
                    document.querySelector('#prod-quantity').value = 1;
                }
            );
        };

        /*Toma la seccion de tamaños para agregar los tamaños
        que se asignan mas adelante*/
        let sizes = document.getElementById('sizes');

        //Funcion para agregar los tamaños segun la categoria del producto
        const addSize = (size, numSize, messure) => {
            //Agrega un div de opcion de tamaño
            size.classList.add('size-option')
            //Asigna la medidad y cantidad del tamaño
            size.innerHTML = `${numSize} ${messure}.`;
            //Asigna el valor del tamaño en un atributo size value para la compra3
            size.setAttribute('size-value', `${numSize}`);

            /*Si alguna de las medidas asignadas se encuentra baneada,
            se asigna una clase para que no pueda ser seleccionada*/
            if (prodBannedSizes.includes(`${numSize}`)) {
                size.classList.add('size-disabled');
            }
        }

        //Remueve todos los tamaños que los productos tengan para evitar duplicidad
        $('.size-option').remove();

        //Asignacion de productos segun la categoria
        switch (productCategory) {

            case 'Decks':

                //4 Medidas de Decks
                let sizeDeck1 = document.createElement("div");
                addSize(sizeDeck1, '7.75', 'inch');

                let sizeDeck2 = document.createElement("div");
                addSize(sizeDeck2, '8.0', 'inch');

                let sizeDeck3 = document.createElement("div");
                addSize(sizeDeck3, '8.25', 'inch');

                let sizeDeck4 = document.createElement("div");
                addSize(sizeDeck4, '8.5', 'inch');

                sizes.appendChild(sizeDeck1);
                sizes.appendChild(sizeDeck2);
                sizes.appendChild(sizeDeck3);
                sizes.appendChild(sizeDeck4);

                selectSize();
                break;

            case 'Griptapes':

                let sizeGrip1 = document.createElement("div");
                addSize(sizeGrip1, '9.0', 'inch');
                sizeGrip1.classList.add('size-selected');

                sizes.appendChild(sizeGrip1);

                selectSize();
                break;

            case 'Wheels':

                let sizeWheels1 = document.createElement("div");
                addSize(sizeWheels1, '48', 'mm');

                let sizeWheels2 = document.createElement("div");
                addSize(sizeWheels2, '53', 'mm');

                let sizeWheels3 = document.createElement("div");
                addSize(sizeWheels3, '56', 'mm');

                let sizeWheels4 = document.createElement("div");
                addSize(sizeWheels4, '60', 'mm');

                sizes.appendChild(sizeWheels1);
                sizes.appendChild(sizeWheels2);
                sizes.appendChild(sizeWheels3);
                sizes.appendChild(sizeWheels4);

                selectSize();
                break;

            case 'Bearings':

                let sizeBearings1 = document.createElement("div");
                addSize(sizeBearings1, '22', 'mm');
                sizeBearings1.classList.add('size-selected');

                sizes.appendChild(sizeBearings1);

                selectSize();
                break;

            case 'Trucks':

                let sizeTruck1 = document.createElement("div");
                addSize(sizeTruck1, '7.75', 'inch');

                let sizeTruck2 = document.createElement("div");
                addSize(sizeTruck2, '8.0', 'inch');

                let sizeTruck3 = document.createElement("div");
                addSize(sizeTruck3, '8.25', 'inch');

                let sizeTruck4 = document.createElement("div");
                addSize(sizeTruck4, '8.5', 'inch');

                sizes.appendChild(sizeTruck1);
                sizes.appendChild(sizeTruck2);
                sizes.appendChild(sizeTruck3);
                sizes.appendChild(sizeTruck4);

                selectSize();
                break;
        }
    }

    /*Se le asigna la funcion de general el modal de compra al
    el boton de ADD TO CART de todos los productos*/
    for (let i = 0; i < getProduct.length; i++) {
        getProduct[i].addEventListener('click', generateModal);
    };


    // Validacion de la cantidad de producto en el modal
    $('#less-prod').click(function () {
        var quantity = parseInt($('#prod-quantity').val());
        if ((quantity - 1) != 0) {
            $('#prod-quantity').val(quantity - 1);
        }
    });

    $('#more-prod').click(function () {
        var quantity = parseInt($('#prod-quantity').val());
        if ((quantity + 1) <= 10) {
            $('#prod-quantity').val(quantity + 1);
        }
    });

    // Se asigna el estado de las compras de los productos en el modal
    var procCompleted = true;
    var purchaseFailed = true;

    /* Funcion que se encarga de añadir las compras al carrito, además eliminar 
       la transacción de 2 o más compras al mismo tiempo */

    $('#add-to-cart-btn').click(function () {
        
        if (procCompleted) {
            // Resetea las clases para que queden las que corresponden
            procCompleted = false;
            purchaseFailed = false;

            // Verifica condiciones para agregar producto al carrito
            let productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];

            // Propiedades del producto
            let productImage = $('#cart-img').attr('src');
            let productName = $('#cart-prod-name').text();
            let productBrand = document.querySelector('#cart-prod-brand').innerHTML.slice(14);
            let productUnitPrice = parseFloat(document.querySelector('#cart-prod-price').innerHTML.slice(20));

            let checkSizeSelector = $('.size-selected');

            if (checkSizeSelector.length === 0) {
                alert('Choose a size before adding a product to your cart');
                purchaseFailed = true;
            } else {
                var productSize = $('.size-selected').text();
            }

            let productQuantity = parseInt($('#prod-quantity').val());

            for (let i = 0; i < productsCart.length; i++) {
                if (productQuantity > 11 || (productsCart[i].productName === productName &&
                    productsCart[i].productBrand === productBrand &&
                    productsCart[i].productSize === productSize &&
                    (productsCart[i].productQuantity + productQuantity) > 11)) {
                    purchaseFailed = true;
                    alert(`Invalid amount of purchase :(`);
                }
            }

            if (!purchaseFailed) {
                let existingProductIndex = -1;

                for (let f = 0; f < productsCart.length; f++) {
                    let item = productsCart[f];
                    if (item.productName === productName &&
                        item.productBrand === productBrand &&
                        item.productSize === productSize) {
                        existingProductIndex = f;
                        break;
                    }
                }

                if (existingProductIndex !== -1) {

                    // El producto ya está en el carrito, actualiza la cantidad y el subtotal
                    let totalQuantity = productsCart[existingProductIndex].productQuantity + productQuantity;

                    if (totalQuantity > 11) {
                        alert(`You've acquired the maximum amount of this product`);
                    } else {
                        productsCart[existingProductIndex].productQuantity = totalQuantity;
                        productsCart[existingProductIndex].productSubtotal =
                            productsCart[existingProductIndex].productUnitPrice * totalQuantity;
                        localStorage.setItem('productsCart', JSON.stringify(productsCart));
                    }
                } else {

                    // El producto no está en el carrito, se agrega paaaa
                    let productSubtotal = productUnitPrice * productQuantity;

                    let product = {
                        productName: productName,
                        productImage: productImage,
                        productBrand: productBrand,
                        productSize: productSize,
                        productQuantity: productQuantity,
                        productUnitPrice: productUnitPrice,
                        productSubtotal: productSubtotal,
                    };

                    productsCart.push(product);
                    localStorage.setItem('productsCart', JSON.stringify(productsCart));
                }

                // Animaciones random.exe si el proceso de compra es exitoso
                $('#add-to-cart-btn').css('cursor', 'not-allowed');
                $('.succed').removeClass('disappear');
                $('.pendent').removeClass('appear');
                $('.succed').removeClass('appear');
                $('.pendent').addClass('disappear');
                $('#loader-add-cart').addClass('appear');

                // Agrega el producto al carrito
                setTimeout(function () {
                    // Animaciones random.exe
                    $('#loader-add-cart').removeClass('appear');
                    $('#loader-add-cart').addClass('disappear');
                    $('.succed').addClass('appear');
                }, 3000);

                // Finaliza el proceso de añadir al carrito
                setTimeout(function () {
                    // Animaciones random.exe
                    $('#purchase-warn').removeClass('show-warn');
                    $('.succed').removeClass('appear');
                    $('.succed').addClass('disappear');
                    $('#add-to-cart-btn').css('cursor', 'pointer');
                    $('.pendent').removeClass('disappear');
                    $('.pendent').addClass('appear');
                    $('#add-to-cart-btn').css('cursor', 'pointer');
                    procCompleted = true;
                }, 4000);
            } else {
                procCompleted = true;
            }
        } else {
            // Aviso de que hay una compra en proceso
            // $('#purchase-warn').addClass('show-warn');
        }

        const cartSize = JSON.parse(localStorage.getItem('productsCart')) || [];
        
        if (cartSize.length < 9) {
            $('#cart-size').text(cartSize.length);
        } else {
            $('#cart-size').text('+9');
        }

    });
});
