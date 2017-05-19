package fi.tamk.tiko.Repository;

import fi.tamk.tiko.Entity.Product;
import org.springframework.data.repository.CrudRepository;

/**
 *  The product repository class
 *
 *  @author eetukallio
 *  @version 1.0
 *  @since 1.0
 */
public interface ProductRepository extends CrudRepository<Product, Long> {

    /**
     * Returns all the products.
     *
     * @return All products.
     */
    Iterable<Product> findAll();

    /**
     * Deletes a product from the database via object reference.
     *
     * @param entity A product in the database.
     */
    void delete(Product entity);

    /**
     * Deletes a product from the database via ID reference.
     *
     * @param id Id of the product.
     */
    void delete(Long id);

    /**
     * Returns a product via ID reference.
     *
     * @param id Id of the product.
     * @return Product with the specified Id.
     */
    Product findOne(Long id);
}