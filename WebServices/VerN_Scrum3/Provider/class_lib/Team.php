<?php
class Team {
    private $id, $team, $name, $conference, $rings;

    public function __construct() {
		$this->sport = "";
        $this->id = 0;
        $this->team = "";
        $this->name = "";
        $this->conference = "";
        $this->rings = 0;
    }
	
	public function getSport() {
        return $this->sport;
    }
    public function setSport($value) {
        $this->sport = $value;
    }

    public function getID() {
        return $this->id;
    }
    public function setID($value) {
        $this->id = $value;
    }
	
    public function getName() {
        return $this->name;
    }
    public function setName($value) {
        $this->name = $value;
    }

    public function getTeam() {
        return $this->team;
    }
    public function setTeam($value) {
        $this->team = $value;
    }

    public function getConference() {
        return $this->conference;
    }
    public function setConference($value) {
        $this->conference = $value;
    }

    public function getRings() {
        return $this->rings;
    }
    public function setRings($value) {
        $this->rings = $value;
    }
	public function toString(){
		$rString = "ID: " . $this->getID() . " Name: " . $this->getName() . " Conference: " . $this->getConference() 
		. " Rings: " . $this->getRings();
		return $rString;
	}
}
?>