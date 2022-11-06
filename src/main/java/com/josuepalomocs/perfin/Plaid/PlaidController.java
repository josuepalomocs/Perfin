package com.josuepalomocs.perfin.LinkToken;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LinkTokenController {
    @PostMapping("/api/create_link_token")
    public LinkToken createLinkToken() {

    }
}