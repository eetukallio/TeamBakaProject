package fi.tamk.tiko.Repository;

import fi.tamk.tiko.Entity.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Category repository
 *
 * @author Eetu Kallio
 * @since 3.0
 * @version 3.0
 */
public interface CategoryRepository extends CrudRepository<Category, Long> {

}
