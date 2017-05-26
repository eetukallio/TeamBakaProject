package fi.tamk.tiko;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("api")
public class Controllerer {
    @RequestMapping("token")
    @CrossOrigin
    Map<String, String> token(HttpSession session) {
        return Collections.singletonMap("token", session.getId());
    }
}
