package fi.tamk.tiko.Controller;

import fi.tamk.tiko.Entity.Category;
import fi.tamk.tiko.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Eetu Kallio on 20.5.2017
 */

@RestController
public class CategoryController {

    @Autowired
    CategoryRepository db;

    @RequestMapping(value = "/categories/flood",  method= RequestMethod.POST)
    public void floodCategories() {

        Category category = new Category();
        category.setName("pillows");
        db.save(category);
        Category category2 = new Category();
        category2.setName("accessories");
        db.save(category2);
        Category category3 = new Category();
        category3.setName("clothes");
        db.save(category3);
    }

    @RequestMapping(value = "/categories",  method= RequestMethod.GET)
    public List<Category> getCategories () {
        return db.findAll();
    }

}
