import React from 'react';
import pic1 from './images/add_new_button.png';
import NameItemModal from "./NameItemModal"

class AddItemButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayModal: false,
        };
        this.onClick = this.onClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    onClick() {
        this.setState({displayModal: true});
    }

    closeModal() {
        this.setState({displayModal: false});
    }    

    render() {
        let type="file"
        return (
            <div className='menuButtonsCont'>
                <img className="img3" src={pic1} alt="" onClick={this.onClick}/>
                {this.state.displayModal ? <NameItemModal samename={this.props.samename} closeModal={this.closeModal}
                    onClick={this.props.onClick} submitName ={"Add " + type}/>: null}
            </div>
        );
    }
}

export default AddItemButton;