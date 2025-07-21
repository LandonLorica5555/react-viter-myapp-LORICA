<?php

class Test 
{
    public $connection;

    public $tblTest;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblTest = 'my_app_test';
    }

    public function readAll() 
    {
        // CHECK IF CODE HAS ERROR USING TRY CATCH BLOCK
        try {
            // IF NO ERROR CODE IN HERE, THEN PROCEED

            // CONCATENATION === MEANNG COMBINING SERIES OF TEXT. ADD DOTS AFTER 2ND LINE
            $sql = "select ";
            $sql .= "test_aid, ";
            $sql .= "test_is_active, ";
            $sql .= "test_name, ";
            $sql .= "test_created, ";
            $sql .= "test_updated ";
            $sql .= "from ";
            $sql .= "{$this->tblTest} ";
            $query = $this->connection->query($sql);
        }catch(PDOException $ex) {
            // IF THERE IS ERROR GO HERE AND RETURN QUERY TO FALSE
            return $query = false;
        }
        return $query;
    }
}