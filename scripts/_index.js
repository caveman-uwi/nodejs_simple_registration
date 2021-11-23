$( document ).ready(function() {

	$('.logtogbtn').click(function() {
		console.log("button clicked fam")
		// submitting details to update or post new data
		data = {
				// signup for user based on username
				signup: true
			}
		console.log(data);
		$.get('/register', data)
		.done(function(data){
			console.log("Yeah dawg!")
						window.location.href ='/register';
					});
	
		 
	
});
});