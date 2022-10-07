import {uniqueId} from "@/utils";


/**
 * Private class
 */
class MyLib{
    constructor(options){
        this.id = uniqueId();
        this.options = {
            el: undefined,
            ...options
        };

        this.options.el.innerHTML = 'Hello!';
    }
}


/**
 * Private class Controller
 * This class will hold instances of the library's objects
 */
class Controller{
    constructor(){
        this.instances = [];
    }

    add(slider){
        this.instances.push(slider);
    }

    get(id){
        return this.instances.filter(instance => instance.id === id)[0];
    }
}


/**
 * Public library data
 * access via window.MyLibController
 */
window.MyLibController = new Controller();


/**
 * Public library object
 * access via window.MyLib
 */
window.MyLib = {
    // init new instances
    init: (options = {}) => {
        const selector = options.selector || '[data-my-lib]';

        // init with selector
        document.querySelectorAll(selector).forEach(el => {
            window.MyLibController.add(new MyLib({el, ...options}));
        });
    },
    // Get instance object by ID
    get: id => window.MyLibController.get(id)
};

window.MyLib.init();