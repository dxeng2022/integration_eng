package com.jake.engstore.config.auth;

import com.jake.engstore.domain.User;
import com.jake.engstore.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PrincipalDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public PrincipalDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("로그인시도 - username: {}", username);
        User principal = userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다.: "+username));
        return new PrincipalDetails(principal);
    }
}
