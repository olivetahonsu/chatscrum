import React, {useState}from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';


export default function Tasks({data, deleteTask}) {

   let [weeklyTasks, updateWeeklyTasks] = useState(data);
   const [dailyTasks, setDailyTasks] = useState([]);

   const handleOnDragEnd = result =>{
    const {source, destination, draggableId} = result;

        if(!destination) {
            return;
        }

        if(source.droppableId === destination.droppableId && 
            destination.index === source.index){
            return null;
        }

        if(source.droppableId === destination.droppableId){
            // if(source.droppableId === 'weeklies'){
             
                const tasks = Array.from(weeklyTasks);
                const [reorderedItem] = tasks.splice(source.index, 1);
                tasks.splice(destination.index, 0, reorderedItem);

                updateWeeklyTasks(tasks);
                console.log(tasks)
                
                return;
        
            // }
        }

        if(source.droppableId !== destination.droppableId && 
            source.droppableId === 'weeklies'){

        const tasks = Array.from(data);
        const [removecontent] = tasks.splice(source.index, 1);
       
        updateWeeklyTasks(tasks);
    
        const tempDailyTasks = Array.from(dailyTasks);
        tempDailyTasks.splice(destination.index, 0, removecontent);

        setDailyTasks(tempDailyTasks);
       
        }
        else
        {
            if((source.droppableId !== destination.droppableId) && source.droppableId === 'dailies'){
                const tempDailyTasks = Array.from(dailyTasks);
                const [removecontent] = tempDailyTasks.splice(source.index, 1);
                console.log(removecontent)
                const newDaily = tempDailyTasks;
        
                setDailyTasks(newDaily);
        
                const tasks = Array.from(weeklyTasks);
                tasks.splice(destination.index, 0, draggableId);
        
                updateWeeklyTasks(tasks);
        
                return;

            }
        }    
    }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>        
            <div className="container">
                <Droppable id="tasket" droppableId='weeklies'>
                    {(provided)=>(
                        <div  ref={provided.innerRef} {...provided.droppableProps} className="box">
                        <h3 className="box-title">Weekly Tasks</h3>
                        <div className="scroll">
                        {data.map(({id, name, time_created, scrumgoalhistory_set}, index)=> {
                            return(
                                <Draggable key={id} draggableId={id.toString()} index={index}> 
                                    {(provided)=>(
                                    <p onClick={()=>{deleteTask(id)}}ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}  className="tasket">
                                       {name}
                                       <div id='time'>{time_created.slice(0,10)} at {time_created.slice(12,16)}</div>
                                        <div className="blue">
                                            {scrumgoalhistory_set.map(({id, done_by})=>{
                                                return(
                                                    <p key ={id}>
                                                        {done_by}
                                                    </p>
                                                )
                                            })}
                                        </div>
                                    </p>                                     
                                    )}    
                                </Draggable> 
                            )
                        })}
                        </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable  droppableId="dailies">
                    {(provided)=>(
                    <div id='tasketer' ref={provided.innerRef} {...provided.droppableProps} className="box" >
                        <h3 className="box-title">Daily Target</h3>
                        {dailyTasks.map(({id, content}, index)=>{
                            return(
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided)=>(
                                        <p ref={provided.innerRef} {...provided.dragHandleProps} {...provided.dragHandleProps} className="tasket">
                                            {content}
                                        </p>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div> 
                    )}
                </Droppable>   

            </div>
    </DragDropContext>
  )
} 


