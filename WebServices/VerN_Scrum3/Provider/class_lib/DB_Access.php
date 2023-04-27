<?php
class DB_Access {
    //just uncomment the following line (4), then comment out the other line(5).
    private static $dsn = 'mysql:host=localhost;dbname=scrum3sportsdb';
    private static $username = 'root';
	private static $password = '';
    private static $db;

    function __construct() {}

    public static function getDB () {
        if (!isset(self::$db)) {
            try {
                self::$db = new PDO(self::$dsn,
                                     self::$username,
                                     self::$password);
            } catch (PDOException $e) {
                $error_message = $e->getMessage();
                include('../errors/database_error.php');
                exit();
            }
        }
        return self::$db;
    }
}
?>