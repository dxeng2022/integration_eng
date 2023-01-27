package com.jake.engstore.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;
import java.util.Objects;

@Controller
public class IndexController {
    @GetMapping({"/", "/error"})
    public String index() {
        return "index.html";
    }

    @GetMapping("/user")
    public String userMyPage() { return "index.html"; }

    @GetMapping("/module")
    public String modulePage() {
        return "index.html";
    }
}
