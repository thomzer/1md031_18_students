/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
  el: '#dots',
  data: {
    orders: {},
	  key: 'T',
	 current_order: {}
  },
	 created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },
    addOrder: function (order) {
		order.orderId = this.getNext()
		console.log(order)
            socket.emit("addOrder", { orderId: order.orderId,
                                details: order.details,
                                orderItems: order.orderItems,
								orderPers: order.orderPers
                              });	
    },
	displayOrder: function(event){
	var offset = {x: event.currentTarget.getBoundingClientRect().left, y: event.currentTarget.getBoundingClientRect().top};
	  var order =            { orderId: '',
                                details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y },
                                orderItems: [],
							  	orderPers: []
                                }
	  	
	this.current_order = [order]
	//console.log(this.orders)		
	}
	}
});
