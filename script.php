<?php
	
	if($_SERVER["REQUEST_METHOD"] == 'POST'){
		

		$json_data = file_get_contents('php://input');
		$data = json_decode($json_data , true);

		if($data && isset($data['text'])){

			



			// IF THE DATA IS PRESENT ADD TO THE FILE

			$file_pointer = fopen('test_file.txt' , 'w');

			fwrite($file_pointer , $data['text']);

			fclose($file_pointer);






			$response = ['message' => 'Added successfully'];

			header('Content-Type: application/json');
	        echo json_encode($response);
		}
		else{

			$response = ['message' => 'Error occured'];

			header('Content-Type : application/json');
			echo json_encode($response);
		}

	}
	else{
		$response = ['message' => 'Method not allowed'];

		header('Content-Type' , 'application/json');

		echo json_encode($response);
	}

?>