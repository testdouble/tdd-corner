# What is this

An application for submitting TDD (client) problems for TDD corner

# Requirements

Anonymous User

- [X] Can access login page

Test Double User

- [x] Can log in using testdouble credentials
- [X] Creates a new user upon login
- [x] Submit proposals
- [x] Can go home from any page
- [x] Proposals have a description
- [x] Proposals have contact info for the requestor
- [x] Proposals are visible for reference
- [x] Can add request comments
- [x] Can soft delete proposal - if it's your proposal
- [x] Can log out
- [x] Can edit own proposal
- [x] Can't edit others proposal
- [x] I can still update my proposal if my email changes
- [x] Proposal ownership is maintained when a user's email changes

Admin User

- Everything TestDouble user can do
- Admins can remove/edit/reprioritize proposals
- Admins can add/remove other admins
- [x] Can delete any proposal
- [x] Can edit any proposal

Post-MVP (won't do)

- Proposals notify someone/somehow
- Defined Proposals statuses

## Refactoring ideas

- Style the form
- Custom test helpers
- Move root to proposals/index
- Move tests out of system/homes_test that are about the layout, not about the home page specifically
- Fix the omniauth warning about GET/POST
- Test login endpoint should only be accessible while testing

## Proposal Lifetime

- User submits proposal
- Admin accepts/rejects
- Proposal ends

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
