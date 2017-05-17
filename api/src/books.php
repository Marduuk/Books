<?php
require('connect.php');
require('book_class.php');

if($_SERVER['REQUEST_METHOD']=='GET') {
    if (!isset($_GET['id'])) {

        $sql = "SELECT * FROM main";
        $res = $conn->query($sql);
        $count = $res->num_rows;


        $resArr = [];
        for ($i = 0; $i < $count; $i++) {
            $book[$i] = Book::loadFromDB($conn, $i);
            if ($book[$i] != null) {
                $serializedBooks[] = $book[$i];
            }
        }
        $sera = json_encode($serializedBooks);
        print_r($sera);
    } else {
        $singleBookId = $_GET['id'];
        $singleBook = Book::loadFromDB($conn, $singleBookId);
        $serializedSingleBook = json_encode($singleBook);
        echo $serializedSingleBook;


        $title = $singleBook->getName();
        $serializedTitle = json_encode($title);
        //  echo $serializedTitle;


    }

}
if($_SERVER['REQUEST_METHOD']=='POST'){
    echo "lol";
    print_r($_POST);
}





//Book::create($conn, $postName, $postAuthor, $postDescription);
//sukces?





























