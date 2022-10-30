<?php
    ini_set("display_errors",1);
    ini_set("display_startup_errors",1);
    error_reporting(E_ALL);

    require  "../autoload.php";
    require "../Boot/config.php";
    require "../Core/Connect.php";
    require  "../Models/User.php";

    $output = array();
    
    if (isset($_POST) && !empty($_POST)) {
        $user = new \Source\Models\User(
            NULL,
            $_POST["name"],
            $_POST["email"],
            password_hash($_POST["password"], PASSWORD_DEFAULT),
        );

        if ($user->validateRegistration($_POST["email"])) {
            $user->insert();
            $output["status"] = "success";
            echo json_encode($output);
        } else {
            $output["status"] = "Error";
            echo json_encode($output);
        }
    }  else {
        $output["status"] = "error";
        echo json_encode($output);
    }
