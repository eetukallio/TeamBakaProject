package fi.tamk.tiko;

import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository<MyLocation, Long> {
    Iterable<MyLocation> findAll();
    void delete(MyLocation entity);
    void delete(Long id);
    MyLocation findOne(Long id);
}