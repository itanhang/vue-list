const STORAGE_KEY = 'todos-vuejs'
export default {
    set: function (items) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    },
    get: function () {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    }
}