 This is part 4 of the fullstack open course by https://studies.cs.helsinki.fi 
 
### Part 4 sub b. | Testing the Backend

#### Supertest

`npm install --save-dev supertest`

Supertest binds to ephemeral port if there not one already listening. Using axios would require another instance of the server running separately before testing. Supertest offers the method [expect()](https://www.npmjs.com/package/supertest).

