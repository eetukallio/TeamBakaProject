package fi.tamk.tiko;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * The actual Spring Boot application
 *
 * @author Henri Kankaanpää
 * @author Eetu Kallio
 * @version 1.0
 * @since 1.0
 */
@SpringBootApplication
public class Application {
    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
        System.out.println();
        System.out.println("WELCOME TO BODY PILLOW E-STORE BACKEND" +
                "\n" +
                "The frontpage of this application is available at 'http://localhost:8080'" +
                "\n" +
                "from there on you may navigate by using the links provided by the site or use the following URLs:" +
                "\n" +
                "'http://localhost:8080/browse' \n" +
                "'http://localhost:8080/item?id={id}'\n" +
                "'http://localhost:8080/browse?search={search}'\n" +
                "'http://localhost:8080/orders'\n" +
                "'http://localhost:8080/config'\n" +
                "'http://localhost:8080/cart'\n" +
                "'http://localhost:8080/login'\n");
    }
}
