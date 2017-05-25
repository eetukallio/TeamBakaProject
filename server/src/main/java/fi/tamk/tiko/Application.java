package fi.tamk.tiko;

import com.sun.jndi.cosnaming.IiopUrl;
import fi.tamk.tiko.Entity.Category;
import fi.tamk.tiko.Entity.Product;
import fi.tamk.tiko.Entity.ShippingAddress;
import fi.tamk.tiko.Entity.User;
import fi.tamk.tiko.Repository.CategoryRepository;
import fi.tamk.tiko.Repository.ProductRepository;
import fi.tamk.tiko.Repository.ShippingAddressRepository;
import fi.tamk.tiko.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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

    @Autowired
    ProductRepository pr;
    @Autowired
    CategoryRepository cr;
    @Autowired
    UserRepository ur;
    @Autowired
    ShippingAddressRepository sr;

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);


    }

    /**
     * Floods the database with dummy data for testing.
     */
    private void floodDatabase() {

        String[] names = {"Onodera", "Chitoge", "Subaru", "Hanekawa", "Senjougahara"};
        int random;

        Category category = new Category();
        category.setName("pillows");
        cr.save(category);
        Category category2 = new Category();
        category2.setName("accessories");
        cr.save(category2);
        Category category3 = new Category();
        category3.setName("clothes");
        cr.save(category3);

        for (int i = 0; i < 100; i++) {
            System.out.println("addin products in category 1");
            random = (int) Math.floor((Math.random()*5));
            Product product = new Product(i, names[random] + " body pillow", i + "cm x " + i + "cm x " + i +"cm",
                    "http://i.ebayimg.com/images/g/ifgAAOSwY0lXRc7o/s-l300.jpg", i,
                    "Quality bodypillow made out of all natural materials.  No child labor involved either.",
                    "comfy,cotton,natural,soft,body pillow", 1);
            pr.save(product);
        }
        for (int i = 0; i < 100; i++) {
            random = (int) Math.floor((Math.random()*5));
            Product product = new Product(i, names[random] + " pillow cover", i + "cm x " + i + "cm x " + i +"cm",
                    "https://n4.sdlcdn.com/imgs/a/k/m/Pikachu-Pokemon-Cushion-Cover-SDL374936898-1-2c4e8.jpg", i,
                    "Quality pillow cover made out of all natural materials. No child labor involved either.",
                    "comfy,cotton,natural,soft,cover", 3);
            pr.save(product);
        }
        for (int i = 0; i < 20; i++) {
            random = (int) Math.floor((Math.random()*5));
            Product product = new Product(i, names[random] + " mug", i + "cm x " + i + "cm x " + i +"cm",
                    "http://bit.ly/2q8KZNt", i,
                    "Quality mug made out of clay. No child labor involved either.",
                    "natural,sturdy,mug", 2);
            pr.save(product);
        }

        User user = new User();
        user.setEmail("u.u@u.u");
        user.setPassword("user");
        user.setUsername("user");
        user.setRole("user");
        User admin = new User();
        admin.setEmail("a.a@a.a");
        admin.setPassword("admin");
        admin.setUsername("admin");
        admin.setRole("admin");
        ur.save(admin);
        ur.save(user);
        ShippingAddress address1 = new ShippingAddress();
        address1.setFirstName("Admin");
        address1.setLastName("Administrator");
        address1.setCity("Tampere");
        address1.setCountry("Finland");
        address1.setZipCode(33540);
        address1.setStreetAddress("Mallikatu 1 a 1");
        address1.setUser(1);
        sr.save(address1);
        ShippingAddress address2 = new ShippingAddress();
        address2.setFirstName("User");
        address2.setLastName("Useman");
        address2.setCity("Tampere");
        address2.setCountry("Finland");
        address2.setZipCode(33542);
        address2.setStreetAddress("Mallikatu 2 a 2");
        address2.setUser(2);
        sr.save(address2);
    }

    /**
     * Prints launch info to the console.
     */
    private void printLaunchInfo() {
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
                "'http://localhost:8080/login'\n" +
                "\n" +
                "The API can be accessed at 'http://localhost:8080/api' and a HTTP GET to the API root" +
                "will provide a list of links in the response" +
                "\n" +
                "To log in you can use username: 'admin' and password 'admin' for admin experience\n" +
                "and username: 'user' and password 'user' for user level experience");
    }
}
