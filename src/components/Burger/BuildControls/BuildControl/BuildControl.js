import React from "react";
import classes from "./buildControl.css"

const buildControl = (props) => (
    <div>
        <div>{props.ingredientLabel}</div>
        <button>Add</button>
        <button>Remove</button>
    </div>
)

export default buildControl;