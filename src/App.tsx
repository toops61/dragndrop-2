import { FormEvent } from "react";
import { useColumns, useModal, useTasks } from "./store";
import { nanoid } from "nanoid";
import Column from "./components/Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Modal from "./components/Modal";
import Popup from "./components/Popup";

function App() {
  const { columns,updateColumnsTasks } = useColumns();
  const { tasks,addTask,removeTask } = useTasks();
  const { modalObject,showModal } = useModal();

  //add new task to todo column
  const createTask = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const newContent = target.newtodo.value;
    const newTask = {content:newContent,id:nanoid(8)};
    if (!tasks.some(e => e.content === newContent)) {
      addTask(newTask);
      const firstColumn = columns[0];
      firstColumn.tasksIds.push(newTask.id);
      updateColumnsTasks(firstColumn.tasksIds,firstColumn.id);
      showModal('Nouvelle tâche créée','');
    } else {
      showModal('Vous avez déjà une tâche identique');
    }
    target.newtodo.value = '';
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    //if outside delete task
    const sourceColumn = columns.find(column => column.id === source.droppableId);
    const newArray = sourceColumn?.tasksIds ? [...sourceColumn.tasksIds] : [];
    if (!destination) {
      removeTask(draggableId);
      sourceColumn && updateColumnsTasks(sourceColumn.tasksIds.filter(e => e !== draggableId),sourceColumn.id);
      showModal('Tâche effacée','','modal');
      return;
    }
    if (destination?.droppableId === source.droppableId) {      
      if (destination.index === source.index) {
        showModal('Vous n\'avez rien bougé...');
        return;
      } else {
        newArray.splice(source.index,1);
        newArray.splice(destination.index,0,draggableId);
        sourceColumn && updateColumnsTasks(newArray,sourceColumn.id);
      }
    } else {
      newArray.splice(source.index,1);
      sourceColumn && updateColumnsTasks(newArray,sourceColumn.id);
      const destColumn = columns.find(column => column.id === destination.droppableId);
      if (destColumn) {
        const destArray = destColumn.tasksIds ? [...destColumn.tasksIds] : [];
        destArray.splice(destination.index,0,draggableId);
        updateColumnsTasks(destArray,destColumn.id);
      }
    }
  };  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {modalObject.show && modalObject.type === 'modal' ? <Modal /> : <></>}
      {modalObject.show && modalObject.type === 'popup' ? <Popup /> : <></>}
      <main>
        <h1>DnD Project</h1>
        <form className="newtask-container" onSubmit={e => createTask(e)}>
          <label htmlFor="newtodo">New task</label>
          <input type="text" name="newtodo" id="newtodo" />
          <button className="submit-newtask" role="submit"></button>
        </form>
        <div className="tasks-columns">
          {columns.map(column => <Column key={column.id} column={column} />)}
        
        </div>
      </main>
    </DragDropContext>
  )
}

export default App;
