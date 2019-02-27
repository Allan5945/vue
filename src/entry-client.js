import { createApp } from './app'

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {

    // console.log(store)
    app.$mount('#app');
});


