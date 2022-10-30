<?php
    ini_set("display_errors",1);
    ini_set("display_startup_errors",1);
    error_reporting(E_ALL);

    require  "../autoload.php";
    require "../Boot/config.php";
    require "../Core/Connect.php";
    require  "../Models/Product.php";

    // $product = new \Source\Models\Product(
    //     NULL,
    //     "asd",
    //     "69",
    //     "aaa",
    // );
    // $product->insert();
    
    $output = array();

    if (isset($_POST) && !empty($_POST)) {
        $product = new \Source\Models\Product(
            NULL,
            $_POST["product_name"],
            $_POST["price"],
            $_POST["img"],
        );
        $product->insert();
        $output["status"] = "Success";
        echo json_encode($output);
    } else {
        $output["status"] = "Error";
        echo json_encode($output);
     }
    