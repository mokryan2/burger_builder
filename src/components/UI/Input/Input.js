import React from "react";

const input = (props) => {

    let inputElement = null;

    switch (props.inputType) {
        case ("input"):
            inputElement = <input />
            break;
        default:
            inputElement = <input />
    }
    // Becasue we're going to have multiple types of inputs, it makes sense to use a switch case to manage the different inputs
    // Alternatively, we could have also just made multiple custom components, but this is much faster.

    return (
        <div>
            <label>{props.label}</label>
        </div>
    );
}

export default input;