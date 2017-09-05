// JavaScript Document

$('document').ready(function()
{ 
     /* validation */
	 $(".regisform").validate({
      rules:
	  {
			full_name: {
		    required: true,
			minlength: 3
			},
			username: {
		    required: true,
			minlength: 3
			},
			password: {
			required: true,
			minlength: 8,
			maxlength: 15
			},
			cpassword: {
			required: true,
			equalTo: '#password'
			},
			email: {
            required: true,
            }
	   },
       messages:
	   {
            full_name: "please enter full name",
            username: "please enter user name",
            password:{
                      required: "please provide a password",
                      minlength: "password at least have 8 characters"
                     },
            email: "please enter a valid email address",
			cpassword:{
						required: "please retype your password",
						equalTo: "password doesn't match !"
					  }
			//sex:"please choose your gender",
			//phone:"please enter your valid phone number",
			//birthday:"please enter your birthday date",
       }
	   //submitHandler: submitForm	
       });  
	   /* validation */
	   
	   $("input[type='button']").click(submitForm);
	   /* form submit */
	   function submitForm()
	   {		
				//var data = $(".regisform").serialize();
				var full_name = $("input[name='full_name']").val();
				var username = $("input[name='username']").val();
				var password = $(".pass_field input[name='password']").val();
				var user_email = $(".user_email").val();
				//var gender = $("select[name='sex']").val();
				var login_type = $("input[name='login_type']").val();
				//var default_phone = $(".miniform input[name='default_phone']").val();
				//var birthday = $(".miniform input[name='birthday']").val();

				var data = {
					full_name : full_name,
					username : username,
					email : user_email,
					password : password,
					//gender : gender,
					//default_phone : default_phone,
					//birthday : birthday,
					login_type : login_type
				}


				$.ajax({
				
				type : 'POST',
				url  : 'http://haagendazs.echoscript.net/api/auth/register',
				data : data,
				beforeSend: function()
				{	
					$(".loads").fadeIn();
					$(".regisform").fadeOut();
					//$("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
				},
				success :  function(response)
						   {
						   		var respon = jQuery.parseJSON(response);		
								if(respon.is_error===false){
									$(".loads").html('You have been successfully registered...');
									location.reload();
																
								}else{
										
									$(".loads").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+ respon.status_msg +' !</div>');
									setTimeout(function () {

										$(".alert-danger").hide();

									},4000)
									$(".regisform").fadeIn();
								}
							}
				});
				return false;
		}
	   /* form submit */
	   
	   
	 

});