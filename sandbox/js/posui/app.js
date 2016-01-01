Vue.component('checkout', {
    template: '#checkout-template',
    props: ['orders'],
    computed: {
        totalOrder: function () {
            return _.sum(this.orders, 'total');
        }
    },
    methods: {
        removeOrder: function(item) {
            this.orders.$remove(item);
        }
    }
});

new Vue({
    el: '#app',
    data: {
        orders: [],
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
        addOrder: function(item) {
            var order, quantity = 1;

            order = _.find(this.orders, {name: item.name});

            if (order) {
                quantity = order.qty++;
            } else {
                order = {name: item.name, price: item.price, qty: quantity, total: item.price};
                this.orders.push(order);
            }

            order.total = order.price * order.qty;
        }
    }
});
