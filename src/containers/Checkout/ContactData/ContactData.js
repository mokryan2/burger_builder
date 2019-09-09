import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css"

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            zipCode: ""
        },
        phoneNumber: ""
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Where we dropping this off?</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your E-mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your Address" />
                    <input className={classes.Input} type="text" name="zipCode" placeholder="Your Zip Code" />
                    <input className={classes.Input} type="text" name="phoneNumber" placeholder="Your Phone Number" />
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
};

export default ContactData;