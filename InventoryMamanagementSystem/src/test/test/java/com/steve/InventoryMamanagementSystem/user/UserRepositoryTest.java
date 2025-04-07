package java.com.steve.InventoryMamanagementSystem.user;


import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class UserRepositoryTest extends AbstractionBaseTest {

/*    @Autowired
    UserRepository userRepository;


    @Test
    @DisplayName("Junit test for save user in database")
    void givenUserObject_whenSave_ThenReturnUser() {
        User user = User.builder()
                .name("john")
                .email("john.doe@gmail.com")
                .password("password111")
                .phoneNumber("141748197498134")
                .role(UserRole.ADMIN)
                .build();

        User saveUser = userRepository.save(user);
        Assertions.assertNotNull(saveUser);
        Assertions.assertTrue(saveUser.getId() > 0);
    }*/


}
