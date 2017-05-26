package fi.tamk.tiko.Repository;

import fi.tamk.tiko.Entity.Purchase;
import org.springframework.data.repository.CrudRepository;

/**
 *  The purchases repository class
 *
 *  @author Henri Kankaanpää
 *  @version 1.0
 *  @since 1.0
 */
public interface PurchasesRepository extends CrudRepository<Purchase, Long> {

    /**
     * Returns all the purchases.
     *
     * @return All purchases.
     */
    Iterable<Purchase> findAll();

    /**
     * Deletes a purchase from the database via object reference.
     *
     * @param entity A purchase in the database.
     */
    void delete(Purchase entity);

    /**
     * Deletes a purchase from the database via ID reference.
     *
     * @param id Id of the purchase.
     */
    void delete(Long id);

    /**
     * Returns a purchase via ID reference.
     *
     * @param id Id of the purchase.
     * @return Purchase with the specified Id.
     */
    Purchase findOne(Long id);

    /**
     * Returns all purchases via userID reference.
     *
     * @param user Id of the user.
     * @return Purchase with the specified User.
     */
    Iterable<Purchase> findAllByUser(Long user);
}