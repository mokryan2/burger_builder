import React from "react";
import BuildControl from "./BuildControl/BuildControl"
import classes from "./BuildControls.css"

const controls = [
    { label: "Lettuce", type: "lettuce" },
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Bacon", type: "bacon" },

];

const buidControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
            />
        ))}
    </div>
)



export default buidControls;