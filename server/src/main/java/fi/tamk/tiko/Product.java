package fi.tamk.tiko;

import javax.persistence.*;

//The Product Entity

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

    public Product() {}

    public Product(long id, double price, String name, String measurements, String imgUrl) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.measurements = measurements;
        this.imgUrl = imgUrl;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMeasurements() {
        return measurements;
    }

    public void setMeasurements(String measurements) {
        this.measurements = measurements;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
