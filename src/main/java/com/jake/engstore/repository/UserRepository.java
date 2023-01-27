package com.jake.engstore.repository;

import com.jake.engstore.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByNameAndPhoneAndBirth(String name, String phone, String birth);
    Optional<User> findByUsernameAndNameAndPhoneAndBirth(String username, String name, String phone, String birth);
}
