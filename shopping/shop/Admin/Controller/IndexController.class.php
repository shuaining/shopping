<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends BaseController {
    public function index(){      
	   $this->display();	   
    }
     public function login(){
       $this->display('login/login');     
    }
}