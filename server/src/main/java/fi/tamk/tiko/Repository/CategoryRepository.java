package fi.tamk.tiko.Repository;

import fi.tamk.tiko.Entity.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Eetu Kallio on 20.5.2017
 */
public interface CategoryRepository extends CrudRepository<Category, Long> {


    public List<Category> findAll();

    public List<Category> findAllById(Long id);

    public void deleteById(Long id);
}
