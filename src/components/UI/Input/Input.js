import React from "react";
import classes from "./Input.css";

const input = (props) => {

    let inputElement = null;

    switch (props.inputType) {
        case ("input"):
            inputElement = <input className={classes.InputElement}{...props} />
            break;
        case ("textarea"):
            inputElement = <textarea className={classes.InputElement} {...props} />
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props} />
    }
    // Becasue we're going to have multiple types of inputs, it makes sense to use a switch case to manage the different inputs
    // Alternatively, we could have also just made multiple custom components, but this is much faster.
    // We expect to get the attributes we want as props for the input wrapper; this will allow us to distribute them on the element

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;