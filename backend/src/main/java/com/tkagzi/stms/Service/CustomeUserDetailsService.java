package com.tkagzi.stms.Service;

import com.tkagzi.stms.Exception.OurException;
import com.tkagzi.stms.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomeUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    //i_f want to check based on username as well as on email
    //then add method in service class and pass the arg and validate there then return User obj
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(()->new OurException("Email/Username not found"));
    }




}
