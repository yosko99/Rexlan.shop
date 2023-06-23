package com.yosko.services.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yosko.dtos.dto.UserDTO;
import com.yosko.models.request.user.ChangeCurrentUserPasswordRequest;
import com.yosko.models.request.user.LoginRequest;
import com.yosko.models.request.user.ResetPasswordRequest;
import com.yosko.models.request.user.UpdateCurrentUserRequest;
import com.yosko.models.request.user.UserRequest;
import com.yosko.models.response.MsgResponse;
import com.yosko.models.response.user.LoginResponse;
import com.yosko.models.response.user.UserResponse;
import com.yosko.repositories.UserRepository;
import com.yosko.services.service.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public List<UserDTO> getUsers() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUsers'");
    }

    @Override
    public UserResponse createUser(UserRequest request, String sendtokenback, String currentLang) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createUser'");
    }

    @Override
    public MsgResponse deleteUser(long userID, String currentLang) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }

    @Override
    public MsgResponse updateUser(long userID, UserRequest request, String currentLang) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

    @Override
    public MsgResponse updateCurrentUser(UpdateCurrentUserRequest request, String token, String currentLang) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateCurrentUser'");
    }

    @Override
    public LoginResponse loginUser(LoginRequest request, String currentLang) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    }

    @Override
    public UserDTO getCurrentUser(String token) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCurrentUser'");
    }

    @Override
    public MsgResponse changeCurrentUserPassword(ChangeCurrentUserPasswordRequest request, String token,
            String currentLang) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'changeCurrentUserPassword'");
    }

    @Override
    public MsgResponse resetPassword(ResetPasswordRequest request, String currentLang) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'resetPassword'");
    }

    @Override
    public UserDTO getUser(long userID) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUser'");
    }

}
