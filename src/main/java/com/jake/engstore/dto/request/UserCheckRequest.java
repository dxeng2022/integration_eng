package com.jake.engstore.dto.request;

import lombok.Data;

@Data
public class UserCheckRequest {
    private String username;
    private String authCode;
}
