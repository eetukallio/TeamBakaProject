package fi.tamk.tiko.Controller;

import fi.tamk.tiko.Entity.Category;
import fi.tamk.tiko.Entity.Product;
import fi.tamk.tiko.Entity.Purchases;
import fi.tamk.tiko.Repository.CategoryRepository;
import fi.tamk.tiko.Repository.ProductRepository;
import fi.tamk.tiko.Repository.PurchasesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Eetu Kallio on 21.5.2017
 */

@RestController
public class DummyController {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private PurchasesRepository purchasesRepository;

    /**
     * Floods the database with dummy data.
     */
    @RequestMapping(value = "/flood",  method= RequestMethod.POST)
    public void floodDummyData() {

        String[] names = {"Onodera", "Chitoge", "Subaru", "Hanekawa", "Senjougahara"};
        int random;

        Category category = new Category();
        category.setName("pillows");
        categoryRepository.save(category);
        Category category2 = new Category();
        category2.setName("accessories");
        categoryRepository.save(category2);
        Category category3 = new Category();
        category3.setName("clothes");
        categoryRepository.save(category3);

        for (int i = 0; i < 100; i++) {
            System.out.println("addin products in category 1");
            random = (int) Math.floor((Math.random()*5));
            Product product = new Product(i, names[random] + " body pillow", i + "cm x " + i + "cm x " + i +"cm",
                    "http://bit.ly/2r0t4t6", i,
                    "Quality bodypillow made out of all natural materials. No child labor involved either.",
                    "comfy,cotton,natural,soft,body pillow", 1);
            productRepository.save(product);
        }
        for (int i = 0; i < 100; i++) {
            random = (int) Math.floor((Math.random()*5));
            Product product = new Product(i, names[random] + " pillow cover", i + "cm x " + i + "cm x " + i +"cm",
                    "http://bit.ly/2r0t4t6", i,
                    "Quality pillow cover made out of all natural materials. No child labor involved either.",
                    "comfy,cotton,natural,soft,cover", 3);
            productRepository.save(product);
        }
        for (int i = 0; i < 20; i++) {
            random = (int) Math.floor((Math.random()*5));
            Product product = new Product(i, names[random] + " mug", i + "cm x " + i + "cm x " + i +"cm",
                    "http://bit.ly/2q8KZNt", i,
                    "Quality mug made out of clay. No child labor involved either.",
                    "natural,sturdy,mug", 2);
            productRepository.save(product);
        }

        List<Long> purchases = new ArrayList<>();
        purchases.add(new Long(1));
        purchases.add(new Long(4));
        purchases.add(new Long(10));
        purchases.add(new Long(10));

        for (int i = 0; i < 20; i++) {
            purchasesRepository.save(new Purchases(purchases, 1));
        }
    }

}
