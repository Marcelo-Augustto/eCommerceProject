<?php

namespace Source\Controller;

require "Source/Boot/config.php";
require "Source/Core/Connect.php";


session_start();

class Api {

    public function login($data) {
        if ($data) {
            $user = new \Source\Models\User(); 
            
            if ($user->findUser($data["email"], $data["password"])) {
                $user1 = $user->getByEmail($data["email"]);
                $_SESSION["user"] = $user1;
                $output = [ "logged" => "true" ];
            }
            else {
                $output = [ "error" => "Email and password does not match" ];
            }

            echo json_encode($output);
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
            $output["status"] = "Error";
            echo json_encode($output);
        }
    }

    public function verifySession() {
        if ($_SESSION["user"]) {
            echo json_encode($_SESSION["user"]);
        } else {
            echo json_encode($output["status"] = "error");
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
                floatval($data["price"]),
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
    
    public function getCartProductByUser($data) {
    	$product = new \Source\Models\Product();
    	$id = (int) $data["id"];
    	$resp = $product->getCartProductByUser($data["user"], $id);
    	echo json_encode($resp[0]);
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

    public function search($data) {
        $product = new \Source\Models\Product();
        $products = $product->search($data["name"]);

        echo json_encode($products);
    }
    
    public function getProductById($data) {
    	$product1 = new \Source\Models\Product();
    	$param = (int) $data["id"];
    	$product2 = $product1->getById($param);
    	echo json_encode($product2[0]);
    }
    
    public function getUserByEmail($data) {
    	$sample = new \Source\Models\User();
    	$user = $sample->getByEmail($data["email"]);
    	echo json_encode($user);
    }
	
    public function updateUser($data) {
        $sample = new \Source\Models\User();
        
        if ($sample->findUser($data["email"], $data["password"])) {
            if ($sample->update($data["email"], $data["newUsername"], $data["newPassword"])) {
                $output["status"] = "success";
            } else {
                $output["status"] = "error";
            }
        } else {
            $output["status"] = "error";
        }
        
        echo json_encode($output);
    }

    public function logout() {
        unset($_SESSION["user"]);
    }
}
