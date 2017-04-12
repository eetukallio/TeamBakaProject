
package fi.tamk.tiko;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// This class acts as the Product controller.
// Usually when using @Controller, you will use also @RequestMapping
@RestController
public class ProductController {

    @Autowired
    ProductRepository db;

    @RequestMapping(value = "/products",  method=RequestMethod.POST)
    public void saveProduct(@RequestBody Product ml) {
        db.save(ml);
    }

    @RequestMapping(value = "/products/flood",  method=RequestMethod.POST)
    public void floodProducts() {

        String[] names = {"Onodera", "Chitoge", "Subaru", "Hanekawa", "Senjougahara"};
        int random;

        for (int i = 0; i < 100; i++) {
            random = (int) Math.floor((Math.random()*5));
            db.save(new Product(i, i, names[random] + " best girl", i + "cm x " + i + "cm x " + i +"cm",
                    "myanimelist.com"));
        }
    }

    @RequestMapping(value = "/products", method = RequestMethod.GET)
    // The return value will be the HTTP Body
    @ResponseBody
    public Iterable<Product> fetchProducts() {
        return db.findAll();
    }

    @RequestMapping(value = "/products/{productId}",  method=RequestMethod.GET)
    public Product fetchProduct(@PathVariable long locationId) {
        return db.findOne(locationId);
    }
}
