package com.yosko.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yosko.dtos.dto.UserDTO;
import com.yosko.models.request.user.ChangeCurrentUserPasswordRequest;
import com.yosko.models.request.user.LoginRequest;
import com.yosko.models.request.user.ResetPasswordRequest;
import com.yosko.models.request.user.UpdateCurrentUserRequest;
import com.yosko.models.request.user.UserRequest;
import com.yosko.models.response.MsgResponse;
import com.yosko.models.response.user.LoginResponse;
import com.yosko.models.response.user.UserResponse;
import com.yosko.services.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/")
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getUsers();
    }

    @PostMapping
    public UserResponse createUser(
            @RequestHeader(value = "sendtokenback", defaultValue = "false", required = false) String sendTokenBack,
            @RequestBody @Valid UserRequest request,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return userService.createUser(request, sendTokenBack, currentLang);
    }

    @DeleteMapping("/{id}")
    public MsgResponse deleteUser(@PathVariable long id,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return userService.deleteUser(id, currentLang);
    }

    @GetMapping("/user/{id}")
    public UserDTO getUser(@PathVariable long id) {
        return userService.getUser(id);
    }

    @PutMapping("/user/{id}")
    public MsgResponse updateUser(
            @PathVariable long id,
            @RequestBody @Valid UserRequest request,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return userService.updateUser(id, request, currentLang);
    }

    @PutMapping("/current")
    public MsgResponse updateUser(
            @RequestHeader(value = "authorization") String token,
            @RequestBody @Valid UpdateCurrentUserRequest request,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return userService.updateCurrentUser(request, token, currentLang);
    }

    @PostMapping("/login")
    public LoginResponse lognUser(@RequestBody @Valid LoginRequest request,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return userService.loginUser(request, currentLang);
    }

    @GetMapping("/current")
    public UserDTO updateUser(
            @RequestHeader(value = "authorization") String token) {
        return userService.getCurrentUser(token);
    }

    @PutMapping("/current/change-password")
    public MsgResponse changeCurrentUserPassword(
            @RequestHeader(value = "authorization") String token,
            @RequestBody @Valid ChangeCurrentUserPasswordRequest request,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return userService.changeCurrentUserPassword(request, token, currentLang);
    }

    @PostMapping("/password-reset")
    public MsgResponse resetPassword(
            @RequestBody @Valid ResetPasswordRequest request,
            @RequestParam(value = "lang", defaultValue = "en", required = false) String currentLang) {
        return userService.resetPassword(request, currentLang);
    }
}
