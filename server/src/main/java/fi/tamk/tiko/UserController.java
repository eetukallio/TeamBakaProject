
package fi.tamk.tiko;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository users;

    @RequestMapping(value = "/users",  method=RequestMethod.POST)
    public void saveLocation(@RequestBody User user) {
        users.save(user);
    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)

    @ResponseBody
    public Iterable<User> fetchLocations() {
        return users.findAll();
    }

    @RequestMapping(value = "/users/{userId}",  method=RequestMethod.GET)
    public User fetchLocation(@PathVariable long userId) {
        return users.findOne(userId);
    }
}
