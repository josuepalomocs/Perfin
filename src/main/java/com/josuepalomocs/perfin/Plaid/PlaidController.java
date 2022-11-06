package com.josuepalomocs.perfin.Plaid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlaidController {
    @PostMapping("/api/create_link_token")
    public String createLinkToken() {
        return "";
    }
}