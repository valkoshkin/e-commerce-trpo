### Plan:
1. - [x] Убрать сущность Role, вместо нее в User хранить значение некого Enum-a с ролями (UserRole)
2. - [x] Не нужно имплементить UserDetails прямо в классе сущности. Создать для этого отдельный класс
3. - [x] WebSecurityConfig: с помощью WebSecurityConfigurerAdapter
     - [x] В процессе описать вспомогательные классы для JWT
4. - [x] AuthenticationController
5. - [x] Проверить через постман (регистрация и логин)
6. - [x] WebSecurityConfig: новый подход
    - https://www.baeldung.com/spring-deprecated-websecurityconfigureradapter
    - https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
7. - [ ] Контроллеры и ДТО для остальных сущностей
8. - [ ] Тесты для контроллеров
9. - [ ] Фронт
     - [ ] Продумать структуру приложения, накидать мокапы

- По итогу этовсе должно собираться в .jar
- Показать покрытие с помощью jacoco

### Questions:
1. UserDetailsImpl -> serialVersionUID: зачем нужно?
2. Директивы spring: Component, Configuration, Bean
3. JwtTokenFilter -> doFilterInternal: что происходит здесь и в какой момент срабатывает этот метод?
4. В какой момент управление переходит к JwtAuthEntryPoint?