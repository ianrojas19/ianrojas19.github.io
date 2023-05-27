const checkbox = document.getElementById('checkbox');
const navigation = document.getElementById('ul-navigation');
const dropProd = document.getElementById('dropdownMenuButton');
const spanProd = document.getElementById('icon-drop-prod');
const dropItemDown = document.getElementById('navi-item-down');
const typeProdMenu = document.getElementById('prod-types-menu');
const arrow = document.getElementById('arrow');
const link = document.querySelector('.navi-item');
const link2 = document.querySelector('.dropdown-item');

const closeNav = () => {
  navigation.classList.add('disable');
  navigation.classList.remove('enable');
  checkbox.checked = false;
};

const enableNav = () => {
  const enable = checkbox.checked;
  navigation.classList.toggle('disable', !enable);
  navigation.classList.toggle('enable', enable);
  if (!enable) {
    navigation.style.height = '260px';
    typeProdMenu.style.display = 'none';
    navigation.style.justifyContent = 'flex-start';
    arrow.style.transform = 'rotateX(0deg)';
    arrow.style.stroke = '#2764e8e9';
    dropItemDown.style.marginTop = '0px';
    spanProd.classList.add('inactive-prod-list');
    spanProd.classList.remove('active-prod-list');
  }
};

const enableProdList = () => {
  const isActive = spanProd.classList.contains('inactive-prod-list');

  navigation.style.height = isActive ? '505px' : '260px';
  typeProdMenu.style.display = isActive ? 'flex' : 'none';
  typeProdMenu.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
  navigation.style.justifyContent = 'flex-start';
  dropItemDown.style.marginTop = isActive ? '-15px' : '0px';
  arrow.style.transform = isActive ? 'rotateX(180deg)' : 'rotateX(0deg)';
  arrow.style.stroke = isActive ? 'red' : '#2764e8e9';
  spanProd.classList.toggle('active-prod-list', isActive);
  spanProd.classList.toggle('inactive-prod-list', !isActive);
};

link.addEventListener('click', closeNav);
link2.addEventListener('click', closeNav);

checkbox.addEventListener('click', () => {
  if (window.innerWidth <= 1000) {
    enableNav();
  }
});

dropProd.addEventListener('click', () => {
  if (window.innerWidth <= 1000) {
    enableProdList();
  }
});
