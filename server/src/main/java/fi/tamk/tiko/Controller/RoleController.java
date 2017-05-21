package fi.tamk.tiko.Controller;

/**
 * Created by Henkk on 17/05/2017.
 */

import fi.tamk.tiko.Entity.Role;
import fi.tamk.tiko.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Manage the data from database from Role table user
 */
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
public class RoleController{


    /**
     * The Spring Data repository for Account entities.
     */
    @Autowired
    private RoleRepository roleRepository;

    /**
     * Get by id
     * @param id
     * @return
     */
    public Role findById(Long id) {
        Role role = roleRepository.findOne(id);
        return role;
    }

    /**
     * File Role by code
     * @param code - the code of the role
     * @return Role object
     */
    public Role findByCode(String code) {
        return roleRepository.findByCode(code);
    }
}