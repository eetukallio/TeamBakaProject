package fi.tamk.tiko.security;

import java.io.Serializable;

/**
 * Class for building requests for JWT handling.
 */
public class  JwtAuthenticationRequest implements Serializable {

    private static final long serialVersionUID = -8445943548965154778L;

    /**
     * Username received from request
     */
    private String username;

    /**
     * Password received from request
     */
    private String password;

    /**
     * Empty constructor
     */
    public JwtAuthenticationRequest() {
        super();
    }

    /**
     * Constructor for initializing the object
     *
     * @param username
     * @param password
     */
    public JwtAuthenticationRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    /**
     * Getter for username
     *
     * @return username
     */
    public String getUsername() {
        return this.username;
    }

    /**
     * Setter for username
     *
     * @param username username to be set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Getter for password
     *
     * @return password
     */
    public String getPassword() {
        return this.password;
    }

    /**
     * Setter for password
     *
     * @param password password to be set
     */
    public void setPassword(String password) {
        this.password = password;
    }
}