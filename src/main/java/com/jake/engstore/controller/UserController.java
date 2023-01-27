package com.jake.engstore.controller;

import com.jake.engstore.config.auth.PrincipalDetails;
import com.jake.engstore.domain.User;
import com.jake.engstore.dto.request.UserCheckRequest;
import com.jake.engstore.dto.request.UserFindRequest;
import com.jake.engstore.dto.response.UserFindResponse;
import com.jake.engstore.service.EmailSenderService;
import com.jake.engstore.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@Controller
public class UserController {
    private final UserService userService;
    private final EmailSenderService emailSenderService;
    private String code;

    // 로그인 정보 불러오기
    @CrossOrigin
    @ResponseBody
    @GetMapping("/user/my-info")
    public User userMyPage(@AuthenticationPrincipal PrincipalDetails principal) {
        User user = principal.getUser();
        return user;
    }

    // 이메일 중복확인
    @CrossOrigin
    @PostMapping("/check-dupl")
    public ResponseEntity<?> checkDuplicated(@RequestBody UserCheckRequest request) {
        User resUser = userService.findUserByUsername(request);
        if(resUser.getUsername() != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // 인증번호 메일 발송요청
    @CrossOrigin
    @PostMapping("/signup-auth")
    @ResponseBody
    public ResponseEntity<?> sendAuthMail(@RequestBody UserCheckRequest request) {
        code = emailSenderService.sendEmail(request);
        log.info("인증코드: {}", code);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 인증번호 확인
    @CrossOrigin
    @PostMapping("/signup-authcheck")
    @ResponseBody
    public ResponseEntity authCheck(@RequestBody UserCheckRequest request) {
        String userAuthCode = request.getAuthCode();
        log.info("인증코드: {}", code);
        log.info("유저입력코드: {}", userAuthCode);
        if (code.equals(userAuthCode)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    // 유저 이메일 찾기
    @CrossOrigin
    @PostMapping("/find-mail")
    @ResponseBody
    public ResponseEntity<?> findMail(@RequestBody UserFindRequest request) {
        UserFindResponse userDto = userService.findMail(request);
        if (userDto.getUsername() != null) {
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    // 유저 비밀번호 찾기
    @CrossOrigin
    @PostMapping("/find-pw")
    @ResponseBody
    public ResponseEntity<?> findPw(@RequestBody UserFindRequest request) {
        log.info("request: {}", request);
        Boolean resetPw = userService.findPw(request);
        System.out.println(resetPw);
        if (resetPw) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
