import React, {Component} from 'react'
import WDBToolbar from './WDBToolbar'
import WDBPanel from './WDBPanel'

const WDBControl = (cities, widgetsStorage) =>
	class WDBControl extends Component {

		componentWillMount() {
			this.widgets = widgetsStorage.deserializeWidgets()
		}

		render() {
			return <div className="wdb-control">
						<WDBToolbar cities = {cities} onAddCity={this.addWidgetToPanel.bind(this)} />
						<WDBPanel widgets = {this.widgets} ref="widgetsPanel" onRemoveWidget={this.removeWidgetFromPanel.bind(this)} />
					</div>
		}
		
		addWidgetToPanel(cityCode, cityName){
			var widgets = widgetsStorage.deserializeWidgets()
			widgets.push({ cityCode, cityName })
			widgetsStorage.serializeWidgets(widgets)

			this.refs.widgetsPanel.addWidget(cityCode)
		}

		removeWidgetFromPanel(cityCode) {
			var widgets = widgetsStorage.deserializeWidgets()
			widgetsStorage.serializeWidgets(widgets.filter(function(widget){
				return widget.cityCode !== cityCode
			}))
		}
	}

export default WDBControl