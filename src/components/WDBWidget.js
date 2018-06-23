import React, {Component} from 'react';

const cityWeatherInfoLoader = cityCode => new Promise((resolve, reject) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?appid=05e91536a9197900dec0d6bf26e3ba76&units=metric&id=${cityCode}`
    const request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = () => request.status === 200 ?
        resolve(JSON.parse(request.response)) :
        reject(Error(request.statusText))
    request.onerror = err => reject(err)
    request.send()
})

class WDBWidget extends Component {

    constructor(props){
        super(props)
        this.state = {
            cityCode: props.cityCode,
            loading: true,
            cityWeatherInfo: {
                cityName: '',
                iconTitle: '',
                iconURL: '',
                temperature: '',
                wind: '',
                pressure: ''
            },
            error: ''
        }
    }

    componentWillMount() {
        this.loadCityWeatherInfo(this.state.cityCode)
    }

    componentDidMount(){
        this.cityWeatherInfoLoadTimer = setInterval(() => {
            this.setState({ loading: true })
            this.loadCityWeatherInfo(this.state.cityCode)
        }, 300000)
    }

    componentWillUnmount() {
        clearInterval(this.cityWeatherInfoLoadTimer)
    }

    loadCityWeatherInfo(cityCode) {
        cityWeatherInfoLoader(cityCode).then( response => {
            const cityWeatherInfo = {
                cityName: response.name,
                iconTitle: `${response.weather[0].main}, ${response.weather[0].description}`,
                iconURL: `http://openweathermap.org/img/w/${response.weather[0].icon}.png`,
                temperature: `${response.main.temp}° C`,
                wind: `Ветер: ${response.wind.speed} meter/sec`,
                pressure: `Давление: ${response.main.pressure} hPa`
            }

            this.setState({ loading: false, cityWeatherInfo, error: '' })
        },
        error => {
            this.setState({ loading: false, error })
        })
    }

    onClickClose() {
        this.props.onClose(this.state.cityCode)
    }

    render() {
        const { loading, cityWeatherInfo } = this.state
        return  <div className="axdb-widget">
                    <table>
                        <tbody>
                            <tr>
                                <td className="axdb-widget-geography" colSpan="2">{cityWeatherInfo.cityName}</td>
                                <td className="axdb-widget-close-cell fa fa-close" onClick={this.onClickClose.bind(this)} ></td>
                            </tr>
                            <tr>
                                {
                                    loading ?
                                        <td className="axdb-widget-weather-image axdb-widget-loading" />
                                    :
                                    <td className="axdb-widget-weather-image">
                                        <img title={cityWeatherInfo.iconTitle} alt={cityWeatherInfo.iconTitle} src={cityWeatherInfo.iconURL}/>
                                    </td>
                                }
                                <td className="axdb-widget-weather-temperature">{cityWeatherInfo.temperature}</td>
                                <td rowSpan="3"></td>
                            </tr>
                            <tr>
                                <td className="axdb-widget-wind" colSpan="2">{cityWeatherInfo.wind}</td>
                            </tr>
                            <tr>
                                <td className="axdb-widget-preasure" colSpan="2">{cityWeatherInfo.pressure}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
    }
}

export default WDBWidget;