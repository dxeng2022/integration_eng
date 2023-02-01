package com.jake.engstore.dto.request;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String id;
    private String prePassword;
    private String newPassword;
    private String phone;
    private String resign;
}
