/**
 * Библиотека функций для сохранения и загрузки состояния коллекции виджетов из cookie 
 */
const WDBCookiesStorage = () => {

    /**
     * Ключ cookies для хранения коллекции данных виджетов
     */
    const cookiesName = 'wdb-control-widgets';

    /**
     * Загрузка коллекции данных виджетов из cookie
     * @returns {Array.<{cityCode, cityName}>} Коллекция данных виджетов
     */
    function deserializeWidgets() {
        var result = []
        try {
            let cookies = document.cookie.split(';')
            cookies.forEach(function(cookie){
                if(0 === cookie.indexOf(cookiesName)) {
                    result = JSON.parse(cookie.split('=')[1])
                }
            })
        } catch(e) {
            console.warn(`Не удалось загрузить из cookies сохраненную коллекцию данных виджетов. Ошибка: ${e}`)
        }
        return result
    }

    /**
     * Сохранение данных виджетов в cookie
     * @param {Array.<{cityCode, cityName}>} widgets Коллекция данных виджетов
     */
    function serializeWidgets(widgets) {
        var expirationDate = (new Date(new Date().getTime() + 60 * 60 * 1000)).toUTCString();
        document.cookie = `${cookiesName}=${JSON.stringify(widgets)}; expires=${expirationDate}`
    }

    return { deserializeWidgets, serializeWidgets }
}

export default WDBCookiesStorage