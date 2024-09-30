/**
 * A module that handles errors.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/errorHandler.js
 * @version 1.0.0
 */

export class ErrorHandler {
/**
 * @param {string} message
 * @param {number} errorCode
 * @returns {Error}
 */
  createErrorObject (message, errorCode) {
    const error = new Error()

    if (message && typeof message === 'string') {
      error.message = message
    } else {
      error.message = undefined
    }
    
    if (errorCode && typeof errorCode === 'number') {
      error.status = errorCode
    }

    return error
  }

  /**
   * @param {Error} errorObject
   */
  consoleError (errorObject) {
    const { message, status } = errorObject

    if (message && status) {
      console.error(`MESSAGE: ${message}, STATUS: ${status}`)
    } else if (message) {
      console.error(`MESSAGE: ${message}`)
    } else if (status) {
      console.error(`STATUS: ${status}`)
    } else {
      console.error('There was an undefined error')
    }
  }
}