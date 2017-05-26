package fi.tamk.tiko.Entity;

import javax.persistence.*;

/**
 * ShippingAddress Entity
 */
@Entity
@Table(name="shippingAddress")
public class ShippingAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name="streetAddress")
    private String streetAddress;
    @Column(name="city")
    private String city;
    @Column(name="zipCode")
    private int zipCode;
    @Column(name="country")
    private String country;
    @Column(name="firstName")
    private String firstName;
    @Column(name="lastName")
    private String lastName;
    @Column(name="user")
    private long user;

    /**
     * Default constructor
     */
    public ShippingAddress() {
    }

    /**
     * Getter for id
     * @return id
     */
    public long getId() {
        return id;
    }

    /**
     * Setter for id
     * @param id id
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Getter for streetAddress
     * @return streetAddress
     */
    public String getStreetAddress() {
        return streetAddress;
    }

    /**
     * Setter for address
     * @param streetAddress address
     */
    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    /**
     * Getter for city
     * @return city
     */
    public String getCity() {
        return city;
    }

    /**
     * Setter for city
     * @param city city
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * Getter for zipCode
     * @return zipCode
     */
    public int getZipCode() {
        return zipCode;
    }

    /**
     * Setter for zipCode
     * @param zipCode zipCode
     */
    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }

    /**
     * Getter for country
     * @return country
     */
    public String getCountry() {
        return country;
    }

    /**
     * Setter for country
     * @param country country
     */
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * Getter for firstName
     * @return firstName
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Setter for firstName
     * @param firstName firstName
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Getter for lastName
     * @return lastName
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Setter for lastName
     * @param lastName lastname
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Getter for user
     * @return user
     */
    public long getUser() {
        return user;
    }

    /**
     * Setter for user
     * @param user user
     */
    public void setUser(long user) {
        this.user = user;
    }


}
