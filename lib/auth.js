const jwt_utils = require('./jwt_utils')
const { serialize } = require('cookie')
const db = require('../app/models')
const { logger } = require('./logger')
const moment = require('moment')
const string_helpers = require('./string_helpers')
const { ValidationError } = require('sequelize')

const generateUserAuthToken = (user) => {
    const payload = {
        sub: user.id
    }
    // TODO: incorporate account locking and other user-model information checking in this method (email confirmation, failed login attempts, etc)
    return jwt_utils.encode(payload)
}

const setUserAuthCookie = async (res, user) => {
    const userSession = await generateUserSession(user)
    res.setHeader("Set-Cookie", [
        serialize("_myclassroom_session", generateUserAuthToken(user), {
            path: "/",
            httpOnly: true, //this means that the cookie is only accessible to the server and sent along in reequests. The client side has no direct access to it
            expires: new Date(Date.now() + 1000 * 60 * 60 * 12) //expires in 12 hours
        }),
        serialize("XSRF-TOKEN", userSession.csrfToken, { //protect from CSRF by giving the client a token that can be accessed and attached in request headers for checking
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 12) //expires in 12 hours
        })
    ])
}
exports.setUserAuthCookie = setUserAuthCookie

const removeUserAuthCookie = async (req, res) => {
    await db.Session.update({ expires: moment().utc()}, { where: { csrfToken: extractCsrfToken(req) }})
    res.setHeader("Set-Cookie", [
        serialize("_myclassroom_session", "", {
            path: "/",
            httpOnly: true
        }),
        serialize("XSRF-TOKEN", "", {
            path: "/"
        })
    ])
}
exports.removeUserAuthCookie = removeUserAuthCookie

async function requireAuthentication(req, res, next) {
    const token = extractToken(req)
    const csrfToken = extractCsrfToken(req)
    try {
        const payload = jwt_utils.decode(token)
        const session = await validateCsrfToken(csrfToken, payload.sub)
        req.payload = payload
        await session.update({ expires: moment().add(4, 'H').utc() })
        next()
    } catch (err) {
        logger.error(err)
        res.status(401).send({
            err: "Invalid authentication token"
        })
    }
}
exports.requireAuthentication = requireAuthentication

const extractToken = (req) => {
    return req.cookies["_myclassroom_session"]
}
exports.extractToken = extractToken

const extractCsrfToken = (req) => {
    return req.headers["x-xsrf-token"] || req.headers["X-XSRF-TOKEN"]
}

const validateCsrfToken = async (token, userId) => {
    const session = await db.Session.findOne({ where: { csrfToken: token } })
    if (session == null) {
        logger.error(`XSRF token unauthenticated, token: ${token}`)
        throw new Error("csrf token unauthenticated")
    }
    else {
        logger.error(`valid session found: ${session.csrfToken}, expires: ${session.expires}, id: ${session.id}`)
        const expired = session.checkIfExpired()
        if (expired) {
            logger.error("User tried to use an expired session")
            throw new Error("user session expired")
        }
        else {
            if (session.userId != userId) {
                logger.error(`Authenticated user and user session somehow didn't match, session.userId: ${session.userId}, userId: ${userId}`)
                throw new Error("user session and login do not match")
            }
            return session
        }
    }
}

const generateUserSession = async (user) => {
    try {
        // TODO: expire the most recent one
        await db.Session.update({ expires: moment().utc() }, { where: { userId: user.id } })
        const session = await db.Session.create({
            userId: user.id
        })
        return session
    }
    catch (e) {
        logger.error(`user session creation unexpectedly failed for user: ${user.id}`)
        if (e instanceof ValidationError) {
            logger.error(string_helpers.serializeSequelizeErrors(e))
        }
        else {
            logger.error(e)
        }
        throw new Error("Unable to create user session")
    }
}
exports.generateUserSession = generateUserSession