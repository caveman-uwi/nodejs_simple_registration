// just good old jquery
// CURRENTLY THIS DOESN'T ALLOW FOR USERNAME CHANGE BUT YOU CAN MODIFY
// TO MAKE IT DO SO. SMALL CHANGES.



$( document ).ready(function() {

	
		$('#btn').click(function() {
		// submitting details to update or post new data
		data = {
				// searching for user based on username
				login: true, 
				username: $('#username').val(),
				password: $('#password').val()
			}
		console.log(data);
		$.post('/login', data).done(function(data){
			if(data ){

							val={
								search: true,
								username: $('#username').val()
							} 
							console.log(val);
							$.post('/susername',val).done(function(data){
								console.log(data)
								if(data.length==0){
									console.log("user not registered for course")
									window.location.href = '/studentReg';
								}else{
									console.log("user registered for course")
									window.location.href = '/profile';
								}
							});
						
	
				console.log(data.length)
				console.log(data[0])

				}else{
						console.log("test for not success")
						alert("Invalid username or password");
				}
			
		});
		console.log("checking")
				
		 
	
});
});