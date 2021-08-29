import React from 'react';
import pic5 from './images/close.png';

class NameItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitValue: "",
            type:"file",
            duplicate:0
            
        };
        this.spanClick = this.spanClick.bind(this);
        this.submit = this.submit.bind(this);
        this.change = this.change.bind(this);
    }

    spanClick() {
        this.props.closeModal();
    }

    submit(e) {
        let a=this.props.onClick(this.state.submitValue, this.state.type);
        if(a===0)
        {
            this.spanClick();
        }
        e.preventDefault();
    }

    change(e) {
        this.setState({submitValue: e.target.value})
    }

    typeHandler=(val)=>{
        this.setState({type:val})
    }

    render() {     
        let content= [];
        let left ={width:'4rem',padding:"3px 0",outline:'none',color:'white',border: "1px solid #ccc",
                    borderRadius:"5px 0 0 5px",borderRight:"none",backgroundColor:"#50b9fd"}
        let right={...left}
        delete right.borderRight;
        right={...right,color:"black",borderRadius:"0 5px 5px 0",backgroundColor:"white",borderLeft:"none",}
        if(this.state.type==="file")
        {   right.backgroundColor="white"
            right.color="black"
            left.backgroundColor="#50b9fd"
            left.color="white"
        } 
        else
        {
            right.backgroundColor="#50b9fd"
            right.color="white"
            left.backgroundColor="white"
            left.color="black"
        }
         
        if(this.props.rename)
        {
            let key=this.state.type
            const placeholderVal="Enter  Name";
            let col="1px solid";
            if(this.props.samename)
            { 
                col="1px solid red";
            }
            content.push( <input className="input1" style={{border:col}} key={key} placeholder={placeholderVal} 
                            value={this.state.submitValue} onChange={this.change}/>)
            if(this.props.samename)
            {
                content.push(<p className="text4">File / Folder name already exists</p>)
            }
            content.push(<button className="submitButton1" key={"createButton"}  onClick={this.submit}>Rename</button>)
     
            let modal=(
            <div  className="Modal" style={{float:'left'}}>
                <div key={"header"}>
                    <p> Rename </p>
                    <img className="close1" src={pic5} alt="" onClick={this.spanClick}/>
                </div>
                 {content}
            </div>)
            return modal;
        }
         
        let key=this.state.type
        content.push(<div  key={"typeHandler"} className="flex1">        
                        <button style={ left } onClick={()=>this.typeHandler("file")}>File</button>
                        <button style={ right} onClick={()=>this.typeHandler("Folder")}>Folder</button>
                    </div>)       
        const placeholderVal="Enter "+key.charAt(0).toUpperCase()+key.slice(1)+" Name";
        let col="1px solid";
        if(this.props.samename)
        {     
            col="1px solid red";
        }
        content.push( <input className="input1" style={{border:col}} key={key} placeholder={placeholderVal}
                            value={this.state.submitValue} onChange={this.change}/>)
        if(this.props.samename)
        {
            content.push(<p className="text5">File / Folder name already exists</p>)
        }
        content.push(<button className="submitButton1" key={"createButton"} onClick={this.submit}>Create</button>)

        let modal=(
        <div  className="Modal">
            <div key={"header"}>
                <img className="close1" src={pic5} alt="" onClick={this.spanClick}/>
                <div><p> Create New</p></div>    
            </div>
            {content}
        </div>)
    return modal
    }
}

export default NameItemModal;