'use strict'

const question_types = ['multiple_choice']

module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        // the id column should be standardized across all models
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        type: { // multiple choice only for now
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Question type must be provided"
                },
                notEmpty: {
                    msg: "Question type must be provided"
                },
                isIn: {
                    args: [question_types],
                    msg: "Question type must be a valid option"
                }
            }
        },
        stem: { // the stem is just the wording of the question being posed
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Question stem text must be provided"
                },
                notEmpty: {
                    msg: "Question stem text must be provided"
                }
            }
        },
        content: { // the JSON that is unique to each question type
            type: DataTypes.JSON,
            validate: {
                perTypeValidation(value) {
                    switch(this.type) {
                        case "multiple_choice":
                            const options = value.options
                            if (options === null) {
                                throw new Error("Multiple Choice question must have options")
                            }
                            const options_length = Object.keys(options).length < 2
                            if (options_length) {
                                throw new Error("Multiple Choice question must have more than 1 option")
                            }
                            let index = 0
                            for (; index < options_length; index++) {
                                let option = options[index]
                                if (option === null || option.trim() === "") {
                                    throw new Error("Multiple Choice option must have a value")
                                }
                            }
                            break
                        default:
                            throw new Error("Content validation failed unexpectedly")
                    }
                }
            }
        },
        answers: {
            type: DataTypes.JSON,
            validate: {
                perTypeValidation(value) {
                    switch(this.type) {
                        case "multiple_choice":
                            if (value.length != content.length) {
                                throw new Error("Multiple choice question must have indication of correctness for each option")
                            }
                            for (answer of Object.values(value)) {
                                if (option === null || option.trim() === "") {
                                    throw new Error("Multiple Choice option must have a value")
                                }
                            }
                            break
                        default:
                            throw new Error("Answers validation failed unexpectedly")
                    }
                }
            }
        }
    })

    return Question
}

/* Question Type Documentation:

    Multiple Choice:

        content: {
            options: {
                1: "",
                2: "",
                3: "",
                4: "",
                ...
            }
        }

        answers: {
            1: false,
            2: true,
            3: false,
            4: false,
            ....
        }


*/