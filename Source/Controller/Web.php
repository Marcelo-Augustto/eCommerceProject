<?php

namespace Source\Controller;

class Web {
    public function __construct($path) {
        $this->view = new \Source\Core\View('/themes');
    }

    public function home() {
        // include __DIR__ . "/../../themes/web/index.html";
        $this->view->render('web/index', []);
    }

    public function login() {
        $this->view->render('web/login', []);
    }

    public function about() {
        $this->view->render('web/about', []);
    }

    public function cart() {
        $this->view->render('app/shopping-cart', []);
    }

    public function profile()  {
        $this->view->render('app/profile', []);
    }

    public function product() {
        $this->view->render('web/product', []);
    }
}