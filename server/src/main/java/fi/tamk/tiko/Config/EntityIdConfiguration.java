package fi.tamk.tiko.Config;

import fi.tamk.tiko.Entity.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

/**
 * Config to expose ids.
 */
@Configuration
public class EntityIdConfiguration extends RepositoryRestConfigurerAdapter {

    /**
     * Exposes ids to API calls.
     *
     * @param config Configuration used.
     */
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Category.class);
        config.exposeIdsFor(Product.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Purchase.class);

    }
}
