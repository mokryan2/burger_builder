import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

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
            <div>
                <h4>Where we dropping this off?</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your E-mail" />
                    <input type="text" name="street" placeholder="Your Address" />
                    <input type="text" name="zipCode" placeholder="Your Zip Code" />
                    <input type="text" name="phoneNumber" placeholder="Your Phone Number" />
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }
};

export default ContactData;