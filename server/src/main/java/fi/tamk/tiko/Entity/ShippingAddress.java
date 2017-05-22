package fi.tamk.tiko.Entity;

import org.springframework.hateoas.ResourceSupport;

import javax.persistence.*;

/**
 * Created by Eetu Kallio on 22.5.2017
 */

@Entity
@Table(name="shippingAddress")
public class ShippingAddress extends ResourceSupport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long addressId;
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

    public ShippingAddress() {
    }

    public long getAddressId() {
        return addressId;
    }

    public void setAddressId(long addressId) {
        this.addressId = addressId;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
