package com.jake.engstore.service;

import com.jake.engstore.config.auth.PrincipalDetails;
import com.jake.engstore.domain.User;
import com.jake.engstore.dto.request.UserCheckRequest;
import com.jake.engstore.dto.request.UserFindRequest;
import com.jake.engstore.dto.request.UserUpdateRequest;
import com.jake.engstore.dto.response.UserFindResponse;
import com.jake.engstore.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Random;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final BCryptPasswordEncoder encoder;

    // 모든 유저 찾기
    @Transactional(readOnly = true)
    public List<User> findUsers() {
        return userRepository.findAll();
    }

    // 유저 찾기
    @Transactional(readOnly = true)
    public User findUser(Long id) {
        return userRepository.findById(id).orElseGet(User::new);
    }

    // 유저 추가
    @Transactional
    public Integer addUser(User user) {
        try {
            String rawPassword = user.getPassword();
            String encPassword = encoder.encode(rawPassword);
            user.setPassword(encPassword);
            user.setRoleUser();
            user.setResignDefault();
            userRepository.save(user);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            log.warn("UserService.addUser(): " + e.getMessage());
        }
        return -1;
    }

    // 유저 수정
    @Transactional
    public Integer updateUser(Long id, UserUpdateRequest request) {
        try {
            User userEntity = userRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("유저 찾기 실패: 아이디를 찾을 수 없습니다. userId-" + id));
            if (request.getPrePassword() != null && encoder.matches(request.getPrePassword(), userEntity.getPassword())) {
                String rawPassword = request.getNewPassword();
                String encPassword = encoder.encode(rawPassword);
                userEntity.setPassword(encPassword);
                resetSignIn(userEntity.getUsername());
                return 1;
            }
            if (!Objects.equals(request.getPhone(), "")) {
                userEntity.setPhone(request.getPhone());
                resetSignIn(userEntity.getUsername());
                return 1;
            }
            if (!Objects.equals(request.getResign(), "")) {
                userEntity.setResign();
                resetSignIn(userEntity.getUsername());
                return 1;
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.warn("UserService.updateUser(): " + e.getMessage());
        }
        return -1;
    }

    // 유저 삭제
    @Transactional
    public Integer deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            log.warn("UserService.deleteUser(): " + e.getMessage());
        }
        return -1;
    }

    // 이메일로 유저찾기 (중복확인)
    @Transactional(readOnly = true)
    public User findUserByUsername(UserCheckRequest request) {
        return userRepository.findByUsername(request.getUsername()).orElseGet(User::new);
    }

    // 유저 이메일 찾기
    @Transactional(readOnly = true)
    public UserFindResponse findMail(UserFindRequest request) {
        String name = request.getName();
        String phone = request.getPhone();
        String birth = request.getBirth();
        User userEntity = userRepository.findByNameAndPhoneAndBirth(name, phone, birth).orElseGet(User::new);
        UserFindResponse userDto = new UserFindResponse();
        userDto.setUsername(userEntity.getUsername());
        return userDto;
    }

    // 유저 비밀번호 찾기
    @Transactional
    public Boolean findPw(UserFindRequest request) {
        String username = request.getUsername();
        String name = request.getName();
        String phone = request.getPhone();
        String birth = request.getBirth();
        User userEntity = userRepository.findByUsernameAndNameAndPhoneAndBirth(username, name, phone, birth).orElseGet(User::new);
        if (userEntity.getUsername() != null) {
            String rawPassword = createPwKey();
            boolean sentEmail = emailSenderService.sendEmailWithNewPassword(username, rawPassword);
            if (sentEmail) {
                log.info("초기화된 비밀번호: {}", rawPassword);
                String encPassword = encoder.encode(rawPassword);
                userEntity.setPassword(encPassword);
                return true;
            }
        }
        return false;
    }

    // 로그인 정보 초기화하기
    protected void resetSignIn(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        SecurityContextHolder.getContext().setAuthentication(createNewAuthentication(authentication, username));
    }

    // authentication 객체 생성
    @Transactional(readOnly = true)
    protected Authentication createNewAuthentication(Authentication currentAuth, String username) {
        User principal = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다.: " + username));
        UserDetails newPrincipal = new PrincipalDetails(principal);
        UsernamePasswordAuthenticationToken newAuth
                = new UsernamePasswordAuthenticationToken(newPrincipal, currentAuth.getCredentials(), newPrincipal.getAuthorities());
        newAuth.setDetails(currentAuth.getDetails());
        return newAuth;
    }

    // 신규 비밀번호 생성
    private String createPwKey() {
        StringBuilder key = new StringBuilder();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) {
            int index = rnd.nextInt(3);

            if (i < 6) {
                switch (index) {
                    case 0 -> key.append((char) ((rnd.nextInt(26)) + 97));
                    case 1 -> key.append((char) ((rnd.nextInt(26)) + 65));
                    case 2 -> key.append(rnd.nextInt(10));
                }
            } else  {
                int[] arr = {33, 64, 35, 36};
                key.append((char) arr[(rnd.nextInt(4))]);
            }
        }

        return key.toString();
    }
}
