import { Component, createElement } from "react";
import "../ui/DynamicMeasurementConverter.css";

export class HelloWorldSample extends Component {
    render() {
        return <div className="widget-preview">
            <input type="text" value={this.props.sampleText} style={{width:"100%"}}/>
        </div>;
    }
}
