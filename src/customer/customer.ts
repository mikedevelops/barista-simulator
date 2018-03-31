export interface ICustomer {
    id: number;
    name: string;
}

export const createCustomer = (id: number, name: string): ICustomer => ({
    id,
    name
});
