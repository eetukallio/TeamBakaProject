package fi.tamk.tiko.Entity;

import javax.persistence.*;
import java.util.List;

/**
 * Category Entity
 *
 * @author eetukallio
 * @version 3.0
 * @since 3.0
 */
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private List<Product> products;

    /**
     * Default constructor.
     */
    public Category() {
    }

    /**
     * Constructor that sets name and Products.
     *
     * @param name Name for the category
     * @param products Products in the category.
     */
    public Category(String name, List<Product> products) {
        this.name = name;
        this.products = products;
    }

    /**
     * Getter for id.
     *
     * @return id.
     */
    public long getId() {
        return id;
    }

    /**
     * Setter for id.
     *
     * @param id id
     */
    public void setId(long id) {
        this.id = id;
    }

    /**
     * Getter for name.
     *
     * @return name.
     */
    public String getName() {
        return name;
    }

    /**
     * Setter for id.
     *
     * @param name name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for products.
     *
     * @return products.
     */
    public List<Product> getProducts() {
        return products;
    }

    /**
     * Setter for id.
     *
     * @param products products
     */
    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
