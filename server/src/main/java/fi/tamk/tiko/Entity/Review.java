package fi.tamk.tiko.Entity;

import javax.persistence.*;

/**
 * Review entity
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

    /**
     * Default constructor
     */
    public Review() {
    }

    /**
     * Getter for id
     *
     * @return id
     */
    public long getReviewId() {
        return reviewId;
    }

    /**
     * Setter for id
     *
     * @param reviewId id
     */
    public void setReviewId(long reviewId) {
        this.reviewId = reviewId;
    }

    /**
     * Getter for body
     *
     * @return body
     */
    public String getBody() {
        return body;
    }

    /**
     * Setter for body
     *
     * @param body body of the review
     */
    public void setBody(String body) {
        this.body = body;
    }

    /**
     * Getter for rating
     *
     * @return rating
     */
    public int getRating() {
        return rating;
    }

    /**
     * Setter for rating
     *
     * @param rating rating
     */
    public void setRating(int rating) {
        this.rating = rating;
    }

    /**
     * Getter for user
     *
     * @return user
     */
    public long getUser() {
        return user;
    }

    /**
     * Setter for user
     *
     * @param user user
     */
    public void setUser(long user) {
        this.user = user;
    }

    /**
     * Getter for product
     *
     * @return product
     */
    public long getProduct() {
        return product;
    }

    /**
     * Setter for product
     *
     * @param product product
     */
    public void setProduct(long product) {
        this.product = product;
    }
}
