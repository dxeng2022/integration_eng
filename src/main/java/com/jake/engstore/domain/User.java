package com.jake.engstore.domain;

import com.jake.engstore.constant.RoleType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@ToString
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false) private String username;

    @Setter @Column(nullable = false) private String password;
    @Setter @Column(nullable = false) private String phone;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String gender;
    @Column(nullable = false) private String birth;
    @Column private String organization;
    @Column private String job;

    @Column(nullable = false) private String role;
    @Column(nullable = false) private char resign;

    @CreationTimestamp
    private Timestamp createDate;

    public void setRoleUser() {
        this.role = RoleType.USER.getDescription();
    }
    public void setResign() { this.resign = 'Y'; }

    public void setResignDefault() {
        this.resign = 'N';
    }
}
