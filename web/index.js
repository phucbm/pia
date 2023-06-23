import './styles/index.scss'
import '@/_index'
import homeHtml from "./html/home.html";

/**
 * Create HTML
 */
const app = document.querySelector('#root')
app.innerHTML = homeHtml;

// init
if(Pia.isExpired('pia-day')) Pia.set('pia-day', 'test day', {expires: 2});
if(Pia.isExpired('pia-hour')) Pia.set('pia-hour', 'test hour', {expires: 2, unit: 'hour'});

Pia.test('pia-day');
Pia.test('pia-hour');