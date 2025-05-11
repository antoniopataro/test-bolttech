generated documentation at: https://documenter.getpostman.com/view/24963415/2sB2jAaT2V

#### 1. getting started:

1. to get started, clone the repository to your machine with:

```
git clone git@github.com:antoniopataro/test-bolttech.git
```

2. then, in order to execute it, run at the project's root directory either:

```
make doker
```

or

```
docker compose up
```

3. wait for the build to finish and access the frontend at http://localhost:3000

---

#### 2. author's note:

in terms of architecture, i decided to follow the simplest approach i could think of: an api and a frontend ― not even a database (for that, i decided to use in-memory repositories)

also, since the description didn't mention how to deliver the project, i decided to use docker for that (in development mode, since this is a mock application and it will make reviewing easier)

one little thing i think is worth mentioning about my solution is the default data organization: to avoid going through the trouble of making relational-db-like relationships between entities on an in-memory db, i made the decision of storing 1. car details, and 2. pricing rules on the same entitiy (3. stock information is also debatable, given that this application could scale and, maybe, need different data for different regions) ― the reason i'm pointing that out is because i'd probably not do that in a production environment, where things could scale quick

i had fun during this challenge ― starting from scratch on a project, even on a mocked one, was surprisingly not tedious =)
