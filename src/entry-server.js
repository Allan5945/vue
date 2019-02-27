import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      let s = "hello";
        store.commit('CHANGENAME',s);
        context.state = {
            name:s
        };

      resolve(app)
    }, reject)
  })
}