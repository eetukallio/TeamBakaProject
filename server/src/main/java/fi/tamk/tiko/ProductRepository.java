package fi.tamk.tiko;

import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
    Iterable<Product> findAll();
    void delete(Product entity);
    void delete(Long id);
    Product findOne(Long id);
}