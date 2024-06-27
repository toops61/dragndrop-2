import { Droppable } from "react-beautiful-dnd";
import { columnType } from "../utils/interface";
import Task from "./Task";

export default function Column({column}:{column:columnType;}) {
  return (
    <Droppable droppableId={column.id.toString()}>
        {(provided) => (
            <div 
                className={column.title + " container"}
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                <h2>{column.title}</h2>
                {column.tasksIds.map((taskID,ind) => <Task taskID={taskID} index={ind} key={taskID} />)}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
  )
}