import './styles/index.scss'
import '@/_index'
import homeHtml from "./html/home.html";

/**
 * Create HTML
 */
const app = document.querySelector('#root')
app.innerHTML = homeHtml;

// init
// Pia.set('hey2', 124);
// Pia.set('hey2', 1.4);
// Pia.set('hey3', {test: 'lorem'});
// Pia.set('hey3', [1, 2, 3]);
Pia.set('hey1', [1, 2, 3], {expires: 2});
Pia.get('hey1');