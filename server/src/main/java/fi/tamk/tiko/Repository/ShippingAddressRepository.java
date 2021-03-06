package fi.tamk.tiko.Repository;

import fi.tamk.tiko.Entity.ShippingAddress;
import org.springframework.data.repository.CrudRepository;

/**
 * Shipping address repository
 *
 * @author Eetu Kallio
 * @since 3.0
 * @version 3.0
 */
public interface ShippingAddressRepository extends CrudRepository<ShippingAddress, Long> {
}
