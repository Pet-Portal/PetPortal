const { ExpectationFailed } = require("http-errors");
const supertest = require("supertest");
const app = require("../../app");

const request = supertest(app);

//PETS
it("fetch all pets", async () => {
  const res = await request.get("/api/pets");

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

it("find all pets Dog", async () => {
  const res = await request.get("/api/pets?species=Dog");
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

it("find all pets age 4", async () => {
  const res = await request.get("/api/pets?age=4");

  expect(res.body.length).toBe(1);
});

it("find all pets Name Rocky", async () => {
  const res = await request.get("/api/pets?name=Rocky");

  expect(res.body.length).toBe(1);
}); 
/*
  it("find all pets gender", async () => {
    const res = await request.get("/api/pets?gender=male");
  
    expect(res.body.length).toBe(1);
}) 
    it("find all pets owner", async () => {
      const res = await request.get("/api/pets?owner=ironhackermodulo3@gmail.com");
    
      expect(res.body.length).toBe(1);
}) 
*/

//POSTS
  it("fetch all posts", async () => {
    const res = await request.get("/api/posts");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

it("find all post title", async () => {
  const res = await request.get("/api/posts?title=Rocky necesita donde quedarse");

  expect(res.body.length).toBe(1);
});

it("find all post state posted", async () => {
  const res = await request.get("/api/posts?state=posted");

  expect(res.body.length).toBe(1);
});

it("find all post start", async () => {
  const res = await request.get("/api/posts?start=2021-04-01T11:58:42.238+00:00");

  expect(res.body.length).toBe(1);
});

it("find all post end", async () => {
    const res = await request.get("/api/posts?end=2021-04-01T18:58:42.238+00:00");
  
    expect(res.body.length).toBe(1);
  });
/*
  it("find all post user", async () => {
    const res = await request.get("/api/posts?user=ironhackermodulo3@gmail.com");
  
    expect(res.body.length).toBe(1);
  });

  it("find all post pet", async () => {
    const res = await request.get("/api/posts?pet=Rocky");
  
    expect(res.body.length).toBe(1);
      });
*/



//USERS
it('fetch all users', async () => {
    const res = await request.get('/api/users')

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)

})

it("find all user role", async () => {
  const res = await request.get("/api/users?role=admin");

  expect(res.body.length).toBe(1);
});

it("find all user name", async () => {
  const res = await request.get("/api/users?name=Juan");

  expect(res.body.length).toBe(1);
});

it("find all user email", async () => {
  const res = await request.get("/api/users?email=ironhackermodulo3@gmail.com");

  expect(res.body.length).toBe(1);
});
/*
it("find all user interst", async () => {
  const res = await request.get("/api/users?interest= ");

  expect(res.body.length).toBe(1);
});
*/

it("find all user createdAt", async () => {
    const res = await request.get("/api/users?createdAt=2021-04-01T16:58:42.238+00:00");
  
    expect(res.body.length).toBe(1);
  });

