package fi.tamk.tiko;

import org.springframework.data.repository.CrudRepository;

/**
 *  The purchases repository class
 *
 *  @author Henri Kankaanpää
 *  @version 1.0
 *  @since 1.0
 */
public interface PurchasesRepository extends CrudRepository<Purchases, Long> {

    /**
     * Returns all the purchases.
     *
     * @return All purchases.
     */
    Iterable<Purchases> findAll();

    /**
     * Deletes a purchase from the database via object reference.
     *
     * @param entity A purchase in the database.
     */
    void delete(Purchases entity);

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
    Purchases findOne(Long id);
}