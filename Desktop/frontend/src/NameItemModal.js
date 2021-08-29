import React from 'react';
import pic5 from './images/close.png';
let a=0;
class NameItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitValue: "",
            type:"file",
            duplicate:0
            
        };
        this.SpanClick = this.SpanClick.bind(this);
        this.Submit = this.Submit.bind(this);
        this.Change = this.Change.bind(this);
    }

    SpanClick() {
        a=0;
        this.props.closeModal();
    }

    Submit(e) {
      
       a =this.props.onClick(this.state.submitValue, this.state.type);
        if(a===0)
        {
            this.SpanClick();
        }
        e.preventDefault();
    }

    Change(e) {
        this.setState({submitValue: e.target.value})
    }

    typer=(val)=>{
        this.setState({type:val})
    }

    render() {     
        let type = this.state.type;
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
        //    / console.log(this.props.samename)
            if(a==1)
            { 
                col="1px solid red";
            }
            content.push( <input className="input1" style={{border:col}} key={key} placeholder={placeholderVal} 
                            value={this.state.submitValue} onChange={this.Change}/>)
            if(a==1)
            {
                content.push(<p className="text4">File / Folder name already exists</p>)
            }
            content.push(<button className="submitButton1" key={"createButton"}  onClick={this.Submit}>Rename</button>)
     
            let modal=(
            <div  className="Modal" style={{float:'left'}}>
                <div key={"header"}>
                    <p> Rename </p>
                    <img className="close1" src={pic5} alt="" onClick={this.SpanClick}/>
                </div>
                 {content}
            </div>)
            return modal;
        }
         
        let key=this.state.type
        content.push(<div  key={"typer"} className="flex1">        
                        <button style={ left } onClick={()=>this.typer("file")}>File</button>
                        <button style={ right} onClick={()=>this.typer("Folder")}>Folder</button>
                    </div>)       
        const placeholderVal="Enter "+key.charAt(0).toUpperCase()+key.slice(1)+" Name";
        let col="1px solid";
        if(a==1)
        {     
            col="1px solid red";
        }
        content.push( <input className="input1" style={{border:col}} key={key} placeholder={placeholderVal}
                            value={this.state.submitValue} onChange={this.Change}/>)
        if(a==1)
        {
            content.push(<p className="text5">File / Folder name already exists</p>)
        }
        content.push(<button className="submitButton1" key={"createButton"} onClick={this.Submit}>Create</button>)

        let modal=(
        <div  className="Modal">
            <div key={"header"}>
                <img className="close1" src={pic5} alt="" onClick={this.SpanClick}/>
                <div><p> Create New</p></div>    
            </div>
            {content}
        </div>)
    return modal
    }
}

export default NameItemModal;