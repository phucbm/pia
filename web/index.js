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
if(Pia.isExpired('pia-never')) Pia.set('pia-never', 'test never');

Pia.test('pia-day', true);
Pia.test('pia-hour', true);
Pia.test('pia-never', true);


Pia.update('pia-day', 'test update');