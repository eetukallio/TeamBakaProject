package fi.tamk.tiko.Entity;

import javax.persistence.*;

/**
 * Created by Eetu Kallio on 24.5.2017
 */

@Entity
@Table(name="reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long reviewId;
    @Column(name="body")
    private String body;
    @Column(name = "rating")
    private int rating;
    @Column(name = "user")
    private long user;
    @Column(name = "product")
    private long product;

    public Review() {
    }

    public long getReviewId() {
        return reviewId;
    }

    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public long getUser() {
        return user;
    }

    public void setUser(long user) {
        this.user = user;
    }

    public long getProduct() {
        return product;
    }

    public void setProduct(long product) {
        this.product = product;
    }
}
