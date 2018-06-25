import React, {Component} from 'react';
import WDBWidget from './WDBWidget';

class WDBPanel extends Component{
    constructor(props){
        super(props)
        this.state = { widgets: props.widgets }
    }

    addWidget(cityCode){
        if(this.state.widgets.some(widget => widget.cityCode === cityCode))
            alert('Виджет погоды для выбранного города уже размещен на панели.')
        else {
            const widgets = [...this.state.widgets, { cityCode }]
            this.setState({widgets})
        }
    }

    removeWidget(cityCode){
        this.setState({widgets: this.state.widgets.filter(widget => widget.cityCode !== cityCode)})
        this.props.onRemoveWidget(cityCode)
    }

    render(){
        return  <div className="wdb-panel">
                {
                    this.state.widgets.map((widget)=>
                        <WDBWidget key={widget.cityCode} cityCode={widget.cityCode} onClose={this.removeWidget.bind(this)} />
                    )
                }
                </div>
    }
}

export default WDBPanel
