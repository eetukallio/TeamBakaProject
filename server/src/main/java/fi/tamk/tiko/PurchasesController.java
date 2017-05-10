package fi.tamk.tiko;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *  The purchases controller class
 *
 *  @author Henri Kankaanpää
 *  @version 1.0
 *  @since 1.0
 */
@RestController
public class PurchasesController {

    @Autowired
    PurchasesRepository db;

    /**
     * Saves a purchase in the database.
     *
     * @param ml Purchase to be stored in the database.
     */
    @RequestMapping(value = "/purchases",  method=RequestMethod.POST)
    public void saveProduct(@RequestBody Purchases ml) {
        db.save(ml);
    }

    /**
     * Returns all purchases in the database.
     *
     * @return All purchases in the database as an iterable.
     */
    @RequestMapping(value = "/purchases", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Purchases> fetchProducts() {
        return db.findAll();
    }

    /**
     * Returns a purchase by id.
     *
     * @param id Id of the purchase.
     * @return Purchase matching the id.
     */
    @RequestMapping(value = "/purchases/{purchaseId}",  method=RequestMethod.GET)
    public Purchases fetchProduct(@PathVariable long id) {
        return db.findOne(id);
    }
}
