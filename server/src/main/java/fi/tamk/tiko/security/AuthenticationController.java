package fi.tamk.tiko.security;

import fi.tamk.tiko.Entity.User;
import fi.tamk.tiko.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Controller class for authentication
 *
 * @author Henri Kankaanpää
 * @version 1.0
 * @since 1.0
 */
@RestController
public class AuthenticationController {

    /**
     * Token header, fetched from application properties
     */
    @Value("${jwt.header}")
    private String tokenHeader;

    /**
     * Authentication manager, does exactly what the name implies
     */
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * Import of JWT token utility class
     */
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    /**
     * Import of user repository
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * Handles login requests
     *
     * @param authenticationRequest request sent to the server
     * @param device device
     * @return response according to successful authentication
     * @throws AuthenticationException errors upon failed authentication
     */
    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest, Device device) throws AuthenticationException {

        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Reload password post-security so we can generate token
        final User user = userRepository.findByUsername(authenticationRequest.getUsername());
        System.out.println(user);
        final String token = jwtTokenUtil.generateToken(user, device);


        // Return the token
        return ResponseEntity.ok(new JwtAuthenticationResponse(token, user, user.getId()));
    }

    /**
     * Utility method for refreshing tokens
     *
     * @param request request sent to the server
     * @return refreshed token
     */
    @RequestMapping(value = "${jwt.route.authentication.refresh}", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username);

        if (jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken, user, user.getId()));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
}