<?php

$f = fopen('data.txt', 'w');//open file and set flag that says we are able to write to it
fwrite( $f, $_POST['content']);
fclose($f);//close it when you are done

echo 'Comment has been saved';