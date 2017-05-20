package fi.tamk.tiko.Controller;

import fi.tamk.tiko.Entity.Product;
import fi.tamk.tiko.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            Product product = new Product(i, i, names[random] + " best girl", i + "cm x " + i + "cm x " + i +"cm",
                    "http://bit.ly/2r0t4t6", i,
                    "Quality bodypillow made out of all natural materials. No child labor involved either.",
                    "comfy,cotton,natural,soft", 1);
            db.save(product);
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

        List<Product> products = (List<Product>) db.findAll();

        for (Product p: products) {
            p.add(linkTo(ProductController.class).slash(p.getProductId()).withSelfRel());
        }

        return products;
    }

    /**
     * Returns a product by id.
     *
     * @param productId Id of the product.
     * @return Product matching the id.
     */
    @RequestMapping(value = "/products/{productId}",  method=RequestMethod.GET)
    public Product fetchProduct(@PathVariable long productId) {

        Product product = db.findOne(productId);
        product.add(linkTo(ProductController.class).slash(product.getProductId()).withSelfRel());
        return product;
    }
}
