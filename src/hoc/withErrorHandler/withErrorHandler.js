import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        // This is made to be an anonymous class b/c the class itself is never actually used.
        // It's only returned at this point and prety much will just create a bunch of classes for us.

        state = {
            error: null
        };

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
            })
            axios.interceptors.response.use(null, err => {
                this.setState({
                    error: err
                })
            })
        };

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error.message}
                        (╯°□°)╯︵ ┻━┻
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;