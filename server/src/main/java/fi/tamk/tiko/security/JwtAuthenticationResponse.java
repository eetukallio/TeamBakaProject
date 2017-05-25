package fi.tamk.tiko.security;


import fi.tamk.tiko.Entity.User;

import java.io.Serializable;

public class JwtAuthenticationResponse implements Serializable {

    private static final long serialVersionUID = 1250166508152483573L;

    private final String token;
    private final User user;
    private final long userId;

    public JwtAuthenticationResponse(String token, User user, long userId) {
        this.token = token;
        this.user = user;
        this.userId = userId;
    }

    public String getToken() {
        return this.token;
    }

    public User getUser() {
        return this.user;
    }

    public long getUserId() {
        return this.userId;
    }
}
