class ItemNode  {
    constructor(path, type, children) {
        this.name = path;
        this.type = type;
        this.children = children;
    }
}

class ItemTree {
    constructor() {
        let root = new ItemNode('root','Folder', []);
        this.allItems = {'rootFolder' : root};
    }

    loadTree(allItems) {
        this.allItems = allItems;
    }

    addItem(path, type) {
        let parent = path.substring(0, path.lastIndexOf('/'));
        let children = this.allItems[parent+'Folder'].children;
        if(children.indexOf(path+type) <= -1) 
        {
            children.push(path+type);
            let newItem = new ItemNode(path, type, []);
            this.allItems[path+type] = newItem;
            return this._getAllChildNodes(children);
        } 
        else 
        {
            return null;
        }
    }

    getDirectoryChildren(path) 
    {
        return this._getAllChildNodes(this.allItems[path+'Folder'].children);
    }

    deleteItem(path, type) {
        delete this.allItems[path+type];
        let parent = path.substring(0, path.lastIndexOf('/'));
        let children = this.allItems[parent+"Folder"].children;
        let childIndex = children.indexOf(path+type);
        children.splice(childIndex, 1);
        return this._getAllChildNodes(children);
    }

    renameItem(path, newPath, type) {
        let parent = path.substring(0, path.lastIndexOf('/'));
        let children = this.allItems[parent+'Folder'].children;

        if(children.indexOf(newPath+type) <= -1) {
            let childIndex = children.indexOf(path+type);
            children[childIndex]= newPath + type;

            let id = newPath + type;

            this.allItems[id] = this.allItems[path+type];
            this.allItems[id].name = newPath;
            delete this.allItems[path];

            return this._getAllChildNodes(children);
        } 
        else 
        {
            return null;
        }
    }

    _getAllChildNodes(ids) 
    {
        return ids.map(id => {return this.allItems[id]});
    }
}

export {ItemNode,ItemTree};