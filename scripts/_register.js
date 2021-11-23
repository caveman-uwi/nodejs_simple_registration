// just good old jquery
// CURRENTLY THIS DOESN'T ALLOW FOR USERNAME CHANGE BUT YOU CAN MODIFY
// TO MAKE IT DO SO. SMALL CHANGES.

 

// ensure catch erros after your posts
$( document ).ready(function() {
	let updating = false,passwordmatch=false;
	let _userid, enter=false, edata=false;
$('#icon img').hover(function(){
	$('.tooltip').show();
})
$('#icon img').mouseleave(function(){
	$('.tooltip').hide();
})


	// checking if the username field gets updated. 
	// if it is updated, it tries to retrieve data from the database
	// updates the form accordingly
	$('#username').change(function() {
		updating = false; 
		
		data = {
				// searching for user based on username
				search: true, 
				username: $('#username').val()
			}
			console.log(data);
		$.post('/username', 
			data
		)	
		.done(function(data) {
			if(data.length === 1) {
				//enter=true;
				alert($('#username').val() + " \nAlready Exists please change");
			}
		});
	});
	
//email search

$('#email').change(function() {
		updating = false; 
		
		data = {
				// searching for user based on email
				esearch: true, 
				email: $('#email').val()
			}
			console.log(data);
		$.post('/email', 
			data
		)	
		.done(function(data) {
			if(data.length === 1) {
				//edata=true;
				alert($('#email').val() + " \nAlready Exists please change");
				console.log($('#email').val() + " \nAlready Exists please change");
			}
		});
	});



	$("#psswd2").change(function(){
		if( $("#psswd2").val() != null){
		if($('#password').val()!= $("#psswd2").val()){
			passwordmatch=false;
			console.log(passwordmatch)
			alert("Passwords Don't match");
		}else{
			passwordmatch=true;
			console.log(passwordmatch)
		}}else{
			alert("Passwords Don't match");
		}
	})

	

	$('#rbtn').click(function() {
		console.log(passwordmatch)

		if(passwordmatch){
		
		// submitting details to update or post new data
		let data = {
			insert:true,
			email: $('#email').val(),
			firstname: $('#firstname').val(),
			lastname: $('#lastname').val(),
			password: $('#password').val(),
			username: $('#username').val()
		}; 
		console.log(data);
		//register
		if(updating) {
			// if the user is updating then set the user id and add the update flag
			data.userid = _userid;
			data.update = true; 
		}
		
		$.post('/register', data)
		.done(function(data){
			// refresh if successfull
			window.location.href = '/';
		});
	
		//return false; 
	}else{
		alert("The passwords don't match!");
	}
});
		$('#cbtn').click(function() {

			data = {
				// searching for user based on email
				cancel: true
			}
			$.post('/cancel',data).done(function(data){
			// refresh if successfull
			window.location.href = '/register';
			//$.get('/register',data).done();
		});

			//window.location.href = '/';
		
		
		
		
	});
});