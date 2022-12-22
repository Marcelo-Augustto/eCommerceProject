<?php

namespace Source\Controller;

require "Source/Boot/config.php";
require "Source/Core/Connect.php";

class Api {

    public function login($data) {
        if ($data) {
            $user = new \Source\Models\User(); 
            $user->findUser($data["email"], $data["password"]);
        }
    }

    public function register($data) {
        $output = array();
    
        if ($data) {
            $user = new \Source\Models\User(
                NULL,
                $data["name"],
                $data["email"],
                password_hash($data["password"], PASSWORD_DEFAULT),
            );

            if ($user->validateRegistration($data["email"])) {
                $user->insert();
                $output["status"] = "success";
                echo json_encode($output);
            } else {
                $output["status"] = "Error";
                echo json_encode($output);
            }
        } else {
            $output["status"] = "error";
            echo json_encode($output);
        }
    }

    public function registerProduct($data) {
        $output = array();

        if ($data) {
            $product = new \Source\Models\Product(
                NULL,
                $data["product_name"],
                $data["price"],
                $data["img"],
            );
            $product->insert();
            $output["status"] = "Success";
            echo json_encode($output);
        } else {
            $output["status"] = "Error";
            echo json_encode($output);
        }
    }

    public function getAllProducts() {
        $products = new \Source\Models\Product();
        $products->getAllProducts();
    }

    public function addToCart($data) {
        $output = array();

        if (isset($data) && !empty($data)) {
            $product = new \Source\Models\Product(
                NULL,
                $data["product_name"],
                $data["price"],
                $data["img"],
            );
            $product->addToCart($data["cartUser"]);
            $output["status"] = "Success";
            echo json_encode($output);
        } else {
            $output["status"] = "Error";
            echo json_encode($output);
        }
    }

    public function getCart($data) {
        $products = new \Source\Models\Product();
        $products->getCart($data["user"]); 
    }

    public function changeCart($data) {
        $products = new \Source\Models\Product();

        if ($data["action"] == "add") {
            $products->cartPlus($data["user"], $data["productName"]);
            $output["status"] = "Success";
            echo json_encode($output);
        } elseif ($data["action"] == "remove") {
            $products->cartMinus($data["user"], $data["productName"]);
            $output["status"] = "Success";
            echo json_encode($output);
        } elseif ($data["action"] == "delete") {
            $products->cartDelete($data["user"], $data["productName"]);
            $output["status"] = "Success";
            echo json_encode($output);
        }
    }

}