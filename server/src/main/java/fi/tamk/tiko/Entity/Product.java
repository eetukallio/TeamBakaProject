package fi.tamk.tiko.Entity;

import org.springframework.hateoas.ResourceSupport;

import javax.persistence.*;

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
public class Product extends ResourceSupport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long productId;
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


    /**
     * Default constructor
     */
    public Product() {}

    /**
     * Constructor for initializing attributes
     *
     * @param productId The productId of the product.
     * @param price The price of the product.
     * @param name The name of the product.
     * @param measurements The measurements of the product.
     * @param imgUrl The url of the product's image.
     * @param stock Stock of the product.
     */
    public Product(long productId, double price, String name, String measurements,
                   String imgUrl, int stock, String info, String tags) {
        this.productId = productId;
        this.price = price;
        this.name = name;
        this.measurements = measurements;
        this.imgUrl = imgUrl;
        this.stock = stock;
        this.info = info;
        this.tags = tags;
    }

    /**
     * Getter for the product's productId.
     *
     * @return Id of the product.
     */
    public long getProductId() {
        return this.productId;
    }

    /**
     * Setter for the product's productId.
     *
     * @param productId Id of the product.
     */
    public void setProductId(long productId) {
        this.productId = productId;
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
}
