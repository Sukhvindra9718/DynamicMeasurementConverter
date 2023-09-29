import { createElement, Fragment, useEffect, useState } from "react";
import "./ui/DynamicMeasurementConverter.css";

export function DynamicMeasurementConverter(props) {
    const [values, setValues] = useState(0.00);
    const [conversion, setConversion] = useState(0.00);
    const [dec, setDec] = useState("");
    let clearTimeout;


    async function callMicroflow(eVal) {
        console.log("callMicroflow",dec);
        const decValue = "" + (eVal*conversion)
        // Set TextValue        
        props.inputValue.setValue(decValue);


        // Set TextValue        
        props.inputValue.setTextValue(decValue);
        setTimeout(() => {
            // Call a microflow
            if (props.onChange && props.onChange.canExecute) {
                props.onChange.execute();
            }
        }, 200);
    }
    const handleChange = (e) => {
        console.log("handleChange");
        setDec(e.target.value);
        console.log("e.ta",e.target.value);
        clearTimeout = setTimeout(() => {
            callMicroflow(e.target.value);
        }, 500);
        // callMicroflow();
    };
    const handleFocus = (event) => event.target.select();

    const handleFocusOut = () => {
        // const decValue = "" + values

        // Set TextValue        
        // props.inputValue.setValue(decValue);


        // // Set TextValue        
        // props.inputValue.setTextValue(decValue);

        // // Call a microflow
        // if (props.onChange && props.onChange.canExecute) {
        //     props.onChange.execute();
        // }
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
                <p>{props.labelcaption}</p>
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