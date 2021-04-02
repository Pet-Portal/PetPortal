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

  expect(res.body.length).toBe(1);
});

it("find all pets age 4", async () => {
  const res = await request.get("/api/pets?age=4");

  expect(res.body.length).toBe(1);
});

it("find all pets Name Rocky", async () => {
  const res = await request.get("/api/pets?name=Rocky");

  expect(res.body.length).toBe(1);
}) 


//POSTS
  it("fetch all posts", async () => {
    const res = await request.get("/api/posts");

    expect(res.sattus).toBe(200);
    expect(res.body.length).toBe(1);
  });

it("find all post title", async () => {
  const res = await request.get("/api/pets?title=Rocky necesita donde quedarse");

  expect(res.body.length).toBe(1);
});

it("find all post state posted", async () => {
  const res = await request.get("/api/pets?state=posted");

  expect(res.body.length).toBe(1);
});

it("find all post start", async () => {
  const res = await request.get("/api/pets?start=2021-04-01T11:58:42.238+00:00");

  expect(res.body.length).toBe(1);
});

it("find all post end", async () => {
    const res = await request.get("/api/pets?end=2021-04-01T18:58:42.238+00:00");
  
    expect(res.body.length).toBe(1);
  });


//USERS
it('fetch all users', async () => {
    const res = await request.get('/api/users')

    expect(res.sattus).toBe(200)
    expect(res.body.length).toBe(1)

})

it("find all user role", async () => {
  const res = await request.get("/api/pets?role=admin");

  expect(res.body.length).toBe(1);
});

it("find all user name", async () => {
  const res = await request.get("/api/pets?name=Juan");

  expect(res.body.length).toBe(1);
});

it("find all user email", async () => {
  const res = await request.get("/api/pets?email=ironhackermodulo3@gmail.com");

  expect(res.body.length).toBe(1);
});

it("find all user createdAt", async () => {
    const res = await request.get("/api/pets?createdAt=2021-04-01T16:58:42.238+00:00");
  
    expect(res.body.length).toBe(1);
  });

