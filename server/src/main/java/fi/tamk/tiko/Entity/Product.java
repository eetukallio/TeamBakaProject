package fi.tamk.tiko.Entity;

import javax.persistence.*;
import java.util.List;

/**
 *
 *  The product entity class
 *
 *  @author eetukallio
 *  @version 1.0
 *  @since 1.0
 */
@Entity
@Table(name="products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name="price")
    private double price;
    @Column(name="name")
    private String name;
    @Column(name="measurements")
    private String measurements;
    @Column(name="imgUrl")
    private String imgUrl;
    @Column(name="stock")
    private int stock;
    @Column(name = "info")
    private String info;
    @Column(name = "tags")
    private String tags;
    @Column(name = "category")
    private long category;
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    private List<Review> reviews;




    /**
     * Default constructor
     */
    public Product() {}

    /**
     * Constructor for initializing attributes
     *
     * @param price The price of the product.
     * @param name The name of the product.
     * @param measurements The measurements of the product.
     * @param imgUrl The url of the product's image.
     * @param stock Stock of the product.
     */
    public Product(double price, String name, String measurements,
                   String imgUrl, int stock, String info, String tags, long category) {
        this.price = price;
        this.name = name;
        this.measurements = measurements;
        this.imgUrl = imgUrl;
        this.stock = stock;
        this.info = info;
        this.tags = tags;
        this.category = category;
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
     * Getter for the product's price.
     *
     * @return Price of the product.
     */
    public double getPrice() {
        return price;
    }

    /**
     * Setter for the product's price.
     *
     * @param price Price of the product.
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * Getter for the name of the product.
     *
     * @return Name of the product.
     */
    public String getName() {
        return name;
    }

    /**
     * Setter for the name of the product.
     *
     * @param name Name of the product.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter of the measurements of the product.
     *
     * @return Measurements of the product.
     */
    public String getMeasurements() {
        return measurements;
    }

    /**
     * Setter for the measurements of the product.
     *
     * @param measurements Measurements of the product.
     */
    public void setMeasurements(String measurements) {
        this.measurements = measurements;
    }

    /**
     * Getter for url of the product image.
     *
     * @return url of the product image.
     */
    public String getImgUrl() {
        return imgUrl;
    }

    /**
     * Setter for the product image.
     *
     * @param imgUrl Url of the product image.
     */
    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    /**
     * Setter for the product stock.
     */
    public int getStock() {
        return stock;
    }

    /**
     * Setter for the product stock.
     *
     * @param stock Stock of the product.
     */
    public void setStock(int stock) {
        this.stock = stock;
    }

    /**
     * Getter for additional info on the product.
     *
     * @return Additional info on the product.
     */
    public String getInfo() {
        return info;
    }

    /**
     * Setter for additional info on the product.
     *
     * @param info Additional info on the product.
     */
    public void setInfo(String info) {
        this.info = info;
    }

    /**
     * Getter for tags on the product.
     *
     * @return Tags on the product.
     */
    public String getTags() {
        return tags;
    }

    /**
     * Setter for tags on the product.
     *
     * @param tags Tags on the product.
     */
    public void setTags(String tags) {
        this.tags = tags;
    }

    public long getCategory() {
        return category;
    }

    public void setCategory(long category) {
        this.category = category;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
}
