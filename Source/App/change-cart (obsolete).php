<?php
    ini_set("display_errors",1);
    ini_set("display_startup_errors",1);
    error_reporting(E_ALL);

    require  "../autoload.php";
    require "../Boot/config.php";
    require "../Core/Connect.php";
    require  "../Models/Product.php";

    $products = new \Source\Models\Product();

    if ($_POST["action"] == "add") {
        $products->cartPlus($_POST["user"], $_POST["productName"]);
        $output["status"] = "Success";
        echo json_encode($output);
    } elseif ($_POST["action"] == "remove") {
        $products->cartMinus($_POST["user"], $_POST["productName"]);
        $output["status"] = "Success";
        echo json_encode($output);
    } elseif ($_POST["action"] == "delete") {
        $products->cartDelete($_POST["user"], $_POST["productName"]);
        $output["status"] = "Success";
        echo json_encode($output);
    }
    