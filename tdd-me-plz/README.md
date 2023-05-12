# What is this

An application for submitting TDD (client) problems for TDD corner

# Requirements

Anonymous User

1. Roboprotection (no spam)
2. Can login

Test Double User

1. [x] Can log in using testdouble credentials
2. [x] Submit proposals
3. [x] Can go home from any page
4. [x] Proposals have a description
5. [x] Proposals have contact info for the requestor
6. [x] Proposals are visible for reference
7. [x] Can add request comments
8. [x] Can soft delete proposal - if it's your proposal
9. [x] Can log out
10. [ ] Can edit own proposal
    10b. [ ] Can't edit others proposal

Admin User

1. Everything TestDouble user can do
2. Admins can remove/edit/reprioritize requests
3. Admins can add/remove other admins
4. Can delete any proposal

Post-MVP (won't do)

1. Proposals notify someone/somehow
2. Defined Proposals statuses

## Refactoring ideas

1. Style the form
2. Custom test helpers
3. Move root to proposals/index
4. Move tests out of system/homes_test that are about the layout, not about the home page specifically
5. Fix the omniauth warning about GET/POST

## Proposal Lifetime

1. User submits proposal
2. Admin accepts/rejects
3. Proposal ends

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...
