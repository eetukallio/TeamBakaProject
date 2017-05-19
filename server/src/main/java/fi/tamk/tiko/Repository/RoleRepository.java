package fi.tamk.tiko.Repository;

import fi.tamk.tiko.Entity.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findById(Long id);

    Role findByCode(String code);
}
