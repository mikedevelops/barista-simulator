export function setup () {
    const ui = document.createElement('div');
    ui.id = 'ui';
    document.body.appendChild(ui);

    const playerDebug = document.createElement('div');
    playerDebug.id = 'player';
    document.body.appendChild(playerDebug);

    const tapDebug = document.createElement('div');
    tapDebug.id = 'tap';
    document.body.appendChild(tapDebug);

    const ordersDebug = document.createElement('div');
    ordersDebug.id = 'orders';
    document.body.appendChild(ordersDebug);

    const customersDebug = document.createElement('div');
    customersDebug.id = 'customers';
    document.body.appendChild(customersDebug);

    const scoreDebug = document.createElement('div');
    scoreDebug.id = 'score';
    document.body.appendChild(scoreDebug);
}

export function buildInterface (...actions) {
    const buttons = actions.map(action => {
        const button = document.createElement('button');

        button.innerHTML = action.label;
        button.addEventListener('click', action.func);
        return button;
    });

    buttons.forEach(button => document.getElementById('ui').appendChild(button));
}

export function updateDebugger (store) {
    document.getElementById('player').innerHTML =
        `<pre>Player: ${JSON.stringify(store.getState().player.toJSON(), null, 2)}</pre>`;
    document.getElementById('tap').innerHTML =
        `<pre>Tap: ${JSON.stringify(store.getState().tap.toJSON(), null, 2)}</pre>`;
    document.getElementById('orders').innerHTML =
        `<pre>Orders: ${JSON.stringify(store.getState().orders.toJSON(), null, 2)}</pre>`;
    document.getElementById('customers').innerHTML =
        `<pre>Customers: ${JSON.stringify(store.getState().customers.toJSON(), null, 2)}</pre>`;
    document.getElementById('score').innerHTML =
        `<pre>Score: ${JSON.stringify(store.getState().score.toJSON(), null, 2)}</pre>`;
}
