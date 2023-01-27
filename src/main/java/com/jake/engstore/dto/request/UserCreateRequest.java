package com.jake.engstore.dto.request;

import lombok.Data;

@Data
public class UserCreateRequest {
    private String username;
    private String password;
    private String name;
    private String birth;
    private String gender;
    private String phone;
    private String organization;
    private String job;
}
