import React from "react";
import BuildControl from "./BuildControl/BuildControl"
import classes from "./BuildControls.css"

const controls = [
    { label: "Lettuce", type: "lettuce" },
    { label: "Bacon", type: "bacon" },
    { label: "Egg", type: "egg" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];

const buidControls = (props) => (
    <div className={classes.BuildControls}>
        <h3>Total Burger Price: ${props.price.toFixed(2)}</h3>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchase}
        >ORDER NOW</button>
    </div >
)



export default buidControls;