import React from 'react';
import './App.css';
import Item from "./DisplayItem"
import AddItemButton from "./AddItemButton";
import ParentFolderButton from "./ParentFolderButton";
import  {ItemTree} from "./ItemTree"

let data;
// localStorage.clear()
if (localStorage.getItem('Data') === null) {
    data = new ItemTree();
} 
else {
    data = new ItemTree();
    let allItems = JSON.parse(localStorage.getItem("Data"));
    data.loadTree(allItems);
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            children: data.getDirectoryChildren('root').concat(),
            path: 'root',
            samename:false
        };
        this.addItem = this.addItem.bind(this);
        this.renderData = this.renderData.bind(this);
        this.itemClick = this.itemClick.bind(this);
        this.parentClick = this.parentClick.bind(this);
        this.itemDelete = this.itemDelete.bind(this);
        this.rename = this.rename.bind(this);
    }

    addItem(name, type) {
        let path = this.state.path + '/' + name;
        let children = data.addItem(path, type, []);
        if (children) {
            this.setState({
                children: children.concat(),
                samename:false
            });
            return 0;
        } 
        else {
            this.setState({samename:true})
            return 1;
        }
    }

    itemClick(path, type) {
        if(type === 'Folder') {
            let children = data.getDirectoryChildren(path).concat();

            this.setState({
                children: children,
                path: path,
            });
        }
    }

    parentClick() {
        if (this.state.path !== 'root') {
            let parentPath = this.state.path.slice();
            parentPath = parentPath.substring(0, parentPath.lastIndexOf('/'));

            let children = data.getDirectoryChildren(parentPath);

            this.setState({
                children: children.concat(),
                path: parentPath,
            });
        }
    }

    itemDelete(path, type) {
        let children = data.deleteItem(path, type);
        this.setState({children: children.concat()});
    }

    rename(path, newName, type) {
        let newPath = this.state.path + '/' + newName;
        let children = data.renameItem(path, newPath, type);
        if(children) {this.setState({children: children.concat(), samename:false});
        return 0;
        } else {
            this.setState({samename:true})
            return 1;
        }
    }
    sortf(a,b){
    if(a.type==="file" && b.type!=="file")
    {
        return 1;
    }
    else if(a.type==="Folder" && b.type!=="Folder")
    {
        return -1;
    }
    else 
    {
        return a.name.localeCompare(b.name);
    }
   
    }
    renderData() {
        localStorage.setItem('Data',JSON.stringify(data.allItems));
        let items = this.state.children.concat();
        items.sort(this.sortf);
        return (
        <div  className="flexcontainer1">
            {items.map((item) => <Item type={item.type} samename={this.state.samename} key={item.name + item.type} name={item.name} 
                onClick ={this.itemClick} onDeleteClick ={this.itemDelete} onRenameClick={this.rename}/>)}
        </div>
        );
    }

    render() {
        let rootpath=this.state.path.split("/");
        return (
            <div>
                <div className="main1">
                    <ParentFolderButton onClick={() => this.parentClick()}/>
                    <a className="text1">{rootpath.join(" / ")}</a>
                </div>
                
                <div style={{display:"flex"}}>
                    {this.renderData()}           
                    <AddItemButton  onClick={this.addItem} samename={this.state.samename}/>        
                </div>

            </div>
        );
    }
}

export default Main;