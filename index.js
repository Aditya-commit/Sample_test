let success_id = null;
let alert_id = null;
let warning_id = null;




window.onload = () => {
	document.getElementById('loginForm').addEventListener('submit' , e => {

		e.preventDefault();




		// RESET ALL THE setTimeout() FUNCTIONS
		clearTimeout(success_id);
		clearTimeout(alert_id);
		clearTimeout(warning_id);






		// REMOVE THE PREVIOUS ALERT
		document.querySelector('.notify')?.remove();









		const inputEl = document.getElementsByName('input_text')[0];

		const el = document.querySelector('.parent-container'); // PARENT DIV


		const inputValue = inputEl.value;




		// CHECK WHETHER THE VALUE IS NOT JUST WHITE SPACES

		const empty_regex = /^\s*$/;

		

		if(!empty_regex.test(inputValue)){
			
			// SEND THE DATA TO PHP
			fetch('script.php' , {
				method : 'post',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({'text' : inputValue})
			})
			.then(res => res.json()).then(data => {

				const { message } = data;

				if(message === 'Added successfully'){

					// HANDLE SUCCESS

					if(el !== undefined && el !== null){

						// INSERT A SUCCESS NOTIFIER

						const success_notifier = document.createElement('span'); // CREATE A SPAN ELEMENT

						success_notifier.classList.add('alert' , 'alert-success' , 'rounded-1' , 'p-3' , 'mt-3' , 'notify');
						success_notifier.innerText = 'Text Added Successfully';

						el.appendChild(success_notifier);




						// RESET THE INPUT CONTAINER

						inputEl.value = '';





						// AFTER 2 SECONDS REMOVE THE SUCCESS ALERT

						success_id = setTimeout(() => {

							success_notifier.remove();

						} , 2000);
					}
				}
				else{
					// HANDLE ERROR

					const alert_notifier = document.createElement('span'); // CREATE A SPAN ELEMENT

					alert_notifier.classList.add('alert' , 'alert-danger' , 'rounded-1' , 'p-3' , 'mt-3' , 'notify');
					alert_notifier.innerText = 'Error occured';

					el.appendChild(alert_notifier);

					alert_id = setTimeout(() => {

						alert_notifier.remove();

					} , 2000);
				}
			})
			.catch(error => {

				const alert_notifier = document.createElement('span'); // CREATE A SPAN ELEMENT

				alert_notifier.classList.add('alert' , 'alert-danger' , 'rounded-1' , 'p-3' , 'mt-3' , 'notify');
				alert_notifier.innerText = 'Error occured';

				el.appendChild(alert_notifier);




				alert_id = setTimeout(() => {

					// REMOVE THE ERROR ALERT

					alert_notifier.remove();

				} , 2000);
			});
		}

		else{

			// IF THE USER IS TRYING TO SEND EMPTY TEXT

			const warning_notifier = document.createElement('span'); // CREATE A SPAN ELEMENT

			warning_notifier.classList.add('alert' , 'alert-warning' , 'rounded-1' , 'p-3' , 'mt-3' , 'notify');
			warning_notifier.innerText = 'Cannot add empty text';

			el.appendChild(warning_notifier);
		





			warning_id = setTimeout(() => {

				// REMOVE THE WARNING ALERT

				warning_notifier.remove();

			} , 2000);
		}

	})
}