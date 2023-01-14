<?php

    namespace Source\Models;
    use Source\Core\Connect;

    Class Product {
        private $id;
        private $name;
        private $price;
        private $imgUrl;

        public function __construct(
            ?int $id = NULL,
            ?string $name = NULL, 
            ?string $price = NULL, 
            ?string $imgUrl = NULL
        )
        {
            $this->id = $id;
            $this->name = $name;
            $this->price = $price;
            $this->imgUrl = $imgUrl;
        }
        
        public function insert () {
            $bd = Connect::getInstance();
            $query = "INSERT INTO products VALUES (NULL, :name, :price,:url)";
            $stmt = $bd->prepare($query);
            $stmt->execute([
                "name" => $this->name,
                "price" => $this->price,
                "url" => $this->imgUrl
            ]);
            $this->id = $bd->lastInsertId();
        }

        public function addToCart (string $cartUser) {
            $bd = Connect::getInstance();
            $query = "INSERT INTO shoppingCart VALUES (NULL, :name, :price, :url, 1, :cartUser)";
            $stmt = $bd->prepare($query);
            $stmt->execute([
                "name" => $this->name,
                "price" => $this->price,
                "url" => $this->imgUrl,
                "cartUser" => $cartUser
            ]);
            $this->id = $bd->lastInsertId();
        }

        public function getCart (string $user) {
            $query = "SELECT * FROM shoppingCart WHERE cartUser = :user";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ "user" => $user ]);
            $products = $stmt->fetchAll();
            echo json_encode($products);
        }
        
        public function getCartProductByUser (string $user, int $id) {
            $query = "SELECT * FROM shoppingCart WHERE cartUser = :user AND id = :id";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ "user" => $user, "id" => $id ]);
            $product = $stmt->fetchAll();
            return $product;
        }

        public function cartPlus (string $user, string $product) {
            $query = "UPDATE shoppingCart SET quantity = quantity + 1 WHERE cartUser = :user AND name = :product";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ "user" => $user, "product" => $product]);
        }

        public function cartMinus (string $user, string $product) {
            $query = "UPDATE shoppingCart SET quantity = quantity - 1 WHERE cartUser = :user AND name = :product";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ "user" => $user, "product" => $product]);
        }

        public function cartDelete (string $user, string $product) {
            $query = "DELETE FROM shoppingCart WHERE cartUser = :user AND name = :product";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ "user" => $user, "product" => $product]);
        }

        public function remove (string $name ) {
            $query = "DELETE FROM products WHERE name = ?";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ $name ]);
        }

        public function getAllProducts () {
            $query = "SELECT * FROM products";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute();
            $products = $stmt->fetchAll();
            echo json_encode($products);
        }
        
        public function getById(int $id) {
            $query = "SELECT * FROM products WHERE id = ?";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ $id ]);

            if($stmt->rowCount() != 0){
                $products = $stmt->fetchAll();
                return $products;
            } else {
                return false;
            }
        }

        public function search(string $name) {
            $query = "SELECT * FROM products WHERE name LIKE ?";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ $name ]);

            if($stmt->rowCount() != 0){
                $products = $stmt->fetchAll();
                return $products;
            } else {
                return false;
            }
        }
    }
    
