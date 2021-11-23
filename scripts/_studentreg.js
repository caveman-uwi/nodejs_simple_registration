// just good old jquery
// CURRENTLY THIS DOESN'T ALLOW FOR USERNAME CHANGE BUT YOU CAN MODIFY
// TO MAKE IT DO SO. SMALL CHANGES.



// ensure catch erros after your posts
$( document ).ready(function() {
	let updating = false,student=false;
	let _courseid;
//for check box value
let gender="";


let classes = '',courses='';
	$( "input[type=checkbox]" ).on( "click", function(event) {
		if(event.target.checked){
			classes = appendString(event.target.value, classes);
		}
		else if (!event.target.checked) {
			classes = removeString(event.target.value, classes);
		}
		console.log(classes);
	});




/*
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
*/

function removeString(str, storage) {
	let tmp = storage.split(',');
	if(tmp.length === 1) {
		if(tmp[0] === str){
			return '';
		}
		return storage;
	}
	else {
		let fin = '';
		tmp.forEach(function(item, index) {
			if(item !== str) {
				fin = appendString(item, fin); 
			}				
		});		
		return fin;
	}
}
function appendString(str, storage) {
	if (storage === ''){
		return str; 
	}
	return storage+',' + str;
}

$('#fname').change(function() {
	let data = {
			firstname: $('#fname').val(),
			student: true
		}
		$.post('/name', data)
		.done(function(data){
			console.log(data.length)
			if(data.length==0){
				console.log(data)

			}else{
				updating=true;
				student=true;
				_courseid=data[0].COURSEID;
				console.log(_courseid +" The courseID")
				
				$('#lname').val(data[0].LASTNAME);
			}
		});

})


$('.gender').change(function() {
	
if($('.gender').is(":checked")){
	gender = $("input:radio:checked").val();
	console.log($("input:radio:checked").val());
	console.log($(".form-check-input:checkbox:checked").val())
	console.log($('#dob').val())
	console.log(classes)
}
})
	$('#btn').click(function() {

		
		// submitting details to update or post new data
		if(updating){
			let data = {
			update: true,
			student: true,
			courseid: _courseid,
			firstname: $('#fname').val(),
			lastname: $('#lname').val(),
			dob: $('#dob').val(),
			gender: $("input:radio:checked").val(),
			tele: $('#cell').val(),
			address: $('#addr').val(),
			courses: classes
			
		}; 
		console.log(data);
		$.post('/update', data)
		.done(function(data){
			// refresh if successfull
			window.location.href = '/profile';
		});
		}else{
			let data = { 
			firstname: $('#fname').val(),
			lastname: $('#lname').val(),
			dob: $('#dob').val(),
			gender: $("input:radio:checked").val(),
			tele: $('#cell').val(),
			address: $('#addr').val(),
			courses: classes
			
		}; 
		console.log(data);
		$.post('/studentReg', data)
		.done(function(data){
			// refresh if successfull
			window.location.href = '/profile';
		});
		}
		
		
		
		
	});

	$('#cbtn').click(function() {

			data = {
				// searching for user based on 
				cancel: true
			}
			$.post('/cancel',data).done(function(data){
			// refresh if successfull
			window.location.href = '/studentReg';
		});		
		
	});
});