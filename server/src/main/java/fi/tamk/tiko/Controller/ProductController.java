package fi.tamk.tiko.Controller;

import fi.tamk.tiko.Entity.Product;
import fi.tamk.tiko.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *  The product controller class
 *
 *  @author eetukallio
 *  @version 1.0
 *  @since 1.0
 */
@RepositoryRestController
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
     * @param productId Id of the product.
     * @return Product matching the id.
     */
    @RequestMapping(value = "/products/{productId}",  method=RequestMethod.GET)
    @ResponseBody
    public Product fetchProduct(@PathVariable long productId) {

        Product product = db.findOne(productId);
        product.add(linkTo(ProductController.class).slash(product.getProductId()).withSelfRel());
        return product;
    }

    @RequestMapping(value = "/products/{productId}",  method=RequestMethod.DELETE)
    public void deleteProduct(@PathVariable long productId) {

        db.delete(productId);
    }
}
