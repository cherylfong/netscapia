# netscapia

![](https://64.media.tumblr.com/tumblr_mbe1y9WerA1riqzepo1_400.gif)

End-to-end web development. 

[<img src="https://raw.githubusercontent.com/mermaid-js/mermaid/develop/docs/public/favicon.svg" alt="mermaid tail" width="20" height="20"> ](https://mermaid.live)

## Contents

### [Part 0](part0/part0.md)

Web application fundamentals.

### [Part 1](part1)

React introduction.

Each listed here is its own React App.

- [`/preliminary`](part1/preliminary/README.md) : exploring part 1.

- [`/courseinfo`](part1/courseinfo/src/App.js) : fulfills instructions from 1.1 to 1.5.

- [`/unicafe`](part1/unicafe/src/App.js) : fulfills instructions from 1.6 to 1.11

- [`/anecdotes`](part1/anecdotes/src/App.js) : fulfills instructions from 1.12 to 1.14

### [Part 2]([part2])

Introduction to server side programming.

Similarly with Part 1, each listed directory is its own React App.

- [`/preliminary`](part2/preliminary/README.md) : exploring part 2.

- [`/courseinfo`](part2/courseinfo/src/App.js) : fulfills instructions from 2.1 to 2.5.

- [`/phonebook`](part2/phonebook/src/App.js) : fulfills instructions from 2.6 to 2.17.

- [`/world`](part2/world/src/App.js) : fulfills instructions from 2.18 to 2.20.

### [Part 3]([part3])

Server side programming with NodeJS and Express.

- [`/preliminary`](part3/preliminary/README.md) : notes from [Part 3](https://fullstackopen.com/en/part3).

- [`/notes-backend`](part3/notes-backend/src/App.js) : Communicates with [`/notes-2026`](part2-2026/notes-2026) as frontend. 🌐 **Live preview** can be found at this [URL](https://netscapia-notes-backend.onrender.com/). Fulfills all guided instructions from [Part 3](https://fullstackopen.com/en/part3).

- [`/phonebook`](part2/phonebook/src/App.js) : Communicates with [`/phonebook-2026`](part2-2026/phonebook-2026) as frontend. 🌐 **Live preview** can be found at this [URL](https://netscapia-phonebook-backend.onrender.com/). Fulfills all exercises from 3.1 to 3.22 of [Part 3](https://fullstackopen.com/en/part3).

The 4 subparts in Part 3 are completed in individual branches and is named according to each subpart with continued history sequentially from a to d:

| Part 3  | Branch                                                                  |
|---------|-------------------------------------------------------------------------|
| a.      | [` part3 `]( https://github.com/cherylfong/netscapia/tree/part3)        |
| b.      | [` part3-b `]( https://github.com/cherylfong/netscapia/tree/part3-b )   |
| c.      | [` part3-c `]( https://github.com/cherylfong/netscapia/tree/part3-c )   |
| d.      | [` part3-d `]( https://github.com/cherylfong/netscapia/tree/part3-d )   |

### [Part 4](part4)

Server side testing and website user administration.

- [README.md](part4/README.md) : contains notes from [Part 4](https://fullstackopen.com/en/part4)

- [/notes-backend](part4/notes-backend) : is an improved server side endpoint of [part3/notes-backend/](part3/notes-backend/) with unit testing and user login, and user note creation. Fullfills all guided instruction from [Part 4](https://fullstackopen.com/en/part4).

- [/bloglist](part4/bloglist) : server side application that allows logged in users to add/post blog details as an entry such as a blog's title and URL. Users can update and delete blog detail entries they have posted. Fullfills all exercises from 4.1 to 4.23 of [Part 4](https://fullstackopen.com/en/part4).

Unlike [Part 3](part3) there is only one branch for created to complete [Part 4](part4), i.e., [`part4-a`](https://github.com/cherylfong/netscapia/tree/part4-a). I was engrossed with completing the exercises that I had forgotten to create a branch for each sub part. 🫠

### [Part 5](part5)

Testing React apps using unit, integration and end-to-end testing. There's one section about React Routers and using UI frameworks.

- [README.md](part5/README.md) : contains notes from [Part 5](https://fullstackopen.com/en/part5)

- [/notes-frontend](part5/notes-frontend) has improved style and page routing. This directory also includes unit tests using `Vitest`. Fullfills all guided instruction from [Part 5](https://fullstackopen.com/en/part5).

Visit the following links to see a **live preview** of the _Notes App_:
>
> 🌐 [Before](https://netscapia-notes-backend-part5-d.onrender.com/) adding the Material Design UI Library and React Routers (this state is located on branch [`part5-d`]( https://github.com/cherylfong/netscapia/tree/part5-d )).
>
> 🌐 [After](https://netscapia-notes-backend-part5-e.onrender.com/) (applied to branch [`part5-e`]( https://github.com/cherylfong/netscapia/tree/part5-e )).

- [/bloglist-frontend](part5/bloglist-frontend) also has improved style and page routing. This directory also includes integration tests using `Vitest`. Fullfills all exercises from 5.1 to 5.31 of [Part 5](https://fullstackopen.com/en/part5)

Visit the following links to see a **live preview** of the _Bloglist App_:
>
> 🌐 [Before](https://netscapia-bloglist-backend-part5-d.onrender.com/) adding the Material Design UI Library and React Routers (this state is located on branch [`part5-d`]( https://github.com/cherylfong/netscapia/tree/part5-d )).
>
> 🌐 [After](https://netscapia-bloglist-backend-part5-e.onrender.com/) (applied to branch [`part5-e`]( https://github.com/cherylfong/netscapia/tree/part5-e )).
>
>Contrary to the intructions, **the Bloglist application deliberately allows Unauthenticated users to like blog items.**

The 5 subparts in Part 5 are completed in individual branches and is named according to each subpart with continued history sequentially from a to e:

| Part 5  | Branch                                                                  |
|---------|-------------------------------------------------------------------------|
| a.      | [`part5-a`]( https://github.com/cherylfong/netscapia/tree/part5-a )     |
| b.      | [`part5-b`]( https://github.com/cherylfong/netscapia/tree/part5-b )     |
| c.      | [`part5-c`]( https://github.com/cherylfong/netscapia/tree/part5-c )     |
| d.      | [`part5-d`]( https://github.com/cherylfong/netscapia/tree/part5-d )     |
| e.      | [`part5-e`]( https://github.com/cherylfong/netscapia/tree/part5-e )     |
