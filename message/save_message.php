<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["message"])) {
    $message = $_POST["message"];
    
    $file = fopen("messages.txt", "a");
    fwrite($file, $message . PHP_EOL);
    fclose($file);

    echo "提交成功";
}
?>