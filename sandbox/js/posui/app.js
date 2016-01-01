new Vue({
    el: '#app',
    data: {
        order: {
            items: [
            ],
            getTotal: function() {
                return _.sum(this.items, 'total');
            }
        },
        items: [
            { name: 'Item-1', baracode: _.uniqueId('bar'), price: 15},
            { name: 'Item-2', baracode: _.uniqueId('bar'), price: 5},
            { name: 'Item-3', baracode: _.uniqueId('bar'), price: 11},
            { name: 'Item-4', baracode: _.uniqueId('bar'), price: 10},
            { name: 'Item-5', baracode: _.uniqueId('bar'), price: 15},
            { name: 'Item-6', baracode: _.uniqueId('bar'), price: 5},
            { name: 'Item-7', baracode: _.uniqueId('bar'), price: 11},
            { name: 'Item-8', baracode: _.uniqueId('bar'), price: 10},
            { name: 'Item-9', baracode: _.uniqueId('bar'), price: 10},
            { name: 'Item-10', baracode: _.uniqueId('bar'), price: 10}
        ],
        search: ''
    },
    methods: {
        addOrderItem: function(event) {
            console.log(event);
            var item, item_name, item_price, item_qty = 1;

            item_name = event.target.getAttribute('data-name');
            item_price = event.target.getAttribute('data-price');
            item = _.find(this.order.items, {name: item_name});
            if (item) {
                item_qty = item.qty++;
            }
            else {
                item = {name: item_name, price: item_price, qty: item_qty, total: item_price};
                this.order.items.push(item);
            }
            item.total = item.price * item.qty;
        },
        removeItem: function(event, item) {
            this.order.items.$remove(item);
        }
    }
});
