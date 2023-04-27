<!DOCTYPE html>
<html>
<head>
	<title>Create Team Entry Soccer</title>
</head>

<body>
<?php 
	include('../Provider/class_lib/Team.php');
	include('../Provider/class_lib/DB_Access.php');
	include('../Provider/class_lib/TeamDB.php');
	
	
	$TeamDB = new TeamDB();
	$team = new Team();
	$tableName = 'soccer';
	
	//$hello = filter_input(INPUT_POST, 'name');
	
	
	if(isset($_POST['name'])){
		$team->setName(filter_input(INPUT_POST, 'name'));
		$team->setTeam(filter_input(INPUT_POST, 'team'));
		$team->setConference(filter_input(INPUT_POST, 'conference'));
		$team->setSport('soccer');
		$team->setRings(filter_input(INPUT_POST, 'rings'));
		$team->setID(filter_input(INPUT_POST, 'id'));
		//echo($team->toString() . "<br/>");
	}
	

	$action = filter_input(INPUT_POST, 'selected');
	
	//echo "THis is the action: " . $action;
	
	if ($action == 'add'){
		//echo"printed";
		$TeamDB->addTeam($tableName, $team);
		//echo("Added");
	} else if ($action == 'update') {
		$TeamDB->updateTeam($tableName, $team);
		//echo("Updated");
	} else if ($action == 'delete') {
		$teamID = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);   
		$TeamDB->deleteTeam($tableName, $teamID);
		//echo("Deleted");
	}
?>
	<h3> Enter data to add a team to the database
	<form method="POST" action="">

		<label for="team">Team:</label>
		<input type="text" id="team" name="team" required><br>

		<label for="name">Name:</label>
		<input type="text" id="name" name="name" required><br>

		<label for="conference">Conference:</label>
		<input type="text" id="conference" name="conference" required><br>

		<label for="rings">Rings:</label>
		<input type="number" id="rings" name="rings" required><br>
		
		<input type= "hidden" value="add" name="selected">
		<input type="submit" value="Submit">

	</form>
	
	<h3> Enter data to update a team to the database
	<form method="POST" action="">
		
		<label for="id">ID:</label>
		<input type="text" id="id" name="id" required><br>
		
		<label for="team">Team:</label>
		<input type="text" id="team" name="team" required><br>

		<label for="name">Name:</label>
		<input type="text" id="name" name="name" required><br>

		<label for="conference">Conference:</label>
		<input type="text" id="conference" name="conference" required><br>

		<label for="rings">Rings:</label>
		<input type="number" id="rings" name="rings" required><br>

		<input type= "hidden" value="update" name="selected">
		<input type="submit" value="Submit">

	</form>
	
	<h3> Enter data to delete a team in the database
	<form method="POST" action="">
		
		<label for="id">ID:</label>
		<input type="text" id="id" name="id" required><br>

		<input type= "hidden" value="delete" name="selected">
		<input type="submit" value="Submit">

	</form>
</body>
</html>
