package com.valkoshkin.ecommerce.controllers;

import com.valkoshkin.ecommerce.auth.JwtUtils;
import com.valkoshkin.ecommerce.dto.LoginDto;
import com.valkoshkin.ecommerce.dto.MessageDto;
import com.valkoshkin.ecommerce.dto.UserWithCredentialsDto;
import com.valkoshkin.ecommerce.entities.User;
import com.valkoshkin.ecommerce.entities.enums.UserRole;
import com.valkoshkin.ecommerce.mappers.UserMappers;
import com.valkoshkin.ecommerce.repositories.UserRepository;
import com.valkoshkin.ecommerce.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst().orElse(null);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, jwt)
                .body(UserMappers.mapUserDetailsToUserProfileDto(userDetails, role));
    }

    @PostMapping(value = "/register", consumes = "application/json")
    public ResponseEntity<?> registerUser(@RequestBody UserWithCredentialsDto userWithCredentialsDto) {
        if (userRepository.existsByUsernameOrEmail(userWithCredentialsDto.getUsername(), userWithCredentialsDto.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageDto("User with this username or email already exists"));
        }

        User user = UserMappers.mapUserWithCredentialsToUser(userWithCredentialsDto, UserRole.ROLE_USER, passwordEncoder);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageDto("User registered successfully"));
    }
}
