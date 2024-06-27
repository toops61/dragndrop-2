import { Draggable } from "react-beautiful-dnd";
import { useTasks } from "../store";
import { IDType } from "../utils/interface";

export default function Task({taskID,index}:{taskID:IDType,index:number}) {
    const { tasks } = useTasks();

    const task = tasks.find(e => e.id === taskID);
  return (
    <Draggable draggableId={taskID.toString()} index={index}>
        {(provided) => (
            <div 
                className="task"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                <p>{task?.content}</p>
            </div>
        )}
    </Draggable>
  )
}