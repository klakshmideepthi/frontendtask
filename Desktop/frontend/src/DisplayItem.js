import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import pic2 from './images/file.png';
import pic3 from './images/folder.png';
import NameItemModal from "./NameItemModal"

class DisplayItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renaming: false,
            name: this.props.name,
            type: this.props.type,
        };
        this.menuRename = this.menuRename.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.rename = this.rename.bind(this);
    }

    menuRename() {
        this.setState({renaming: true});
    }

    closeModal() {
        this.setState({renaming: false});
    }

    rename(newName) {
        this.props.onRenameClick(this.state.name, newName, this.state.type);
    }

    render() {
        let icon;
        if(this.props.type === 'Folder') 
        {
            icon=
            <div>
                <img className="img4" src={pic3} alt=""/>
                <a className="text2">  {this.props.name.slice(this.props.name.lastIndexOf('/')+1)}</a>
            </div>
        } 
        else 
        {
            icon= 
                <div> 
                    <div className="relative1">
                        <img className="img2"  src={pic2} alt=""/>  
                        <div  className="fa-stack-1x fa-stack-text file-text">
                        <span className="spanicon">
                           {this.props.name.slice(this.props.name.lastIndexOf('.'))}
                        </span></div> 
                    </div>
                    <a className="text2">{this.props.name.slice(this.props.name.lastIndexOf('/')+1)}</a>
                </div>
        }

        return (
            <div  className="block1">        
                <ContextMenuTrigger id={this.state.name + this.state.type}>
                    <div  onDoubleClick={() => this.props.onClick(this.state.name, this.state.type)}>                  
                        {icon}
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id={this.state.name + this.state.type}>
                    <MenuItem onClick={this.menuRename}>
                        Rename
                    </MenuItem>
                    <MenuItem onClick={() => this.props.onDeleteClick(this.state.name, this.state.type)} >
                        <a className="text3">Delete</a>
                    </MenuItem>
                </ContextMenu>

                {this.state.renaming ? <NameItemModal onClick= {this.rename} rename="true" 
                    closeModal = {this.closeModal} samename={this.props.samename} submitName = {"Rename " + this.props.type}/> : null}
            </div>
        );
    }
}

export default DisplayItem;