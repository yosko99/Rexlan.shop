package com.yosko.models.request.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginRequest {
    @NotNull
    private String email;
    @NotNull
    private String password;
    @Null
    private String cartID;
}
