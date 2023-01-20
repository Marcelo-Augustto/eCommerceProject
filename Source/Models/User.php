<?php
    namespace Source\Models;

    use Source\Core\Connect;

    Class User {
        private $id;
        private $name;
        private $email;
        private $password;

        public function __construct(
            ?int $id = NULL,
            ?string $name = NULL, 
            ?string $email = NULL, 
            ?string $password = NULL
        )
        {
            $this->$id = $id;
            $this->name = $name;
            $this->email = $email;
            $this->password = $password;
        }
        
        public function insert () {
            $bd = Connect::getInstance();
            $query = "INSERT INTO users VALUES (NULL, :name, :email,:password)";
            $stmt = $bd->prepare($query);
            $stmt->execute([
                "name" => $this->name,
                "email" => $this->email,
                "password" => $this->password
            ]);
            $this->id = $bd->lastInsertId();
        }

        public function findUser(string $email, string $password) {
            $query = "SELECT * FROM users WHERE email = ?";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ $email ]);

            if ($stmt->rowCount() != 0) {
                $user = $stmt->fetch();
                if (password_verify($password, $user->password)){
                    $this->id = $user->id;
                    $this->name = $user->name;
                    return $this;

                } else {
                    return false;
                }
            }
        }

        public function getUser(string $name) {
            $query = "SELECT * FROM users WHERE name = ?";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ $name ]);
            $user = $stmt->fetch();
            echo json_encode($user);
        }

        public function getByEmail(string $email) {
            $query = "SELECT * FROM users WHERE email = ?";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ $email ]);

            $user = $stmt->fetch();

            return $user;
        }

        public function validateRegistration (string $email) {
            $query = "SELECT * FROM users WHERE email = ?";
            $stmt = Connect::getInstance()->prepare($query);
            $stmt->execute([ $email ]);

            if($stmt->rowCount() == 0){
                return true;
            } else {
                return false;
            }
        }

        public function update(?string $email, ?string $newUsername, ?string $newPassword) {
            if ($newPassword == null) {
                $query = "UPDATE users SET name = :name WHERE email = :email";
                $stmt = Connect::getInstance()->prepare($query);
                $stmt->execute([ 
                    "name" => $newUsername,
                    "email" => $email
                 ]);

                 return true;
            } else if ($newUsername == null) {
                $hash = password_hash($newPassword, PASSWORD_DEFAULT);
                $query = "UPDATE users SET password = :password WHERE email = :email";
                $stmt = Connect::getInstance()->prepare($query);
                $stmt->execute([ 
                    "password" => $hash,
                    "email" => $email
                 ]);

                 return true;
            } else{
                $hash = password_hash($newPassword, PASSWORD_DEFAULT);
                $query = "UPDATE users SET name = :name , password = :password WHERE email = :email";
                $stmt = Connect::getInstance()->prepare($query);
                $stmt->execute([ 
                    "name" => $newUsername,
                    "password" => $hash,
                    "email" => $email
                 ]);

                 return true;
            }

            return false;
            
        }
        
    }       
    
