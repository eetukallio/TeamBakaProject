package fi.tamk.tiko;

import fi.tamk.tiko.settings.validators.UniqueUsername;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

/**
 * User entity class
 *
 * @author Henri Kankaanpää
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name="locations")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @NotNull
    @UniqueUsername(message="Username already exists")
    @Size(min = 4, max = 255, message = "Username has to be longer than 4 characters")
    @Column(unique = true)
    private String username;
    @NotNull
    @Size(min = 5, max = 255, message = "Password must be longer than 5 characters")
    private String password;
    @NotNull
    @Column(name="email")
    private String email;

    @Transient
    private String passwordConfirm;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "UserRole", joinColumns = @JoinColumn(name = "userId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "roleId", referencedColumnName = "id"))
    private Set<Role> roles;

    /**
     * Default constructor
     */
    public User() {}

    /**
     * Constructor for initializing attributes
     *
     * @param id ID
     * @param username The user's username
     * @param password The user's password
     * @param email The user's email
     */
    public User(long id, String username, String password, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    /**
     * Getter for the ID
     *
     * @return Returns the ID
     */
    public long getId() {
        return this.id;
    }

    /**
     * Getter for the email
     *
     * @return Returns the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Getter for the username
     *
     * @return Returns the username
     */
    public String getUsername() {
        return this.username;

    }

    /**
     * Getter for the password
     *
     * @return Returns the password
     */
    public String getPassword() {
        return this.password;
    }

    /**
     * Setter for the ID
     *
     * @param id The ID to be set
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Setter for the username
     *
     * @param username The username to be set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Setter for the password
     *
     * @param password The password to be set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Setter for the email
     *
     * @param email The email to be set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    @Transient
    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
