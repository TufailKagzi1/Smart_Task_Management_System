package com.tkagzi.stms.Utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTUtils {

    private static final long EXPIRATION_TIME = 1000 * 60 * 24 * 7; //7 DAYS

    private final SecretKey Key;

    public JWTUtils(){
        String secretKey = "d41f370ec17ef740fe676366de4a2daba7aa90721b9e979477c6ea5518955de6";
        byte[] keyBytes = Base64.getDecoder().decode(secretKey.getBytes(StandardCharsets.UTF_8));
        this.Key =  new SecretKeySpec(keyBytes,"HmacSHA256");
    }

    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    //extract username
    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims,T> claimsTfunction) {
        return claimsTfunction.apply(Jwts.parser().verifyWith(Key).build()
                .parseSignedClaims(token).getPayload());
    }

    public boolean isValidToken(String toke, UserDetails userDetails){
        final String  username = extractUsername(toke);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(toke));
    }

    private boolean isTokenExpired(String toke) {
        return extractClaims(toke,Claims::getExpiration).before(new Date());
    }
}
