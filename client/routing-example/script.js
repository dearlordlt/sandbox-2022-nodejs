'use strict'

let mainContent = document.getElementById('main-content');
const links = document.querySelectorAll('[data-router-link]');

Array.from(links).forEach(link => {
    link.addEventListener('click', () => {
       const { routerLink } = link.dataset;
       history.pushState(null, null, routerLink);
       setMainContent(routerLink);
    });
});

window.addEventListener('popstate',  (event) => {
   setMainContent(event.currentTarget.location.pathname);

});

const setMainContent = value => mainContent.innerHTML = value;
