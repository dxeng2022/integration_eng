package com.jake.engstore.controller.api;

import com.jake.engstore.domain.User;
import com.jake.engstore.dto.request.UserUpdateRequest;
import com.jake.engstore.dto.response.CommonResponse;
import com.jake.engstore.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class UserApiController {
    private final UserService userService;

    public UserApiController(UserService userService) {
        this.userService = userService;
    }
    
    // 모든 유저 검색
    @CrossOrigin
    @GetMapping("/api/users")
    public List<User> findUsers() {
        List<User> users = userService.findUsers();
        return users;
    }

    // 유저 1명 검색
    @CrossOrigin
    @GetMapping("/api/user/{id}")
    public User findUser(@PathVariable Long id) {
        User user = userService.findUser(id);
        return user;
    }

    // 유저 추가
    @CrossOrigin
    @PostMapping("/api/user")
    public ResponseEntity<?> insertUser(@RequestBody User user) {
        log.info("User: {}", user.toString());
        Integer result = userService.addUser(user);
        if (result > 0) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // 유저 수정
    @CrossOrigin
    @PutMapping("/api/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserUpdateRequest request) {
        Integer result = userService.updateUser(id, request);
        if (result > 0) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // 유저 삭제
    @CrossOrigin
    @DeleteMapping("/api/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        Integer result = userService.deleteUser(id);
        if (result > 0) {
            return "유저 삭제 완료";
        }
        return "유저 삭제 실패";
    }
}
