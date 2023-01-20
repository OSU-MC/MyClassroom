const db = require('../../../app/models/index')

describe("Question model", () => {
    beforeAll(async() => {
        await db.sequelize.sync() // connect to the database
    })

    describe("Question.create", () => {
        
        let question

        it ("should invalidate the type because it does not exist", async() => {
            await expect(db.Question.create({
                type: 'graphing',
                stem: 'Graph y = x + 1',
                content: {},
                answers: {}
            })).rejects.toThrow("Validation error: Question type is not a valid option")
        })
        
        it ("should invalidate because a stem was not provided", async() => {
            await expect(db.Question.create({
                type: 'multiple answer',
                content: {},
                answers: {}
            })).rejects.toThrow("notNull Violation: Question stem text must be provided")
        })

        it ("should invalidate because the stem provided was empty", async() => {
            await expect(db.Question.create({
                type: 'multiple answer',
                stem: '  ',
                content: {},
                answers: {}
            })).rejects.toThrow("Validation error: Question stem text must be provided")
        })

        describe("type: multiple choice", () => {
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

            it ("should invalidate content because no options were provided", async() => {
                await expect(db.Question.create({
                    type: 'multiple choice',
                    stem: 'What is 1 + 2?',
                    content: {},
                    answers: {}
                })).rejects.toThrow("Validation error: multiple choice question must have options")
            })

            it ("should invalidate content because not enough options were provided", async() => {
                await expect(db.Question.create({
                    type: 'multiple choice',
                    stem: 'What is 1 + 2?',
                    content: {
                        options: {
                            0: 2,
                        }
                    },
                    answers: {
                        0: false
                    }
                })).rejects.toThrow("Validation error: multiple choice question must have more than 1 option")
            })

            it ("should invalidate content because options were not indexed properly", async() => {
                await expect(db.Question.create({
                    type: 'multiple choice',
                    stem: 'What is 1 + 2?',
                    content: {
                        options: {
                            0: 2,
                            1: 3,
                            3: 5
                        }
                    },
                    answers: {
                        0: false,
                        1: true,
                        3: false
                    }
                })).rejects.toThrow("Validation error: multiple choice question option indexed incorrectly or null")
            })

            it ("should invalidate content because option(s) were empty", async() => {
                await expect(db.Question.create({
                    type: 'multiple choice',
                    stem: 'What is 1 + 2?',
                    content: {
                        options: {
                            0: "",
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
                })).rejects.toThrow("Validation error: multiple choice question option must have a string or numeric value")
            })

            it ("should invalidate answers because the number of entries does not match content", async() => {
                await expect(db.Question.create({
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
                        2: false
                    }
                })).rejects.toThrow("Validation error: multiple choice question must have indication of correctness for each option")
            })

            it ("should invalidate answers because answers were not indexed properly", async() => {
                await expect(db.Question.create({
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
                        3: false,
                        4: false
                    }
                })).rejects.toThrow("Validation error: multiple choice question answer indexed incorrectly or null")
            })

            it ("should invalidate answers because answers are not boolean type", async() => {
                await expect(db.Question.create({
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
                        0: 1,
                        1: true,
                        3: false,
                        4: false
                    }
                })).rejects.toThrow("Validation error: multiple choice question answer must have a boolean value")
            })

            it ("should invalidate answers because only 1 answer can be correct", async() => {
                await expect(db.Question.create({
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
                        0: true,
                        1: true,
                        2: false,
                        3: false
                    }
                })).rejects.toThrow("Validation error: multiple choice question can only and must have 1 correct answer")
            })

        })

        describe("type: multiple answer", () => {
            it ("should create a valid multiple answer question", async () => {
                question = await db.Question.create({
                    type: 'multiple answer',
                    stem: 'What is 1 + 2?',
                    content: {
                        options: {
                            0: 2,
                            1: 3,
                            2: 3,
                            3: 3
                        }
                    },
                    answers: {
                        0: true,
                        1: true,
                        2: true,
                        3: false
                    }
                })
                question = await question.reload() // this will reload data from the database so we can check access methods as well
                expect(question.type).toEqual('multiple answer')
                expect(question.stem).toEqual('What is 1 + 2?')
                expect(question.content.options).not.toBeNull()
                for (let i = 0; i < Object.entries(question.content.options); i++) {
                    
                    if (i == 0) {
                        expect(question.content.options[i].toEqual(2))
                        expect(question.answers[i]).toEqual(false)
                    }
                    else {
                        expect(question.content.options[i].toEqual(3))
                        expect(question.answers[i]).toEqual(true)
                    }
                }
            })

            it ("should invalidate content because no options were provided", async() => {
                await expect(db.Question.create({
                    type: 'multiple answer',
                    stem: 'What is 1 + 2?',
                    content: {},
                    answers: {}
                })).rejects.toThrow("Validation error: multiple answer question must have options")
            })

            it ("should invalidate content because not enough options were provided", async() => {
                await expect(db.Question.create({
                    type: 'multiple answer',
                    stem: 'What is 1 + 2?',
                    content: {
                        options: {
                            0: 2,
                        }
                    },
                    answers: {
                        0: false
                    }
                })).rejects.toThrow("Validation error: multiple answer question must have more than 1 option")
            })

            it ("should invalidate content because options were not indexed properly", async() => {
                await expect(db.Question.create({
                    type: 'multiple answer',
                    stem: 'What is 1 + 2?',
                    content: {
                        options: {
                            0: 2,
                            1: 3,
                            3: 5
                        }
                    },
                    answers: {
                        0: false,
                        1: true,
                        3: false
                    }
                })).rejects.toThrow("Validation error: multiple answer question option indexed incorrectly or null")
            })

            it ("should invalidate content because option(s) were empty", async() => {
                await expect(db.Question.create({
                    type: 'multiple answer',
                    stem: 'What is 1 + 2?',
                    content: {
                        options: {
                            0: "",
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
                })).rejects.toThrow("Validation error: multiple answer question option must have a string or numeric value")
            })

            it ("should invalidate answers because the number of entries does not match content", async() => {
                await expect(db.Question.create({
                    type: 'multiple answer',
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
                        2: false
                    }
                })).rejects.toThrow("Validation error: multiple answer question must have indication of correctness for each option")
            })

            it ("should invalidate answers because answers were not indexed properly", async() => {
                await expect(db.Question.create({
                    type: 'multiple answer',
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
                        3: false,
                        4: true
                    }
                })).rejects.toThrow("Validation error: multiple answer question answer indexed incorrectly or null")
            })

            it ("should invalidate answers because answers are not boolean type", async() => {
                await expect(db.Question.create({
                    type: 'multiple answer',
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
                        0: 1,
                        1: true,
                        3: false,
                        4: false
                    }
                })).rejects.toThrow("Validation error: multiple answer question answer must have a boolean value")
            })

            it ("should invalidate answers because there are no correct answers found", async() => {
                await expect(db.Question.create({
                    type: 'multiple answer',
                    stem: 'What is 1 + 2?',
                    content: {
                        options: {
                            0: 2,
                            1: 3,
                            2: 3,
                            3: 3
                        }
                    },
                    answers: {
                        0: false,
                        1: false,
                        2: false,
                        3: false
                    }
                })).rejects.toThrow("multiple answer question must have at least 1 correct answer")
            })
        })
    })

    describe("Question.accuracyScore()", () => {

        describe("type: multiple choice", () => {
            
            let question

            beforeAll(async() => {
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
            })

            it ("should score a 1 for correct answer", async () => {
                submission = {
                    answers: {
                        0: false,
                        1: true,
                        2: false,
                        3: false
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(1.0)
            })

            it ("should score a 0 for incorrect answer", async() => {
                submission = {
                    answers: {
                        0: false,
                        1: false,
                        2: true,
                        3: false
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(0.0)
            })
        })

        describe("type: multiple answer", () => {

            let question

            beforeAll(async() => {
                question = await db.Question.create({
                    type: 'multiple answer',
                    stem: 'What is 1 + 2?',
                    content: {
                        options: {
                            0: 2,
                            1: 3,
                            2: 3,
                            3: 3
                        }
                    },
                    answers: {
                        0: false,
                        1: true,
                        2: true,
                        3: true
                    }
                })
            })

            it ("should score a 1 for correct answer", async () => {
                submission = {
                    answers: {
                        0: false,
                        1: true,
                        2: true,
                        3: true
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(1.0)
            })

            it ("should score a 0: 0 true positives, 0 false positives", async() => {
                submission = {
                    answers: {
                        0: false,
                        1: false,
                        2: false,
                        3: false
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(0.0)
            })

            it ("should score a 0.33: 1 true positives, 0 false positives", async() => {
                submission = {
                    answers: {
                        0: false,
                        1: true,
                        2: false,
                        3: false
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(0.33)
            })

            it ("should score a 0.66: 2 true positives, 0 false positives", async() => {
                submission = {
                    answers: {
                        0: false,
                        1: true,
                        2: true,
                        3: false
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(0.67)
            })

            it ("should score a 0.66: 3 true positives, 1 false positives", async() => {
                submission = {
                    answers: {
                        0: true,
                        1: true,
                        2: true,
                        3: true
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(0.67)
            })

            it ("should score a 0.33: 2 true positives, 1 false positives", async() => {
                submission = {
                    answers: {
                        0: true,
                        1: true,
                        2: false,
                        3: true
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(0.33)
            })

            it ("should score a 0: 1 true positives, 1 false positives", async() => {
                submission = {
                    answers: {
                        0: true,
                        1: false,
                        2: false,
                        3: true
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(0.0)
            })

            it ("should score a 0: 0 true positives, 1 false positives", async() => {
                submission = {
                    answers: {
                        0: true,
                        1: false,
                        2: false,
                        3: false
                    }
                }
                expect(question.accuracyScore(submission)).toEqual(0.0)
            })
        })
    })

    afterAll(async () => {
        await db.Question.destroy({ // delete all User records to flush out the database after the tests have run
            where: {},
            truncate: true
        })
        await db.sequelize.close()
    })
})