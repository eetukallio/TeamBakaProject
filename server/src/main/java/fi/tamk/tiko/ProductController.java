
package fi.tamk.tiko;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// This class acts as a controller.
// Usually when using @Controller, you will use also @RequestMapping
@RestController
public class ProductController {

    @Autowired
    ProductRepository db;

    @RequestMapping(value = "/products",  method=RequestMethod.POST)
    public void saveLocation(@RequestBody Product ml) {
        db.save(ml);
    }

    @RequestMapping(value = "/products", method = RequestMethod.GET)
    // The return value will be the HTTP Body
    @ResponseBody
    public Iterable<Product> fetchLocations() {
        return db.findAll();
    }

    @RequestMapping(value = "/products/{productId}",  method=RequestMethod.GET)
    public Product fetchLocation(@PathVariable long locationId) {
        return db.findOne(locationId);
    }
}
