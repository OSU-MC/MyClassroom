const db = require('../../../app/models/index')

describe("Question model", () => {
    beforeAll(async() => {
        await db.sequelize.sync() // connect to the database
    })

    describe("multiple choice", () => {
        
        let question

        it ("should create a valid multiple choice question", async () => {
            question = await db.Question.create({
                type: 'multiple choice',
                stem: 'What is 1 + 2?',
                content: {
                    options: {
                        0: 2,
                        1: 3,
                        2: 4,
                        3: 5
                    }
                },
                answers: {
                    0: false,
                    1: true,
                    2: false,
                    3: false
                }
            })
            question = await question.reload() // this will reload data from the database so we can check access methods as well
            console.log(question)
            expect(question.type).toEqual('multiple choice')
            expect(question.stem).toEqual('What is 1 + 2?')
            expect(question.content.options).not.toBeNull()
            for (let i = 0; i < Object.entries(question.content.options); i++) {
                expect(question.content.options[i].toEqual(i + 2))
                if (i == 1) {
                    expect(question.answers[i]).toEqual(false)
                }
                else {
                    expect(question.answers[i]).toEqual(true)
                }
            }
        })
    })

    describe("multiple answer", () => {
        
    })

    afterAll(async () => {
        await db.Question.destroy({ // delete all User records to flush out the database after the tests have run
            where: {},
            truncate: true
        })
        await db.sequelize.close()
    })
})