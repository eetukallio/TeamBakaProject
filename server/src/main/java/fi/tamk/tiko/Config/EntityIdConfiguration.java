package fi.tamk.tiko.Config;

import fi.tamk.tiko.Entity.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

/**
 * Created by Eetu Kallio on 24.5.2017
 */
@Configuration
public class EntityIdConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Category.class);
        config.exposeIdsFor(Product.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Purchase.class);

    }
}
