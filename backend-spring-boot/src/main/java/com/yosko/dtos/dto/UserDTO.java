package com.yosko.dtos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private long id;
    private String email;
    private String name;
    private String address;
    private String phone;
    private String zipcode;
    private boolean isAdmin = false;
}
