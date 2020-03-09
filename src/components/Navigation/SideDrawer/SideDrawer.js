import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";
import classes from "./SideDrawer.css";

const sideDrawer = (props) => {
    let attachClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachClasses = [classes.SideDrawer, classes.Open];
    };

    return (
        <Aux>
            <Backdrop
                show={props.open}
                clicked={props.closed}
            />
            <div
                className={attachClasses.join(" ")}
                onClick={props.closed}>
                {/* By including the onClick method here, the side drawer will now automatically close regardless of clicking the screen or on a link */}
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems
                        isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;