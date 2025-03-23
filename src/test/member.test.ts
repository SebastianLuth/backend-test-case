import supertest from "supertest";
import { app } from "../application/app";
import { logger } from "../application/logging";

describe("/api/member", () => {
  it("should rejected create member if request is invalid",async ()=>{
      const response = await supertest(app).post("/api/member").send({
          code : "",
          name : ""
      })
      logger.debug(response.body)
      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
  })
  it("should rejected create member if request is invalid",async ()=>{
      const response = await supertest(app).post("/api/member").send({
          code : 123,
          name : ""
      })
      logger.debug(response.body)
      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
  })
  it("should success to  create a new member ",async ()=>{
      const response = await supertest(app).post("/api/member").send({
          code : "M004",
          name : "Selena"
      })
      logger.debug(response.body)

      console.log(response.body)
      expect(response.status).toBe(200)
      expect(response.body.data.code).toBe("M004")
      expect(response.body.data.name).toBe("Selena")
  })
    it("should succes to get all member", async () => {
      const response = await supertest(app).get("/api/member");
      logger.debug(response.body);

      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThan(0);
      console.log(response.body.data);
    });
});

describe("POST /api/member/borrow", () => {
    it("should succes to Borrow Book", async () => {
        const response = await supertest(app).post("/api/member/borrow").send({
            memberCode: "M002",
            bookCodes: ["JK-45"]
        });
        console.log(response.body);
    
        logger.debug(response.body);
        expect(response.status).toBe(200);
    
        expect(response.body.data.memberCode).toBe("M002"); // Perbaiki typo dari "memberCode"
        expect(response.body.data.borrowedBooks.map((book: { code: string; }) => book.code)).toEqual(["JK-45"]); // Sesuaikan format
    });
    

//   it("should rejected to  Borrow Book cause he is borrow more than 2", async () => {

//     const response = await supertest(app).post("/api/member/borrow").send({
//         code: "M003",
//         bookCodes: ["HOB-83", "JK-45"]
//     });

//     logger.debug(response.body);
//     expect(response.status).toBe(400);
//     expect(response.body.errors).toBe(
//         "Member can borrow a maximum of 2 books at a time"
//       );
//   });

//   it("should rejected to  Borrow Book cause the books is borrowed other member", async () => {

//     const response = await supertest(app).post("/api/member/borrow").send({
//         code: "M003",
//         bookCodes: ["HOB-83", "JK-45"]
//     });

//     logger.debug(response.body);
//     expect(response.status).toBe(400);
//     expect(response.body.errors).toBe(
//         "Member can borrow a maximum of 2 books at a time"
//       );
//   });

});

describe('GET /api/member/borrow', () => { 
    it('should success return The number of books being borrowed by each member', async () => {
        const response = await supertest(app).get('/api/member/borrow?memberCode=M002');

        logger.debug(response.body);
        expect(response.status).toBe(200);
        console.log(response.body);
    })
 })


describe('POST /api/member/return', () => {
    it('should return success when returning a book', async () => {
        const response = await supertest(app).post('/api/member/return').send({
            memberCode: "M002",
            bookCodes: ["TW-11"],
            returnDate: "2025-03-25T00:00:00.000Z"
        });

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.penalty).toBe(false);
    });
});

