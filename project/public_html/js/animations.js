var checkbox = document.getElementById('checkbox');
var navigation = document.getElementById('ul-navigation');
const enable = () => {
    if (checkbox.checked) {
        navigation.classList.remove('disable');
        navigation.classList.add('enable');
    } else {
        navigation.classList.add('disable');
        navigation.classList.remove('enable');
    }
}

checkbox.addEventListener('click', enable);
