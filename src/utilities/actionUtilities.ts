export interface IAction {
    type: string;
    payload: any;
}

export const createAction = (type, payload) => ({
    type, payload
});
