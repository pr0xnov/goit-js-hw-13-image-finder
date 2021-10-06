import { error, defaultModules, Stack } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

import {throwErrorInvalid} from '../index.js'
// import {createMarkup} from './index.js'
// import {onSmoothScroll} from './index.js'

const myStack = new Stack({
    dir1: 'up',
    maxOpen: 1,
    maxStrategy: 'close',
    modal: true,
    overlayClose: true
});

//========================================================

const API_key = '23557940-e0a9cdf2e70b178fd7f1f33b8';
export default {
    searchQuery: '',
    page: 1,

    fetchImages() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_key}`;
        return fetch(url)
            .then(response => {
                if (response.ok) {
                return response.json();
                }
                if (response.status === 404) {
                   throwErrorInvalid();
            }
            })
    },

    incrPage() {
        this.page += 1;
    },
    dafaultPage() {
        this.page = 1;
    },
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    },
};