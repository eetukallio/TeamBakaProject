package fi.tamk.tiko.Repository;

import fi.tamk.tiko.Entity.Review;
import org.springframework.data.repository.CrudRepository;

/**
 * Review repository
 *
 * @author Eetu Kallio
 * @since 3.0
 * @version 3.0
 */
public interface ReviewRepository extends CrudRepository<Review, Long> {


}
