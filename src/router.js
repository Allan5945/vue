// router.js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
// const HelloWorld = resolve => require(['./components/HelloWorld.vue'], resolve);
const Test = resolve => require(['./components/Test.vue'], resolve);

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: HelloWorld,
          children: [
              {
                  path: 'test',
                  component: Test,}
                  ]
      },
      {
        path: '*', 
        redirect: '/' 
      }
    ]
  })
}