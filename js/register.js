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
			equalTo: '.pass_field #password'
			},
			email: {
            required: true,
			email: true
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
				var gender = $("select[name='sex']").val();
				var login_type = $("input[name='login_type']").val();
				var default_phone = $(".miniform input[name='default_phone']").val();
				var birthday = $(".miniform input[name='birthday']").val();

				var data = {
					full_name : full_name,
					username : username,
					email : user_email,
					password : password,
					gender : gender,
					default_phone : default_phone,
					birthday : birthday,
					login_type : login_type
				}


				$.ajax({
				
				type : 'POST',
				url  : 'http://sandboxapi.haagendazsindonesia.co.id/v1/auth/register',
				data : data,
				beforeSend: function()
				{	
					$("input[type='button']").fadeOut();
					$(".loads").fadeIn();
					$(".regisform").fadeOut();
					document.addEventListener("backbutton", function (e) {
						e.preventDefault();
					}, false );
					//$("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
				},
				success :  function(response)
						   {
						   		var respon = jQuery.parseJSON(response);		
						   			
								if(respon.is_error===false){
									$("body").append('<div class="modal fade" id="success" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">'+
									  '<div class="modal-dialog" role="document">'+
										'<div class="modal-content">'+
										  '<div class="modal-header">'+
											'<img src="img/modal-success.png" width="60" />'+
											'<h3 class="modal-title" id="exampleModalLongTitle">Success</h3>'+
											
										  '</div>'+
										  '<div class="modal-body">'+
											'<p>You have been successfully registered...<br />Please check up your email to activation.!</p>'+
										  '</div>'+
										  '<div class="clearfix"></div>'+
										  '<div class="modal-footer">'+
											'<button type="button" class="col-xs-12 no-padding closebtn" data-dismiss="modal">Close</button>'+
											'<!--<button type="button" class="saveimg btn btn-primary">Save changes</button>-->'+
										  '</div>'+
										'</div>'+
									  '</div>'+
									'</div>');
									$("#success").modal("show");
									//$(".loads").html('You have been successfully registered...<br />Please check up your email to activation.');
									//location.reload();
									setTimeout(function () {
				
										location.reload();

									},7000)							
								}else{
									$("input[type='button']").fadeIn();
									$(".loads").fadeOut();
									if(respon.payload.validation_errors.full_name!=undefined){
										$(".loads").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+ respon.payload.validation_errors.full_name +'</div>');
									}else{
										$(".loads").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+ respon.payload.validation_errors.email +'</div>');
									}
									//$("input[type='button']").fadeOut();
									setTimeout(function () {

										$(".alert-danger").fadeOut();

									},4000)
									$(".regisform").fadeIn();
								}
							}
				});
				return false;
		}
	   /* form submit */
	   
	   
	 

});