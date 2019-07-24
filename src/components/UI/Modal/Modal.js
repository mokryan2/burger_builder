import React, { Component } from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    };

    // This will make it so we can check to see if the order summary component will update if the show property should change 

    componentWillUpdate() {
        console.log("[Modal] WillUpdate")
    };

    render() {
        return (
            <Aux>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
};

export default Modal;