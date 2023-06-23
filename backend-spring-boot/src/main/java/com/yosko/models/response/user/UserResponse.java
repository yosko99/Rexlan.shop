package com.yosko.models.response.user;

import com.yosko.dtos.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {
    private String msg;
    private UserDTO userDTO;

    public UserResponse(String msg) {
        this.msg = msg;
    }
}
