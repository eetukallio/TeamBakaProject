package fi.tamk.tiko;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *  The product controller class
 *
 *  @author eetukallio
 *  @version 1.0
 *  @since 1.0
 */
@RestController
public class ProductController {

    @Autowired
    ProductRepository db;

    /**
     * Saves a product in the database.
     *
     * @param ml Product to be stored in the database.
     */
    @RequestMapping(value = "/products",  method=RequestMethod.POST)
    public void saveProduct(@RequestBody Product ml) {
        db.save(ml);
    }

    /**
     * Floods the database with dummy data.
     */
    @RequestMapping(value = "/products/flood",  method=RequestMethod.POST)
    public void floodProducts() {

        String[] names = {"Onodera", "Chitoge", "Subaru", "Hanekawa", "Senjougahara"};
        int random;

        for (int i = 0; i < 100; i++) {
            random = (int) Math.floor((Math.random()*5));
            db.save(new Product(i, i, names[random] + " best girl", i + "cm x " + i + "cm x " + i +"cm",
                    "myanimelist.com", i));
        }
    }

    /**
     * Returns all products in the database.
     *
     * @return All products in the database as an iterable.
     */
    @RequestMapping(value = "/products", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Product> fetchProducts() {
        return db.findAll();
    }

    /**
     * Returns a product by id.
     *
     * @param id Id of the product.
     * @return Product matching the id.
     */
    @RequestMapping(value = "/products/{productId}",  method=RequestMethod.GET)
    public Product fetchProduct(@PathVariable long id) {
        return db.findOne(id);
    }
}
