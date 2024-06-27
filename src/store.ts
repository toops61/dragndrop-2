import { create } from 'zustand';
import { IDType, columnType, taskType } from './utils/interface';
import { nanoid } from 'nanoid';
//import { devtools } from 'zustand/middleware';

//tasks handle
type itemFuncType = (task: taskType) => void;

interface taskHandleType {
  tasks: taskType[];
  addTask: itemFuncType;
  removeTask: (taskID: IDType) => void;
}

export const useTasks = create<taskHandleType>(set => ({
  tasks: [],
  addTask: task => set(state =>({ tasks: [...state.tasks, task] })),
  removeTask: taskId => set(state => ({ tasks: state.tasks.filter((e) => e.id !== taskId) }))
}));

//columns handle
interface columnHandleType {
  columns: columnType[];
  updateColumnsTasks: (tasksIds:IDType[],columnID:IDType) => void;
}

export const useColumns = create<columnHandleType>(set => ({
  columns: [
    {
      id: nanoid(),
      title: 'To do',
      tasksIds: []
    },
    {
      id: nanoid(),
      title: 'Pending',
      tasksIds: []
    },
    {
      id: nanoid(),
      title: 'Done',
      tasksIds: []
    }
  ],
  updateColumnsTasks: (tasksIds,columnID) => {
    set(state => {
      const columnsArray = state.columns;
      const arrayId = state.columns.findIndex(column => column.id === columnID);
      if (arrayId !== -1) {
        columnsArray.splice(arrayId,1,{...columnsArray[arrayId],tasksIds});
        //set({ columns: columnsArray });
      }
      return { columns: columnsArray };
    })
  }
}));

interface modalType {
  modalObject: {
    show: boolean;
    message: string;
    valid: boolean; //alert
    type: string; //popup|modal
  };
  showModal: (message:string,valid?:string,type?:string) => void;
  initModal: () => void;
}

export const useModal = create<modalType>(set => ({
  modalObject: {
    show: false,
    message: '',
    valid: false,
    type: 'popup'
  },
  showModal: (message,valid='alert',type='popup') => set({
    modalObject: {
      show: true,
      message,
      valid: valid !== 'alert' ? true : false,
      type
    }
  }),
  initModal: () => set({modalObject:{show: false,message: '',valid: false,type:'popup'}})
}));