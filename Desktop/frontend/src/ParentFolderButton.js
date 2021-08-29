import React from "react";
import pic1 from "./images/arrow_up.png"

class ParentFolderButton extends React.Component {
    render() {
        return (
            <div className='menuButtonsCont'>
                  <img className="arrow1" src={pic1} alt=""  onClick={() => this.props.onClick()}/>
            </div>
        );

    }
}

export default ParentFolderButton;