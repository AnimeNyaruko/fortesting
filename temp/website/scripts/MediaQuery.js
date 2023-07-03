var _1024px = window.matchMedia('(max-width:1024px)');
var _1270px_1024px = window.matchMedia('(max-width:1270px)');
var _480px = window.matchMedia('(max-width:480px)');
//Define HTML element
let wheen_container = document.getElementById('wheel-container');


function at1024px(){
    if(_1024px.matches){
        document.querySelector('#close-pop-up header').classList.remove('h3');
        document.querySelector('#close-pop-up header').classList.add('h1');
        
        document.querySelector('#container').classList.remove('container');
        document.querySelector('#container').classList.add('container-fluid');

        document.querySelector('#container').classList.remove('w-50');
        document.querySelector('#container').classList.add('w-100');
    }
    else{
        document.querySelector('#close-pop-up header').classList.remove('h1');
        document.querySelector('#close-pop-up header').classList.add('h3');

        document.querySelector('#container').classList.remove('w-100');
        document.querySelector('#container').classList.add('w-50');

        document.querySelector('#container').classList.remove('container-fluid');
        document.querySelector('#container').classList.add('container');
    }
};
function at1270px(){
    if(_1270px_1024px.matches){
        document.querySelector('#close-pop-up header').classList.remove('my-3');
        document.querySelector('#close-pop-up header').classList.add('my-1');

        document.querySelector('#close-pop-up>p').classList.remove('mb-4');
        document.querySelector('#close-pop-up>p').classList.add('mb-2');

    }
    else{
        document.querySelector('#close-pop-up header').classList.remove('my-1');
        document.querySelector('#close-pop-up header').classList.add('my-3');

        document.querySelector('#close-pop-up>p').classList.remove('mb-2');
        document.querySelector('#close-pop-up>p').classList.add('mb-4');
    }
}
at1024px();
at1270px();
_1024px.addEventListener('change',at1024px);
_1270px_1024px.addEventListener('change',at1270px);