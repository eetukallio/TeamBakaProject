package fi.tamk.tiko.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Class for checking that the user has proper authentication credentials and filters accordingly
 */
public class JWTLoginFilter extends OncePerRequestFilter {

    /**
     * Import of logger
     */
    private final Log logger = LogFactory.getLog(this.getClass());

    /**
     * User details service
     */
    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Import of JWT token utility class
     */
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    /**
     * Token header, fetched from application properties
     */
    @Value("${jwt.header}")
    private String tokenHeader;

    /**
     * Override of the filtering method, checks for credentials from possible token in the request
     *
     * @param request Http request
     * @param response Http response
     * @param chain Chain of actions
     * @throws ServletException Servlet Exception
     * @throws IOException Input Output Exception
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String authToken = request.getHeader(this.tokenHeader);
        // authToken.startsWith("Bearer ")
        // String authToken = header.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(authToken);

        logger.info("checking authentication for user " + username);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // It is not compelling necessary to load the use details from the database. You could also store the information
            // in the token and read it from it. It's up to you ;)
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // For simple validation it is completely sufficient to just check the token integrity. You don't have to call
            // the database compellingly. Again it's up to you ;)
            if (jwtTokenUtil.validateToken(authToken, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                logger.info("authenticated user " + username + ", setting security context");
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        chain.doFilter(request, response);
    }
}