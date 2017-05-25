package fi.tamk.tiko.Entity;

import fi.tamk.tiko.settings.validators.UniqueUsername;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * User entity class
 *
 * @author Henri Kankaanpää
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name="locations")
public class User implements UserDetails {

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
    private Date lastPasswordResetDate;
    private String role;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Purchase> purchases;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<ShippingAddress> address;

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
    public User(long id, String username, String password, String email, String role, Date lastPasswordResetDate, List<ShippingAddress> shippingAddress) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.lastPasswordResetDate = lastPasswordResetDate;
        this.address = shippingAddress;
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
     * Returns whether account is expired
     *
     * @return true = expired
     */
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    /**
     * Returns whether account is locked
     *
     * @return true = locked
     */
    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    /**
     * Returns whether account credentials are expired
     *
     * @return true = expired
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    /**
     * Returns whether account is enabled
     *
     * @return true = enabled
     */
    @Override
    public boolean isEnabled() {
        return false;
    }

    /**
     * Returns account authorities
     *
     * @return authorities
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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

//    public Set<Role> getRoles() {
//        return roles;
//    }
//
//    public void setRoles(Set<Role> roles) {
//        this.roles = roles;
//    }

    public Date getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }

    public void setLastPasswordResetDate(Date lastPasswordResetDate) {
        this.lastPasswordResetDate = lastPasswordResetDate;
    }

    /**
     * Getter for role
     *
     * @return role
     */
    public String getRole() {
        return role;
    }

    /**
     * Setter for role
     *
     * @param role role
     */
    public void setRole(String role) {
        this.role = role;
    }


    /**
     * Getter for addresses
     *
     * @return addresses
     */
    public List<ShippingAddress> getAddress() {
        return address;
    }

    /**
     * Setter for address
     *
     * @param address address
     */
    public void setAddress(List<ShippingAddress> address) {
        this.address = address;
    }

    /**
     * Getter for purchases
     *
     * @return purchases
     */
    public List<Purchase> getPurchases() {
        return purchases;
    }

    /**
     * Setter for purchases
     *
     * @param purchases purchases
     */
    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }

}
