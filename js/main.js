$(function() {

	var $orders = $('div.orders'),
		$name = $('#name'),
		$drink = $('#drink');

	var orderTemplate = $('template#order-template').html();

	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/victordiaz/orders',
		success: function(orders) {
			$.each(orders, function(i, order) {
				addOrder(order);
			});
		},
		error: function() {
			$orders
			.hide()
			.append('<p class="alert alert-danger">*Error loading orders.</p>')
			.fadeIn();
		}
	});

	$('#add-order').on('click', function(e) {
		e.preventDefault();

		if (!$name.val()) {
			$orders
				.hide()
				.append('<p class="alert alert-warning">*Please enter your name.</p>')
				.fadeIn('fast', disappear(5000));
		}
		else if (!$drink.val()) {
			$orders
				.hide()
				.append('<p class="alert alert-warning">*Please enter your drink.</p>')
				.fadeIn('fast', disappear(5000));		
		}
		else {
			var order = {
				name: $name.val(),
				drink:  $drink.val()
			};	

			$.ajax({
				type: 'POST',
				url: 'http://rest.learncode.academy/api/victordiaz/orders',
				data: order,
				success: function(newOrder) {
					addOrder(newOrder);

					$name.val('');	
					$drink.val('');
				},
				error: function() {
					$orders
					.hide()
					.append('<p class="alert alert-danger">*Error saving order.</p>')
					.fadeIn('fast', disappear(5000));
				}
			});					
		}
	});	

	$orders.delegate('.remove', 'click', function()	{
		
		var $parent = $(this).closest('div');	

		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/victordiaz/orders/' + $(this).data('id'),
			success: function() {
				$parent.fadeOut('fast', function() {
					$(this).remove();
				});	
			}
		});
	});

	function addOrder(order) {
		$orders
			.hide()
			.append(Mustache.render(orderTemplate, order))
			.fadeIn();	
	}

	function disappear(delay) {
		setTimeout(function() {
			$('p.alert').fadeOut('fast');
		}, delay);
	}
});

