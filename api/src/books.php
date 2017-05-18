<?php
require('connect.php');
require('book_class.php');

if($_SERVER['REQUEST_METHOD']=='GET') {
    if (!isset($_GET['id'])) {
        $sql = "SELECT * FROM main";
        $res = $conn->query($sql);

        foreach($res as $row){
            $book=Book::loadFromDB($conn, $row['id']);
            $serializedBooks[]=$book;
        }

        $sera = json_encode($serializedBooks);
        print_r($sera);
    }
    else {
        $singleBookId = $_GET['id'];
        $singleBook = Book::loadFromDB($conn, $singleBookId);
        $serializedSingleBook = json_encode($singleBook);
        echo $serializedSingleBook;

        $title = $singleBook->getName();
        $serializedTitle = json_encode($title);
    }
}
if($_SERVER['REQUEST_METHOD']=='POST'){
    $toDecode= $_POST['ajaxToSend'];
    $decoded=json_decode($toDecode,true);

    $decoded['name'];
    $decoded['author'];
    $decoded['description'];
    Book::create($conn,$decoded['name'],$decoded['author'],$decoded['description']);
}
if($_SERVER['REQUEST_METHOD']=='DELETE'){
    $receivedAjax=parse_str(file_get_contents('php://input'),$put_vars);    //jak debugowac po stronie servera?
    $idToDelete=$put_vars['idToDelete'];
    Book::deleteFromDB($conn,$idToDelete);
}
























