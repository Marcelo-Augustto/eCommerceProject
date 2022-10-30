<?php
    ini_set("display_errors",1);
    ini_set("display_startup_errors",1);
    error_reporting(E_ALL);

    require  "../autoload.php";
    require "../Boot/config.php";
    require "../Core/Connect.php";
    require  "../Models/Product.php";

    $product = new \Source\Models\Product();
    $product->remove("name");