import React, {Component} from 'react';
import WDBWidget from './WDBWidget';

class WDBPanel extends Component{
    constructor(props){
        super(props)
        this.state = {widgets: []}
    }

    addWidget(cityCode){
        if(this.state.widgets.some(widget => widget === cityCode))
            alert('Виджет погоды для выбранного города уже размещен на панели.')
        else {
            const widgets = [...this.state.widgets, cityCode]
            this.setState({widgets})
        }
    }

    removeWidget(cityCode){
        var widgets = []
        this.state.widgets.forEach(element => {
            if(element !== cityCode)
                widgets.push(element)
        });
        this.setState({widgets})
    }

    render(){
        return  <div className="wdb-panel">
                {
                    this.state.widgets.map((widget)=>
                        <WDBWidget key={widget} cityCode={widget} onClose={this.removeWidget.bind(this)} />
                    )
                }
                </div>
    }
}

export default WDBPanel