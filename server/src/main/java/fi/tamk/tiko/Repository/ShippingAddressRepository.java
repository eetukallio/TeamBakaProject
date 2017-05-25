package fi.tamk.tiko.Repository;

import fi.tamk.tiko.Entity.ShippingAddress;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Eetu Kallio on 22.5.2017
 */
public interface ShippingAddressRepository extends CrudRepository<ShippingAddress, Long> {
}
