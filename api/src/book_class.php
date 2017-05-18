<?php
require('connect.php');

class Book implements JsonSerializable { //po wpisaniu tego serialize powstal mi plik json.php co to jest?
    private $id;
    private $name;
    private $author;
    private $description;

    public function __construct(){
        $this ->id=-1;
        $this ->name='';
        $this ->author='';
        $this ->description='';
    }
    public function setName($name){
        $this->name = $name;
    }
    public function setAuthor($author){
        $this->author = $author;
    }
    public function setDescription($description){
        $this->description = $description;
    }


    public function getId(){
        return $this->id;
    }
    public function getName(){
        return $this->name;
    }
    public function getAuthor(){
        return $this->author;
    }
    public function getDescription(){
        return $this->description;
    }

    static public function loadFromDB($conn, $id){
        $sql="SELECT * FROM main WHERE id='$id'";
        $res=$conn->query($sql);
        if($res==true && $res->num_rows==1) {
            $row = $res->fetch_assoc();

            $book = new Book();
            $book->id = $row['id'];
            $book->name = $row['name'];
            $book->author = $row['author'];
            $book->description = $row['description'];
            return $book;
        }
        else{

        }

    }
     static public function create($conn, $name, $author, $description){

       $sql="INSERT INTO main (name, author, description) VALUES ('$name','$author','$description') ";
       $res=$conn->query($sql);

    }
    static public function update($conn,$id, $name, $author, $description){
         $sql="UPDATE main SET name='$name',author='$author',description='$description' WHERE id='$id'";// w zadaniu mam nie uzywac id jak to zrobic

         $res=$conn->query($sql);
    }
     static public function deleteFromDB($conn,$id){
        $sql="DELETE FROM main WHERE id='$id'";

        $res=$conn->query($sql);

    }
    public function jsonSerialize(){
         return [
             'id'=>$this->id,
             'name'=>$this->name,
             'author'=>$this->author,
             'description'=>$this->description
         ];

    }

}




















