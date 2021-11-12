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
            selector.style.width = '21vw';
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
                        maxHeight: $('.dropdown-holder').innerHeight(),
                        duration: 0.8,
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
mouseOut('#header .contacts > li, .nav-menu > li');

/* console.log(document.querySelectorAll('#header .dropdown'));
console.log(document.querySelectorAll('#header .contacts > li, .nav-menu > li'));
 */
/* $('li').mouseover(function() {
    gsap.to('#header li', {
        x: 200,
        duration: 0.8
    });
}); */
