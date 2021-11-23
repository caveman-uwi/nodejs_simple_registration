	$( document ).ready(function() {


		let user=false;
		data ={
		usercheck:true
		}
		$.post('/usercheck', data).done(function(data){
		
			if(!data){
				//formid in brackets with #
					$('#logchange').attr('action','/login');
					$('#logchange').prop('method','GET');
					$('.logchnbtn').html('Log in');
				//button id or class here in bracket, . for class # for id
				}else{
					$('#profile').attr('class', 'nav-item');
					$('#proflink').attr('class', 'nav-link');
					//$('#proflink').attr('href', '/profile');
					$('#proflink').html('Profile');
					$('#logchange').attr('action','/logout');
					$('#logchange').prop('method','GET');
					$('.logchnbtn').html('Logout');	
				}


		});


$('.prev').click(function(){

	data ={
		usercheck:true
		}
	$.post('/userreturn', data).done(function(data){
		console.log(data)
		if (data == "")
		{
			alert("Please Register for Courses before moving on!")
			console.log("statement :)")
		}
		else{
			console.log("else")
			val={username:data}
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
		}
	});
});

	
		
		});


