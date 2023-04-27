<?php
class TeamDB {
	
	//Function for calling every team from a specificed table
    public function getTeams($table) {
        $db = DB_Access::getDB();
        $query = 'SELECT * FROM ' . $table .'
                  ORDER BY id';
        $statement = $db->prepare($query);
        $statement->execute();
        
        $teams = array();
        foreach ($statement as $row) {
            $team = new Team();
			$team->setID($row['id']);
            $team->setTeam($row['team']);
			$team->setName($row['name']);
            $team->setConference($row['conference']);
            $team->setRings($row['rings']);
            $teams[] = $team;
        }
        return $teams;
    }
	
	//Function for calling a single team from a table
    public function getTeam($table, $id) {
        $db = DB_Access::getDB();
        $query = 'SELECT * FROM ' . $table;
		if ($id > 0) {
			$query .= ' WHERE id = :team_id';  
		}				  
        $statement = $db->prepare($query);
        $statement->bindValue(':team_id', $id);
        $statement->execute();    
        $row = $statement->fetch();
        $statement->closeCursor();    
        $team = new Team();
		$team->setID($row['id']);
		$team->setName($row['name']);
		$team->setTeam($row['team']);
		$team->setConference($row['conference']);
		$team->setRings($row['rings']);
        return $team;
    }
	
	//Function for adding a team to the database
	public function addTeam($table , $team) {
		$db = DB_Access::getDB();
		$query = 'INSERT INTO ' . $table . ' (team, name, conference, rings) 
				  VALUES (:team, :name, :conference, :rings)';
		//echo($team->toString() . "<br/>" . $team->getSport() . "</br>");
		$statement = $db->prepare($query);
		//$statement->bindValue(':table', $team->getSport());
		$statement->bindValue(':team', $team->getTeam());
		$statement->bindValue(':name', $team->getName());
		$statement->bindValue(':conference', $team->getConference());
		$statement->bindValue(':rings', $team->getRings());
		$statement->execute();
		$statement->closeCursor();
		//We can add some kind of confirmation here later if we need to
		//print_r($db->errorinfo());
	}
	
	//Function for adding a team to the database
	public function deleteTeam($table, $id) {
		$db = DB_Access::getDB();
		$query = 'DELETE FROM ' . $table . ' 
				  WHERE id = :team_id';
		$statement = $db->prepare($query);
		$statement->bindValue(':team_id', $id);
		$statement->execute();
		//We can add some kind of confirmation here later if we need to
	}
	public function updateTeam($table, $team) {
		$id = $team->getID();
		$db = DB_Access::getDB();
		$query = 'UPDATE ' . $table . '
				  SET team = :team, name = :name, conference = :conference, rings = :rings
				  WHERE id = :team_id';
		$statement = $db->prepare($query);
		$statement->bindValue(':team_id', $id);
		$statement->bindValue(':team', $team->getTeam());
		$statement->bindValue(':name', $team->getName());
		$statement->bindValue(':conference', $team->getConference());
		$statement->bindValue(':rings', $team->getRings());
		$statement->execute();
		//We can add some kind of confirmation here later if we need to
	}
}
?>