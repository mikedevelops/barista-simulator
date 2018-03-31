import { IRecipe } from '../receipes/recipes';
import { ICustomer } from '../customer/customer';

export interface IOrder {
    recipe: IRecipe;
    orderedAt: number;
    customer: ICustomer;
}

export const createOrder = (recipe: IRecipe, customer: ICustomer, time: number): IOrder => ({
    recipe,
    orderedAt: time,
    customer
});
