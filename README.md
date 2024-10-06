# cs5351-code-analysis
# GitHub Authentication and Repository Fetching Guide

This guide explains how to authenticate users via GitHub and fetch their repositories using GitHub’s API. It covers authentication, making API requests, handling responses, displaying data in React, and managing pagination, caching, and error handling.

---

## 1. Authentication

### OAuth Authorization with PKCE
- The user authorizes your app through GitHub's OAuth flow, using PKCE (Proof Key for Code Exchange) for enhanced security.

### Receiving the Access Token
- After the user authorizes your app, GitHub provides an access token, which is used for authenticated API requests.

---

## 2. Using the Access Token

- The access token acts as a key, allowing your app to make authorized requests to GitHub’s API on behalf of the user.
- Include the access token in the `Authorization` header of each API request.

---

## 3. Fetching User Repositories

### API Endpoint
- GitHub provides an endpoint to list a user's repositories.  
  The endpoint for this request is:

  ```bash
  https://api.github.com/user/repos
