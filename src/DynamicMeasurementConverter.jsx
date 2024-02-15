import { createElement, Fragment, useEffect, useState } from "react";
import "./ui/DynamicMeasurementConverter.css";
import classNames from "classnames";

export function DynamicMeasurementConverter(props) {
    const [values, setValues] = useState('');
    const [conversion, setConversion] = useState('');
    const [dec, setDec] = useState("");


    async function callMicroflow(eVal) {
        const decValue = eVal * conversion;
        // Set TextValue

        props.inputValue.setTextValue(parseFloat(decValue).toFixed(6));


        if (props.onChange && props.onChange.canExecute) {
            setTimeout(() => {
                props.onChange.execute();
            }, 300);
        }
    }
    const handleChange = e => {
        if (e.target.value === "") {
            setDec("");
            props.inputValue.setTextValue("");
            return;
        }
        if (props.charValid === -1) { } else {
            if (parseFloat(e.target.value) > props.charValid) {
                return;
            }
        }
        setDec(e.target.value);
        setTimeout(() => {
            callMicroflow(e.target.value);
            clearTimeout();
        }, 2000);
    };
    const handleFocus = event => event.target.select();

    // const handleFocusOut = () => {
    //     if(e.target.value === "") {
    //         setDec("");
    //         props.inputValue.setTextValue("");
    //         return;
    //     }
    //     // Call a microflow
    //     if (props.onBlurChange && props.onBlurChange.canExecute) {
    //         props.onBlurChange.execute();
    //     }
    // };
    const calculateUnit = () => {
        setConversion(parseFloat(props.inputConversionRate.displayValue));
        setValues(parseFloat(props.inputValue.displayValue));

        if (props.inputValue.displayValue === "0" || props.inputConversionRate.displayValue === "0") {
            setDec(0);
            return;
        }
        else if (isNaN(props.inputValue.displayValue) || isNaN(props.inputConversionRate.displayValue) || props.inputValue.displayValue === "" || props.inputConversionRate.displayValue === "") {
            setDec("");
            return;
        }

        var ans =
            isNaN(values) && isNaN(conversion)
                ? ""
                : parseFloat(props.inputValue.displayValue) / parseFloat(props.inputConversionRate.displayValue);
        ;
        var precise = ans === "" ? "" : parseFloat(ans).toFixed(props.decimalPrecision.value);
        setDec(precise);
    }

    useEffect(() => {
        calculateUnit();
        return () => { }
    }, [props.inputConversionRate, props.inputValue]);

    useEffect(() => {
        return () => setValues(parseFloat(dec) * conversion);
    }, [dec]);

    return (
        <Fragment>
            <div style={props.style} className={classNames(props.class, 'form-group', 'dynamicMeasurementConverterInput')}>
                <input
                    type="number"
                    value={(isNaN(dec) || dec === "") ? "" : dec}
                    placeholder={props.placeholder}
                    onFocus={e => {
                        handleFocus(e);
                    }}
                    // onBlur={e => {
                    //     handleFocusOut(e);
                    // }}
                    onChange={e => handleChange(e)}
                    onKeyDown={evt =>
                        ["e", "E", "+", "-", "ArrowDown", "ArrowUp"].includes(evt.key) && evt.preventDefault()
                    }
                    onWheel={(e) => e.target.blur()}
                    className="form-control"
                    autoComplete="off"
                    disabled={props?.inputValue?.readOnly}
                />
                <span className="unitLabel">{props.unit}</span>
            </div>
        </Fragment>
    );
}
