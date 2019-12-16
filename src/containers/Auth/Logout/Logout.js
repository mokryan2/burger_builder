import React, { Component } from "react";

class Logout extends Component {
    render() {
        return ();
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch();
    };
};

export default Logout;