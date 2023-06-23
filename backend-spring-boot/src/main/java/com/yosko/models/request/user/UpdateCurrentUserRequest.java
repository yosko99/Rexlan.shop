package com.yosko.models.request.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateCurrentUserRequest {
    @NotNull
    private String name;
    @NotNull
    private String address;
    @NotNull
    private String phone;
    @NotNull
    private String zipcode;
}
