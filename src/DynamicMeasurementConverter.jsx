import { createElement, Fragment, useEffect, useState } from "react";
import "./ui/DynamicMeasurementConverter.css";
import classNames from "classnames";

export function DynamicMeasurementConverter(props) {
    const [values, setValues] = useState(0.0);
    const [conversion, setConversion] = useState(0.0);
    const [dec, setDec] = useState("");


    async function callMicroflow(eVal) {
        const decValue = "" + eVal * conversion;

        // Set TextValue
        props.inputValue.setTextValue(parseFloat(decValue).toFixed(6));
        if (props.onChange && props.onChange.canExecute) {
            setTimeout(() => {
                props.onChange.execute();
            }, 300);
        }
    }
    const handleChange = e => {
        setDec(e.target.value);
        setTimeout(() => {
            callMicroflow(e.target.value);
            clearTimeout();
        }, 3000);
    };
    const handleFocus = event => event.target.select();

    const handleFocusOut = () => {
        const decValue = "" + values;

        // Set TextValue
        props.inputValue.setTextValue(parseFloat(decValue).toFixed(6));
        // Call a microflow
        if (props.onBlurChange && props.onBlurChange.canExecute) {
            props.onBlurChange.execute();
        }
    };
    const calculateUnit = () => {
        setConversion(parseFloat(props.inputConversionRate.displayValue));
        setValues(parseFloat(props.inputValue.displayValue));

        var ans =
            isNaN(values) && isNaN(conversion)
                ? "0"
                : props.inputValue.displayValue / props.inputConversionRate.displayValue;


        var precise = parseFloat(ans).toFixed(props.decimalPrecision.value);
        setDec(precise);
    }

    useEffect(() => {
        calculateUnit();
        return () => { }
    }, [props.inputConversionRate, props.inputValue]);

    useEffect(() => {
        return () => setValues(dec * conversion);
    }, [dec]);

    return (
        <Fragment>
            <div style={props.style} className={classNames(props.class, 'form-group', 'dynamicMeasurementConverterInput')}>
                <input
                    type="text"
                    value={isNaN(dec) ? " ": dec}
                    placeholder={props.placeholder}
                    onFocus={e => {
                        handleFocus(e);
                    }}
                    onBlur={e => {
                        handleFocusOut(e);
                    }}
                    onChange={e => handleChange(e)}
                    onKeyDown={evt =>
                        ["e", "E", "+", "-", "ArrowDown", "ArrowUp"].includes(evt.key) && evt.preventDefault()
                    }
                    className="form-control"
                    autoComplete="on"
                    disabled={props?.inputValue?.readOnly}
                />
                <span className="unitLabel">{props.unit}</span>
            </div>
        </Fragment>
    );
}
