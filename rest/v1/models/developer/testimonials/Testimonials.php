<?php

class Testimonials
{
    public $testimonials_aid; //column
    public $testimonials_is_active; //column
    public $testimonials_image; //column
    public $testimonials_description; //column
    public $testimonials_name; //column
    public $testimonials_position; //column
    public $testimonials_created; //column
    public $testimonials_updated; //column

    public $connection; // variable for connection to database
    public $lastInsertedId; // when created is used to store last inserted aid

    public $tblTestimonials; //table

    // when this file is used, run this function
    public function __construct($db)
    {
        $this->connection = $db; // connection of database
        $this->tblTestimonials = "my_app_testimonials"; // table
    }

    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from ";
            $sql .= "{$this->tblTestimonials} ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // creating a data using this function
    public function create()
    {
        try {
            $sql = "insert into {$this->tblTestimonials} ( ";
            $sql .= "testimonials_is_active, ";
            $sql .= "testimonials_image, ";
            $sql .= "testimonials_description, ";
            $sql .= "testimonials_name, ";
            $sql .= "testimonials_position, ";
            $sql .= "testimonials_created, ";
            $sql .= "testimonials_updated ) values ( ";
            $sql .= ":testimonials_is_active, ";
            $sql .= ":testimonials_image, ";
            $sql .= ":testimonials_description, ";
            $sql .= ":testimonials_name, ";
            $sql .= ":testimonials_position, ";
            $sql .= ":testimonials_created, ";
            $sql .= ":testimonials_updated ) ";
            $query = $this->connection->prepare($sql); // to ready your query
            $query->execute([
                "testimonials_is_active" => $this->testimonials_is_active,
                "testimonials_image" => $this->testimonials_image,
                "testimonials_description" => $this->testimonials_description,
                "testimonials_name" => $this->testimonials_name,
                "testimonials_position" => $this->testimonials_position,
                "testimonials_created" => $this->testimonials_created,
                "testimonials_updated" => $this->testimonials_updated,
            ]); // to run this sql
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false; // this will error when you pass data
        }
        return $query;
    }

    // updating a data using this function
    public function update()
    {
        try {
            $sql = "update {$this->tblTestimonials} set ";
            $sql .= "testimonials_image = :testimonials_image, ";
            $sql .= "testimonials_description = :testimonials_description, ";
            $sql .= "testimonials_name = :testimonials_name, ";
            $sql .= "testimonials_position = :testimonials_position, ";
            $sql .= "testimonials_updated = :testimonials_updated ";
            $sql .= "where testimonials_aid = :testimonials_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "testimonials_image" => $this->testimonials_image,
                "testimonials_description" => $this->testimonials_description,
                "testimonials_name" => $this->testimonials_name,
                "testimonials_position" => $this->testimonials_position,
                "testimonials_updated" => $this->testimonials_updated,
                "testimonials_aid" => $this->testimonials_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete function
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblTestimonials} ";
            $sql .= "where testimonials_aid = :testimonials_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "testimonials_aid" => $this->testimonials_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
