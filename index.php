<?php
    
// show php errors
ini_set("display_errors",1);
ini_set("display_startup_errors",1);
error_reporting(E_ALL);

// composer autoload
require __DIR__ . "/vendor/autoload.php";
// autoload from project
require __DIR__ . "/Source/autoload.php";

use CoffeeCode\Router\Router;
$router = new Router("http://localhost");


// controller routes
$router->namespace("Source\Controller");

$router->get("/", "Web:home");
$router->get("/home", "Web:home");
$router->get("/sign-in", "Web:login");
$router->get("/about", "Web:about");
$router->get("/shopping-cart", "Web:cart");
$router->get("/profile", "Web:profile");
$router->get("/product", "Web:product");

// api routes
$router->post("/login", "Api:login");
$router->post("/register", "Api:register");
$router->post("/register-product", "Api:registerProduct");
$router->post("/add-to-cart", "Api:addToCart");
$router->post("/get-cart", "Api:getCart");
$router->post("/change-cart", "Api:changeCart");
$router->post("/search", "Api:search");
$router->post("/update-user", "Api:updateUser");
$router->get("/get-all-products", "Api:getAllProducts");
$router->get("/verify-session", "Api:verifySession");
$router->get("/get-user-products/{email}", "Api:getUserProducts");
$router->get("/get-product-by-id/{id}", "Api:getProductById");
$router->get("/get-cart-product-by-user/{user}/{id}", "Api:getCartProductByUser");
$router->get("/get-user-by-email/{email}", "Api:getUserByEmail");
$router->delete("/delete-product/{product_name}", "Api:deleteProduct");
$router->delete("/logout", "Api:logout");

// error pages
$router->get("/error/404", "Error:e404");

$router->dispatch();

// Redirect all errors
if ($router->error()) {
    $router->redirect("/error/{$router->error()}");
}
