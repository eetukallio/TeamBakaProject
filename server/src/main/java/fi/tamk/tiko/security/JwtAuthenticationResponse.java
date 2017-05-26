package fi.tamk.tiko.security;


import fi.tamk.tiko.Entity.User;

import java.io.Serializable;

/**
 * Utility class for building JWT responses
 */
public class JwtAuthenticationResponse implements Serializable {

    private static final long serialVersionUID = 1250166508152483573L;

    /**
     * Token to be sent in the response
     */
    private final String token;

    /**
     * User info sent in the response
     */
    private final User user;

    /**
     * User id sent in the response
     */
    private final long userId;

    /**
     * Initializer constructor
     *
     * @param token JWT
     * @param user user info
     * @param userId user id
     */
    public JwtAuthenticationResponse(String token, User user, long userId) {
        this.token = token;
        this.user = user;
        this.userId = userId;
    }

    /**
     * Getter for the token
     *
     * @return token
     */
    public String getToken() {
        return this.token;
    }

    /**
     * Getter for user info
     *
     * @return user info
     */
    public User getUser() {
        return this.user;
    }

    /**
     * Getter for user id
     *
     * @return user id
     */
    public long getUserId() {
        return this.userId;
    }
}
