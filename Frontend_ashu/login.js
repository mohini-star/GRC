$(document).ready(function () {

			$('#loginform').submit(function (e) {
				e.preventDefault();
				var email = document.getElementById("us1").value;
				var pass = document.getElementById("pass").value;
				$.ajax({
					type: "GET",
					dataType: "json",
					url: 'http://grievanceapi.herokuapp.com/api/profile/?format=json',

					success: function (data) {
						$.each(data, function (index, value) {
							var check = value.email;
							//alert(value.id+value.email+email);
							if (email == check) {
								window.localStorage.setItem('first_name', value.first_name);
								window.localStorage.setItem('last_name', value.last_name);
								window.localStorage.setItem('email', value.email);
								window.localStorage.setItem('dob', value.dob);
								window.localStorage.setItem('city', value.city);
								window.localStorage.setItem('state', value.state);
								window.localStorage.setItem('institute', value.institute);
								window.localStorage.setItem('department', value.department);
								window.localStorage.setItem('enrollment_no', value.enrollment_no);
								window.localStorage.setItem('contact_no', value.contact_no);
								window.localStorage.setItem('id', value.id);
								// window.localStorage.setItem('profile_url','http://grievanceapi.herokuapp.com/api/profile/'+value.id+'/');

							}

						});

					}
				});

				//alert("---------Hii---------"+Username);
				$.ajax({
					type: 'POST',
					url: 'http://grievanceapi.herokuapp.com/api/login/',
					contentType: 'application/json',

					//username as assigned in bakend string
					data: JSON.stringify({ username: email, password: pass }),
					success: function (response) {



						//assign session storage
						//console.log(email);
						//alert(response.token);
						window.localStorage.setItem("login", email);
						//alert(window.localStorage.getItem("id"));

						window.localStorage.setItem("token", response.token);
						window.location = "index.html";
						// console.log(token);

					},
					error: function (xhr) {
						console.log(xhr.responseText);
						var json = JSON.parse(xhr.responseText);
						document.getElementById("m").innerHTML = json.message;

					}
				});


			});
		});


