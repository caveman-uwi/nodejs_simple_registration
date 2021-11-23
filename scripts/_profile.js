$( document ).ready(function() {

	$('.btn').click(function() {
		console.log("button clicked fam")
		// submitting details to update or post new data
		data = {
				// signup for user based on username
				signup: true
			}
		console.log(data);
		$.get('/logout', data)
		.done(function(data){
			console.log("Yeah dawg!")
						window.location.href ='/login';
					});
	
		 
	
});
});