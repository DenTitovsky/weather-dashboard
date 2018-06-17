import React, { Component } from 'react';

class WDBToolbar extends Component {

    onClickAddCityButton(){
        const { citySelector } = this.refs;
        let selectedCityId = citySelector.value;
        if(selectedCityId){
            this.props.onAddCity(selectedCityId)
            citySelector.value = ""
        } else {
            alert("Выберите город, для которого нужно добавить виджет погоды.")
        }
    }

    render(){

        let selectItems = [{
            id: '',
            name: 'Выберите город'
        }, ...this.props.cities]

        return <div className="wdb-toolbar">
                    <select className="wdb-city-selector" ref="citySelector">
                        {
                            selectItems.map(function(city){
                                return <option key={city.id} value={city.id}>{city.name}</option>
                            })
                        }
                    </select>
                    <button className="wdb-add-city-button" ref="addCityButton" type="button" onClick={this.onClickAddCityButton.bind(this)}>Добавить город</button>
                </div>
    }
}

export default WDBToolbar;