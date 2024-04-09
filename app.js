const sidebar = document.querySelector('#sidebar');

document.querySelector('#close-sidebar').addEventListener('click', function () {
    sidebar.style.right = '100%';
});

document.querySelector('#open-sidebar').addEventListener('click', function () {
    sidebar.style.right = '0%';
});