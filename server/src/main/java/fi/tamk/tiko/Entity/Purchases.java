package fi.tamk.tiko.Entity;

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
@Table(name="purchases")
public class Purchases {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long purchaseId;
    @Column(name="user")
    private long user;
    @OneToMany(cascade = CascadeType.ALL)
    @CollectionTable(name ="purchasedProducts" , joinColumns=@JoinColumn(name="id"))
    @Column(name="products")
    private List<Product> purchases = new ArrayList<>();


    /**
     * Default constructor
     */
    public Purchases() {}

    /**
     * Constructor for initializing attributes
     *
     * @param purchaseId The purchaseId of the product.
     * @param purchases A list of IDs the purchased products
     */
    public Purchases(long purchaseId, List<Product> purchases) {
        this.purchaseId = purchaseId;
        this.purchases = purchases;
    }

    /**
     * Getter for the product's purchaseId.
     *
     * @return Id of the product.
     */
    public long getPurchaseId() {
        return this.purchaseId;
    }

    /**
     * Setter for the product's purchaseId.
     *
     * @param purchaseId Id of the product.
     */
    public void setPurchaseId(long purchaseId) {
        this.purchaseId = purchaseId;
    }

    /**
     * Getter for the user who made the purchase.
     *
     * @return Id of the user.
     */
    public long getUser() {
        return user;
    }

    /**
     * Setter for the product's purchaseId.
     *
     * @param user Id of the user.
     */
    public void setUser(long user) {
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
