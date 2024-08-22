import React from "react";

class MyComponent extends React.Component {

    state = {
        name: 'Thanh',
        address: 'HN',
        age: 21
    }
    // JSX: viet js trong html
    render() {
        return(
            <div>
                My name is {this.state.name} 
            </div>
        );
    }
}

export default MyComponent;