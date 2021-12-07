# Software Requirements

## Vision

- What is the vision of this product?

- What pain point does this project solve?

- Why should we care about your product?

## Scope (In/Out)

- IN - What will your product do
  - Describe the individual features that your product will do.
  - High overview of each. Only need to list 4-5
  - Example:
    - The web app will provide information to the users about all the different Cat Cafe’s in the area
    - The web app will provide both walking and driving directions to each of the destinations
    - Users will be able to “Star” their favorite shops.
    - Each shop will contain reviews of the customer’s experiences
- OUT - What will your product not do.
  - These should be features that you will make very clear from the beginning that you will not do during development. These should be limited and very few. Pick your battles wisely. This should only be 1 or 2 things. Example: My website will never turn into an IOS or Android app.

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

## Functional Requirements

### List the functionality of your product. This will consist of tasks such as the following:

- An admin can create and delete user accounts
- A user can update thier NFT tokens
- A user can search all of the NFT's in the Database
- Call an API to grab information by parameters
- The user can Delete info from our Database
- A user will be able to like/follow and have those stored in the database

## Data Flow

The user will have a choice to log in or not. While not logged in, the user can view what NFT's they want, and if they are logged in, then can like/follow and save those to the database. 

Whenever they do a post request, it will send it to the Opensea API to grab that data is present. Then it will save it to the database if they are logged in. They can also delete from "their" database if they are signed in.

For visuals, the user will be able to see the token, what NFT, and a link to their digital item.

## Non-Functional Requirements

### Examples include:

- Security
- Usability
- Testability
- etc….

## Pick 2 non-functional requirements and describe their functionality in your application.

- Example 1
- Example 2

If you are stuck on what non-functional requirements are, do a quick online search and do some research. Write a minimum of 3-5 sentences to describe how the non-functional requirements fits into your app.

You MUST describe what the non-functional requirement is and how it will be implemented. Simply saying “Our project will be testable for testibility” is NOT acceptable. Tell us how, why, and what.
