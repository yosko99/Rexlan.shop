package com.yosko.models.request.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserRequest {
    @NotNull
    private String email;
    @NotNull
    private String name;
    @NotNull
    private String password;
    @NotNull
    private String address;
    @NotNull
    private String phone;
    @NotNull
    private boolean isAdmin;
    @Null
    private String cartID;
}
