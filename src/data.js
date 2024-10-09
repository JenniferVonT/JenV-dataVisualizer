/**
 * A module that stores and handles data points for charts/graphs.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/data.js
 * @version 1.0.0
 */

import { ErrorHandler } from './errorHandler.js'

export class Data {
  #dataPoints
  #dataPointLimit
  #errorHandler

  constructor () {
    this.#dataPoints = {}
    this.#dataPointLimit = 15
    this.#errorHandler = new ErrorHandler()
  }

  /**
   * @param {Object} dataPoints - An object with key, value (int) pairs representing data points.
   * @throws {Error}
   */
  setMultipleDataPoints(dataPoints) {
      if (!this.#isDataFull(dataPoints)) {
        if (this.#isDataPointsValid(dataPoints)) {
          for (const [ key, value ] of Object.entries(dataPoints)) {
            if (!this.#dataPoints[key]) {
              this.#dataPoints[key] = value
            }
          }
        } else {
          throw this.#errorHandler.createErrorObject('One or more datapoint value(s) is not the correct type, it should be a number.', 400)
        }
      } else {
        throw this.#errorHandler.createErrorObject('To many data points', 400)
      }
  }

  /**
   * @param {str} key
   * @param {int} value 
   * @throws {Error}
   */
  setDataPoint(key, value) {
    if (!this.#isDataFull({ [key]: value })) {
      if (this.#isDataPointsValid({ [key]: value })) {
        this.#dataPoints[key] = value          
      } else {
        throw this.#errorHandler.createErrorObject('One or more datapoint value(s) is not the correct type, it should be a number.', 400)
      }
    } else {
      throw this.#errorHandler.createErrorObject('There is no more room for data', 400)
    }
  }

  /**
   * @returns {Object} { key: value, ... }
   */
  getDataPoints () {
    return this.#dataPoints
  }

  /**
   * @returns {int}
   */
  getMaxDataValue () {
    return Math.max(...Object.values(this.#dataPoints))
  }

  /**
   * @param {String} key
   * @param {Number} value
   * @throws {Error}
   */
  deleteDataPoint (key, value) {
    if (this.#isDataPresent(key, value)) {
      delete this.#dataPoints[key]
    } else {
      throw this.#errorHandler.createErrorObject('The data point does not exist.', 400)
    }
  }

  /**
   * @param {String} key 
   * @param {Number} oldValue
   * @param {Number} newValue 
   */
  updateDataPoint (key, oldValue, newValue) {
    if (this.#isDataPointsValid({ [key]: newValue })) {
      if (this.#isDataPresent(key, oldValue)) {
        this.#dataPoints[key] = newValue
      } else {
        throw this.#errorHandler.createErrorObject('The data point does not exist.', 400)
      }
    } else {
      throw this.#errorHandler.createErrorObject('One or more datapoint value(s) is not the correct type, it should be a number.', 400)
    }
  }

  /**
   * Delete all data points.
   */
  clearChart () {
    this.#dataPoints = {}
  }

  /**
   * @returns {int} - Gets the number of data points saved.
   */
  getAmountOfDataPoints () {
    return Object.keys(this.#dataPoints).length
  }

  #isDataPresent (key, value) {
    const dataPointKey = this.#dataPoints[key]

    if (dataPointKey && dataPointKey === value) {
      return true
    }
    return false
  }

  #isDataFull (dataPoints) {
    const currentDataPointAmount = this.getAmountOfDataPoints()
    const newDataPointAmount = Object.keys(dataPoints).length

    if ((currentDataPointAmount + newDataPointAmount) < this.#dataPointLimit) {
      return false
    } else {
      return true
    }
  }

  #isDataPointsValid (dataPoints) {
    if (!dataPoints || typeof dataPoints !== 'object' || Object.keys(dataPoints).length === 0) {
      return false
    }

    for (const [key, dataPoint] of Object.entries(dataPoints)) {
      if (typeof dataPoint !== 'number') {
        return false
      }
    }

    return true
  }
}
