<?php

echo<<<END

<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>

<form method="POST" class="ajax">
Wpisz tytul ksiazki <br>
<input type="text" name="newBookName"><br><br>
Wpisz autora ksiazki<br>
<input type="text" name="newBookAuthor"><br><br>
Wpisz opis ksiazki<br>
<input type="textarea" name="newBookDescription"><br><br>
<button type='submit'>button bez refresha strony, ale ogolnie rzecz biorac dziala i chyba tak mialo to dzialac nie?</button>
</form>

<script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>
<script src="app.js"></script>
</body>
END;
?>
