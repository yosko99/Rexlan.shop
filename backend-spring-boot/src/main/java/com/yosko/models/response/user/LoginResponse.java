package com.yosko.models.response.user;

public record LoginResponse(
                String msg,
                String token,
                String cartID) {
}
