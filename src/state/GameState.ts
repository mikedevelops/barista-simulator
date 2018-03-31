import 'phaser-ce';
import { createOrder, IOrder } from '../orders/orders';
import { createAmericanoRecipe, createTapWaterRecipe } from '../receipes/recipes';
import { createCustomer } from '../customer/customer';
import { createPlayer, pickupItem, updatePlayerInventory } from '../player/player';
import { createReceptacle } from '../receptacles/receptables';
import { createMeasure } from '../ingedients/ingredients';

const order = createOrder(
    createTapWaterRecipe(),
    createCustomer(666, 'Test Customer'),
    666
);

// TODO: implement Immutable.js & Redux, factor out state changes to a reducer
// GameState will simply create actions

let player = createPlayer('Mike');

export default class GameState extends Phaser.State {
    private orders: IOrder[];

    public create () {
        const debug = window as any;

        this.orders = [];

        debug.create_order = () => {
            this.orders.push(order);
        };

        debug.get_glass = () => {
            player = updatePlayerInventory(
                player,
                pickupItem(player.inventory, createReceptacle('mug', createMeasure(500, 'ml'))));
        };

        // turn_water_on(player, item, time, temperature)
            // tap
                // flow rate

        // turn_water_off(player, item, time, temperature)

        // complete order
            // validate order
    }
}
