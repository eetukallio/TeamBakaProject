package fi.tamk.tiko;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 *  The product entity class
 *
 *  @author Henri Kankaanpää
 *  @version 1.0
 *  @since 1.0
 */
@Entity
@Table(name="products")
public class Purchases {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @ManyToOne
    private User user;
    @ElementCollection
    @CollectionTable(name ="tracks" , joinColumns=@JoinColumn(name="playlist_id"))
    @Column(name="track")
    private List<Product> purchases = new ArrayList<>();


    /**
     * Default constructor
     */
    public Purchases() {}

    /**
     * Constructor for initializing attributes
     *
     * @param id The id of the product.
     * @param purchases A list of IDs the purchased products
     */
    public Purchases(long id, List<Product> purchases) {
        this.id = id;
        this.purchases = purchases;
    }

    /**
     * Getter for the product's id.
     *
     * @return Id of the product.
     */
    public long getId() {
        return this.id;
    }

    /**
     * Setter for the product's id.
     *
     * @param id Id of the product.
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Getter for the user who made the purchase.
     *
     * @return Id of the user.
     */
    public User getUser() {
        return user;
    }

    /**
     * Setter for the product's id.
     *
     * @param user Id of the user.
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * Getter for the purchased items list.
     *
     * @return List of the purchased products.
     */
    public List<Product> getPurchases() {
        return purchases;
    }

    /**
     * Setter for the purchased items list.
     *
     * @param purchases List of the purchased products.
     */
    public void setPurchases(List<Product> purchases) {
        this.purchases = purchases;
    }
}
