package com.yosko.services.service;

import java.util.List;

import com.yosko.dtos.dto.UserDTO;
import com.yosko.models.request.user.ChangeCurrentUserPasswordRequest;
import com.yosko.models.request.user.LoginRequest;
import com.yosko.models.request.user.ResetPasswordRequest;
import com.yosko.models.request.user.UpdateCurrentUserRequest;
import com.yosko.models.request.user.UserRequest;
import com.yosko.models.response.MsgResponse;
import com.yosko.models.response.user.LoginResponse;
import com.yosko.models.response.user.UserResponse;

public interface UserService {
    List<UserDTO> getUsers();

    UserDTO getUser(long userID);

    UserResponse createUser(UserRequest request, String sendtokenback, String currentLang);

    MsgResponse deleteUser(long userID, String currentLang);

    MsgResponse updateUser(long userID, UserRequest request, String currentLang);

    MsgResponse updateCurrentUser(UpdateCurrentUserRequest request, String token, String currentLang);

    LoginResponse loginUser(LoginRequest request, String currentLang);

    UserDTO getCurrentUser(String token);

    MsgResponse changeCurrentUserPassword(ChangeCurrentUserPasswordRequest request, String token, String currentLang);

    MsgResponse resetPassword(ResetPasswordRequest request, String currentLang);
}
