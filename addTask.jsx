import React, { Component } from 'react';


export class Addtask extends Component {

   state = {
        content: '',
    }

    openModal=()=>{
        this.setState({
          isOpen: true,
        })
      }
    
      closeModal =()=>{
        this.setState({
          isOpen: false,
        })
      }
     
      handleChange =(e)=>{
        this.setState({
          content: e.target.value,
        });
      }
    
      handleSubmit=(e)=>{
        e.preventDefault();
        this.setState({
          isOpen: false,
        })
        this.props.addTask(this.state);
        this.setState({content: ''})
    }

  render() {
    return (
      <div className='add-task'>
        <div id="modal-container" className={this.state.isOpen? 'show' : 'hidden'}>
        <div className="modal">
          <div className="modal-header">
            <h3 id='title'>Add a new task</h3>
            <h3 id ='close' onClick={()=>this.closeModal()}>X</h3>
          </div>

          <form className='modal-form' onSubmit={this.handleSubmit}>
            <input type="text" id='modal-input' onChange={this.handleChange} value={this.state.content}/>
            <button className='modal-btn'>CONFIRM</button>
          </form>
        </div>
       </div>

        <button className='add-task-btn' onClick={()=>this.openModal()}>ADD TASK</button>

      </div>
    )
  }
}

export default Addtask;
