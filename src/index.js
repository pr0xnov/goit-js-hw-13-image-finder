import { error, defaultModules, Stack } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import { template } from 'handlebars';
import debounce from 'lodash/debounce';
import objFetchImg from './js/apiService.js'
import refs from './js/refs.js'
import cardMarkup from './templates/cardMarkup.hbs'

const myStack = new Stack({
    dir1: 'up',
    maxOpen: 1,
    maxStrategy: 'close',
    modal: true,
    overlayClose: true
});

//========================================================

refs.button.classList.add('hide');
refs.mainInput.addEventListener('input', debounce(onEnterInput, 1500));
refs.button.addEventListener('click', () => {
    objFetchImg.fetchImages()
        .then(({ hits }) => {
                if (!hits) {
                return;
                }
                createMarkup(hits);
                onSmoothScroll();
                objFetchImg.incrPage();
                return hits;
            })
            .catch(error => console.log(error));
});

function onEnterInput(e) {
    objFetchImg.dafaultPage();
    objFetchImg.query = e.target.value.trim();
    if (objFetchImg.searchQuery.length < 1) {
         throwErrorInvalid();
            return;
        }   
    refs.gallery.innerHTML = '';
    objFetchImg.fetchImages()
        .then(({ hits }) => {
                if (!hits) {
                return;
                }
                createMarkup(hits);
                onSmoothScroll();
                objFetchImg.incrPage();
                return hits;
            })
            .catch(error => console.log(error));
 }

function createMarkup(hits) {
    if (hits.length === 0) {
            refs.button.classList.add('hide');
            throwErrorInvalid();
            return;
    }
    refs.button.classList.remove('hide');
    refs.gallery.insertAdjacentHTML('beforeend', cardMarkup(hits));
}

function onSmoothScroll() {
    refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
});
}

export function throwErrorInvalid() {
    refs.mainInput.disabled = true;
            error({
             text: "Please enter valid query!",
             stack: myStack
            });
    refs.mainInput.disabled = false;
    refs.mainInput.value = '';
 }