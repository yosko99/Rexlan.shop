package com.yosko.models.request.user;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChangeCurrentUserPasswordRequest {
    @NotNull
    private String oldPassword;
    @NotNull
    private String newPassword;
}
