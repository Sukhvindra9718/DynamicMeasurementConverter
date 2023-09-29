import { createElement, Fragment, useEffect, useState } from "react";
import "./ui/DynamicMeasurementConverter.css";

export function DynamicMeasurementConverter(props) {
    const [values, setValues] = useState(0.00);
    const [conversion, setConversion] = useState(0.00);
    const [dec, setDec] = useState("");

    const handleChange = async (e) => {
        setDec(e.target.value);
        // Set TextValue        
        props.inputValue.setValue(decValue);


        // Set TextValue        
        props.inputValue.setTextValue(decValue);
        if (props.onChange && props.onChange.canExecute) {
            props.onChange.execute();
        }
    };
    const handleFocus = (event) => event.target.select();

    const handleFocusOut = () => {
        const decValue = "" + values

        // Set TextValue        
        props.inputValue.setValue(decValue);


        // Set TextValue        
        props.inputValue.setTextValue(decValue);

        // Call a microflow
        if (props.onChange && props.onChange.canExecute) {
            props.onChange.execute();
        }
    }

    useEffect(() => {
        setConversion(parseFloat(props.inputConversionRate.displayValue));
        setValues(parseFloat(props.inputValue.displayValue));
        var ans = (isNaN(values) && isNaN(conversion)) ? "0" : parseFloat(props.inputValue.displayValue) / parseFloat(props.inputConversionRate.displayValue);
        setDec(ans);
    }, [props.inputConversionRate, props.inputValue]);

    useEffect(() => {
        setValues(dec * conversion);
    }, [dec]);

    return (
        <Fragment>
            <div className="textbox">
                <p>Convert value</p>
                <input
                    type="text"
                    value={dec}
                    onFocus={e => {
                        handleFocus(e);
                    }}
                    onBlur={e => {
                        handleFocusOut(e);
                    }}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(evt) => ["e", "E", "+", "-", "ArrowDown", "ArrowUp"].includes(evt.key) && evt.preventDefault()}
                />
            </div>
        </Fragment>

    );
}