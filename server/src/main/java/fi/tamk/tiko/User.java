package fi.tamk.tiko;

import javax.persistence.*;

@Entity
@Table(name="locations")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;
    @Column(name="userName")
    private String userName;
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;

    public User() {}

    public User(long id, String userName, String longitude, String email) {
        this.id = id;
        this.userName = userName;
        this.password = longitude;
        this.email = email;
    }

    public long getId() {
        return this.id;
    }

    public String getEmail() {
        return email;
    }

    public String getUserName() {
        return this.userName;

    }

    public String getPassword() {
        return this.password;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
