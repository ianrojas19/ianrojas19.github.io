let checkbox = document.getElementById('checkbox');
let navigation = document.getElementById('ul-navigation');
let dropProd = document.getElementById('dropdownMenuButton');
let spanProd = document.getElementById('icon-drop-prod');
let dropItemDown = document.getElementById('navi-item-down');
let typeProdMenu = document.getElementById('prod-types-menu');
let arrow = document.getElementById('arrow');

const enableNav = () => {
    if (checkbox.checked) {
        navigation.classList.remove('disable');
        navigation.classList.add('enable');
        
    } else {
        navigation.classList.add('disable');
        navigation.classList.remove('enable');
        navigation.style.height = '250px';
        typeProdMenu.style.display = 'none';        
        arrow.style.transform = 'rotateX(0deg)';
        arrow.style.stroke = '#2764e8e9';
        dropItemDown.style.marginTop= '0px';
        spanProd.classList.add('inactive-prod-list');
        spanProd.classList.remove('active-prod-list');
    }
}

const enableProdList = () => {
    if (spanProd.className == 'inactive-prod-list') {
        navigation.style.height = '550px';
        typeProdMenu.style.display = 'flex';
        navigation.style.justifyContent = 'flex-start';
        dropItemDown.style.marginTop= '20px';
        arrow.style.transform = 'rotateX(180deg)';
        arrow.style.stroke = 'red';
        spanProd.classList.add('active-prod-list');
        spanProd.classList.remove('inactive-prod-list');
    }
    else {
        navigation.style.height = '250px';
        typeProdMenu.style.display = 'none';
        navigation.style.justifyContent = 'flex-start';
        arrow.style.transform = 'rotateX(0deg)';
        dropItemDown.style.marginTop= '0px';
        arrow.style.stroke = '#2764e8e9';
        spanProd.classList.add('inactive-prod-list');
        spanProd.classList.remove('active-prod-list');
    }
}


checkbox.addEventListener('click', function() {
    if (window.innerWidth <= 1000) {
      enableNav();
    }
  });
  
  dropProd.addEventListener('click', function() {
    if (window.innerWidth <= 1000) {
      enableProdList();
    }
  });
