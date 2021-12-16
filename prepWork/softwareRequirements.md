# Software Requirements

## Vision

- What is the vision of this product?
  - It will provide functionality to an online NFT gallery that is missing (following an artist) from the current implementation. It will also allow the user to login, find NFTs by address or artist and unfollow the artist.
- What pain point does this project solve?
  - It adds additional functionality to a site that currently does not have the capability to login.
- Why should we care about your product?
  - This streamlines the purchase process for online galleries/marketplaces and allows users to follow their favorite artists.

## Scope (In/Out)

- IN - What will your product do
  - Describe the individual features that your product will do.
    - The app will authenticate users and allow the user to login
    - The app will allow users to follow NFT artists
    - The app will allow users to list the artists they follow
- OUT - What will your product not do.
  - The app will not have a UI/front end.

## Minimum Viable Product vs

- What will your MVP functionality be?
  - Our MVP functionality will have the user being able to send a post request to the Opensea API and bring able to grab the address, token ID, and image_URL.

- What are your stretch goals?
  - Adding Events
  - Adding Multiple Users
  - Having a link to the image through the terminal
  - Adding a simple front end to display images

## Stretch

- What stretch goals are you going to aim for?
  - Adding Events
  - Multiple users logged in at once

## Functional Requirements

- An admin can create and delete user accounts
- A user can update thier NFT tokens
- A user can search all of the NFT's in the Database
- Call an API to grab information by parameters
- The user can Delete info from our Database
- A user will be able to like/follow and have those stored in the database

## Data Flow

>The user will have a choice to log in or not. While not logged in, the user can view what NFT's they want, and if they are logged in, then can like/follow and save those to the database.  
>Whenever they do a post request, it will send it to the Opensea API to grab that data is present. Then it will save it to the database if they are logged in. They can also delete from "their" database if they are signed in.  
>For visuals, the user will be able to see the token, what NFT, and a link to their digital item.

## Non-Functional Requirements

- Security
  - Security best practices are followed and kept up to date with industry standards. The bearer token is supplied from a third party authentication provider. PII (Personally Identifiable Information) is encrypted on our servers.

- Usability
  - These new features will be used and create a new 'wow' factor. It will feel familiar and have a natural design pattern. The user will feel at 'home' on this site.
