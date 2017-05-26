package fi.tamk.tiko.security;

import fi.tamk.tiko.WebSecurityCorsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;

/**
 * Web security configuration class
 *
 * @author Henri Kankaanpää
 * @version 1.0
 * @since 1.0
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    /**
     * Import of the JWT authentication entry point class for throwing 401 responses
     */
    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    /**
     * User details service
     */
    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Configures what authentication manager should be used
     *
     * @param authenticationManagerBuilder authentication manager builder
     * @throws Exception exception
     */
    @Autowired
    public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(this.userDetailsService);
    }

    /**
     * Builder of the JWT login filter
     *
     * @return JWT login filter class
     * @throws Exception exception
     */
    @Bean
    public JWTLoginFilter authenticationTokenFilterBean() throws Exception {
        return new JWTLoginFilter();
    }

    /**
     * The configuration itself, used to control API paths and filtering traffic
     *
     * @param http internal http security
     * @throws Exception exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                // we don't need CSRF because our token is invulnerable
                .csrf().disable()

                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()

                // don't create session
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()

                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // allow anonymous resource requests
                .antMatchers(
                        HttpMethod.GET,
                        "/",
                        "/*.html",
                        "/favicon.ico",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js"
                ).permitAll()
                .requestMatchers(CorsUtils::isCorsRequest).permitAll()
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and().httpBasic()
                .and().addFilterBefore(new WebSecurityCorsFilter(), ChannelProcessingFilter.class);


    // Custom JWT based security filter
        http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

        // disable page caching
        http.headers().cacheControl();
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        // Create a default account
//        auth.inMemoryAuthentication()
//                .withUser("admin")
//                .password("password")
//                .roles("ADMIN");
////        auth.userDetailsService(userDetailsService);
//    }
}
