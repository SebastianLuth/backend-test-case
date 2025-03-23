import supertest from "supertest"
import { app } from "../application/app"
import { logger } from "../application/logging"

describe("POST /api/book", ()=>{
    it("should rejected create book if request is invalid",async ()=>{
        const response = await supertest(app).post("/api/book").send({
            code : "",
            title : "",
            author : "",
            stock : 0
        })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it("should rejected create book if request is invalid",async ()=>{
        const response = await supertest(app).post("/api/book").send({
            code : 123,
            title : 12,
            author : "",
            stock : 0
        })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    
    })

    it("should success to  create a new book ",async ()=>{
        const response = await supertest(app).post("/api/book").send({
            code: "NRN-7",
            title: "The Lion, the Witch and the Wardrobe",
            author: "C.S. Lewis",
            stock: 1
        })

        console.log(response.body)

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.code).toBe("NRN-7")
        expect(response.body.data.title).toBe("The Lion, the Witch and the Wardrobe")
    })


    it ("should succes to get all book and available stock",async ()=>{
        const response = await supertest(app).get("/api/book");
        logger.debug(response.body)

        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThan(0)
        console.log(response.body.data)
    })
})