export type IDType = number | string;
export interface taskType {
    content: string;
    id: IDType;
}

export interface columnType {
    id: IDType;
    title: string;
    tasksIds: IDType[];
}