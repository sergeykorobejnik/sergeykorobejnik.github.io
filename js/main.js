"use strict";


let onClickhandler = function (selector, activeClass, activeClasses = [], absolutePos = []) {
    let temp = document.querySelector(`.${selector}`);

    temp.addEventListener('click', () => {
        activeClasses.forEach(element => {
            let temp = document.querySelector(`.${element}`);
            temp.classList.toggle(`${activeClass}`);
            console.log(temp);
        });

        absolutePos.forEach(element => {
            let temp = document.querySelector(`.${element}`);
            if (temp.style.position == '' || temp.style.display == '') {
                temp.style.display = 'flex';
                temp.style.position = 'absolute';
                temp.style.backgroundColor = 'white';
                temp.style.zIndex = '50';
            } else {
                temp.style.display = '';
                temp.style.position = '';
                temp.style.backgroundColor = '';
                temp.style.zIndex = '';
            }
        });
    });
};

function widthChange(event, targetAction) {
    let eventTarget = document.querySelector(`.${event}`).addEventListener('click', selector => {
        selector = document.querySelector(`.${targetAction}`);
        if (selector.style.width == '') {
            if(window.matchMedia('min-width: 1024px') == true) {
                selector.style.width = '23vw';
            } else {
                selector.style.width = '100vw';
            }
        } else {
            selector.style.width = '';
        }
    });
}

function mouseOut(selector, activeClass) {
    let temp = document.querySelectorAll(`${selector}`);
    temp.forEach(element => {
        element.addEventListener('click', function () {            
            element.childNodes.forEach(innerElement => {
                if (innerElement.nodeName == '#text') return;
                if (innerElement.classList.contains('dropdown') == true) {
                    gsap.to(innerElement, {
                        maxHeight: innerElement.childNodes[1].offsetHeight,
                        duration: 0.8,
                    });
                    gsap.fromTo(innerElement.querySelectorAll('.dropdown-holder a'),{
                        x: '-100%',
                    },
                    {
                        x: '0%',
                        stagger: 0.1,
                        duration: 0.8
                    });                        
                    innerElement.addEventListener('mouseleave', () => {
                        gsap.to(innerElement, {
                            maxHeight:  0,
                            duration: 0.7,
                        });
                    });
                }
            });
        });
        element.addEventListener('mouseleave', function (dropDown) {
            dropDown = document.querySelectorAll('.dropdown');
            dropDown.forEach(element => {
                gsap.to(element, {
                    maxHeight:  0,
                    duration: 0.7,
                });
            });
        });
    });
};


onClickhandler('search', 'active', ['search-input', 'close-icon'], ['search-holder', 'body-overlay']);
onClickhandler('close-icon', 'active', ['search-input', 'close-icon'], ['search-holder', 'body-overlay']);
widthChange('search', 'search-holder');
widthChange('close-icon', 'search-holder');
mouseOut('.header .contacts > li, .nav-menu > li');


function  test(lol) {
    lol = document.querySelectorAll('#header .contacts > li, .nav-menu > li');
    return lol;
}

$('.burger').click(function () {
    $(this).toggleClass('burger-active');
    $('nav').toggleClass('nav-active');
    $('body').toggleClass('body-overlay');
});
