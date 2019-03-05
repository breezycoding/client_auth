import React, { Component } from "react";
import { connect } from "react-redux";

export default (Child_component) => {
    class Composed_component extends Component{
        //Component just got rendered
        componentDidMount(){
            this.should_navigate_away();
        }

        //Component just got updated
        componentDidUpdate(){
            this.should_navigate_away();
        }

        //helper method
        should_navigate_away = () => {
            if(!this.props.auth){
                this.props.history.push("/");
            }
        }

        render(){
            return <Child_component {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return {auth:state.auth.authenticated}
    }

    return connect(mapStateToProps)(Composed_component);
}



/*
    to picture what this component does
    1.Imagine this code is in Component_box.js
    2.Were going to import this component to Component_box.js
        Import require_auth from "components/require_auth";
    3.Were going to export require_auth then pass Component_box.js as a parameter
        export default require_auth(Component_box);
    4.the gist is we are inserting parent component(require_auth()) to a child component(Component_box). in return Component_box will have all the functionalities of require_auth().

*/
