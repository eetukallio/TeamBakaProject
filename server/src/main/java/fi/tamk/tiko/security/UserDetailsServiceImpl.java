package fi.tamk.tiko.security;

import fi.tamk.tiko.Entity.User;
import fi.tamk.tiko.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

/**
 * Implementation of the user details service for providing custom user information in login
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    /**
     * Import of user repository
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Loads user details by username
     *
     * @param username username to search by
     * @return user details
     * @throws UsernameNotFoundException if no such username was found
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
//        for (Role role : user.getRoles()){
//            grantedAuthorities.add(new SimpleGrantedAuthority(role.getLabel()));
//        }
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getRole()));

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), grantedAuthorities);
    }
}