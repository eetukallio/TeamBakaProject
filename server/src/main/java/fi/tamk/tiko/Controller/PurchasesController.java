package fi.tamk.tiko.Controller;

import fi.tamk.tiko.Entity.Purchases;
import fi.tamk.tiko.Repository.PurchasesRepository;
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
    public Iterable<Purchases> fetchPurchases() {
        return db.findAll();
    }

    /**
     * Returns all purchases by user id.
     *
     * @return All purchases with the matching user as an iterable.
     */
    @RequestMapping(value = "/purchases/user/{user}", method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Purchases> fetchPurchasesByUser(@PathVariable long user) {
        return db.findAllByUser(user);
    }

    /**
     * Returns a purchase by id.
     *
     * @param id Id of the purchase.
     * @return Purchase matching the id.
     */
    @RequestMapping(value = "/purchases/{id}",  method=RequestMethod.GET)
    public Purchases fetchPurchase(@PathVariable long id) {
        return db.findOne(id);
    }
}
