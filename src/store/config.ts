export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      // for initially empty lists
      config: {} as Config | any,
      // for data that is not yet loaded
    }
  },
  actions: {
  },
})

interface Config {
}
