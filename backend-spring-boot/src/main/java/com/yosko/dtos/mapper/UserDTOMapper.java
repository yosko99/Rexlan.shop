package com.yosko.dtos.mapper;

import com.yosko.dtos.dto.UserDTO;
import com.yosko.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getAddress(),
                user.getPhone(),
                user.getZipcode(),
                user.isAdmin());
    }
}
