/**
 * A module that sets the parent class for the creation of charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/chart.js
 * @version 1.0.0
 */

import { ErrorHandler } from '../errorHandler.js'

export class Chart {
  _errorHandler
  _dataPoints
  _globalOptions
  _canvasElement
  #dataPointLimit
  #colorThemes
  #maxHeightAndWidth
  #minHeightAndWidth

  /**
   * @param {Object} globalOptions { color: 'red/green/blue/yellow', width: int, height: int }
   * @param {Object} dataPoints { key: value, key: value, ... }
   */
  constructor (globalOptions, dataPoints) {

    this._errorHandler = new ErrorHandler()
    this._dataPoints = {}
    this._globalOptions = { color: 'blue', width: '300', height: '200' }
    this._canvasElement = document.createElement('canvas')

    this.#dataPointLimit = 15
    this.#colorThemes = {}
    this.#maxHeightAndWidth = 2000
    this.#minHeightAndWidth = 20

    this.#createColorThemes()
    this.#saveGlobalOptions(globalOptions)
    this.#saveDataPoints(dataPoints)
    this.#buildChart()
  }

  #buildChart() {
    try {
      this.#insertWidthAndHeight()
      this.#clearCanvasContext()

      if (Object.keys(this._dataPoints).length !== 0) {
        this._drawChart()
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #saveDataPoints (dataPoints) {
    try {
      if (this.#isDataPointsValid(dataPoints)) {
        this._dataPoints = dataPoints
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #isDataPointsValid (dataPoints) {
    if (!dataPoints || typeof dataPoints !== 'object' || Object.keys(dataPoints).length === 0) {
      return false
    }

    for (const [key, dataPoint] of Object.entries(dataPoints)) {
      if (typeof dataPoint !== 'number') {
        throw this._errorHandler.createErrorObject('#isDataPointsValid: One or more datapoint value(s) is not the correct type, it should be a number.', 400)
      }
    }

    const currentDataPointAmount = Object.keys(this._dataPoints).length
    const newDataPointAmount = Object.keys(dataPoints).length
    if ((currentDataPointAmount + newDataPointAmount) > this.#dataPointLimit) {
      return false
    }

    return true
  }

  #saveGlobalOptions (options) {
    if(this.#isOptionsValid(options))  {
      if (options.color) {
        this._globalOptions.color = options.color
      }
      if (options.width) {
        this._globalOptions.width = options.width
      }
      if (options.height) {
        this._globalOptions.height = options.height
      }
    }
  }

  #isOptionsValid (options) {
    const validOptions = ['color', 'width', 'height']
    let validState = false
  
    if (typeof options !== 'object' || options === null) {
      return validState
    }

    for (const [option, value] of Object.entries(options)) {
      if (!validOptions.includes(option)) {
        return validState
      }

      switch (option) {
        case 'color':
          if (this.#isColorValidType(value)) { validState = true }
          break
        case 'width':
          if (this.#isHeightOrWidthValid(value)) { validState = true }
          break
        case 'height':
          if (this.#isHeightOrWidthValid(value)) { validState = true }
          break
        default:
          break
      }
    }

    return validState
  }

  /**
   * @param {String} color
   */
  setColorTheme (color) {
    try {
      if (this.#isColorValidType(color)) {
        this._globalOptions.color = color

        this.#updateChart()
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #isColorValidType (color) {
    if (typeof color === 'string' && /blue|green|red|yellow/.test(color)) {
      return true
    } else {
      throw this._errorHandler.createErrorObject('#isColorValidType: That color theme does not exist, choose: blue, green, red or yellow', 400)
    }
  }

  /**
   * @param {String} key 
   * @param {Number} value 
   */
  insertDataPoint (key, value) {
    try {
      if (!this.#isDataFull()) {
        if (this.#isDataPointsValid({ [key]: value }))
          this._dataPoints[key] = value

          this.#updateChart()
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  /**
   * @param {String} key 
   * @param {Number} oldValue
   * @param {Number} newValue 
   */
  updateDataPoint (key, oldValue, newValue) {
    try {
      if (this.#isDataPointsValid({ [key]: newValue })) {
        if (this.#isDataPresent(key, oldValue)) {
          this._dataPoints[key] = newValue

          this.#updateChart()
        }
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #isDataFull () {
    if (Object.keys(this._dataPoints).length < this.#dataPointLimit) {
      return false
    } else {
      return true
    }
  }

  #isDataPresent (key, value) {
    const dataPointKey = this._dataPoints[key]

    if (dataPointKey && dataPointKey === value) {
      return true
    }
    return false
  }

  /**
   * @param {String} key
   * @param {Number} value
   */
  deleteDataPoint (key, value) {
    try {
      if (this.#isDataPresent(key, value)) {
       delete this._dataPoints[key]

       this.#updateChart()
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  /**
   * @param {Number} height - pixels.
   */
  setHeightTo (height) {
    if (this.#isHeightOrWidthValid(height)) {
      this._globalOptions.height = height

      this.#insertWidthAndHeight()
      this.#updateChart()
    }
  }

  /**
   * @param {Number} width - pixels.
   */
  setWidthTo (width) {
    if (this.#isHeightOrWidthValid(width)) {
      this._globalOptions.width = width

      this.#insertWidthAndHeight()
      this.#updateChart()
    }
  }

  #isHeightOrWidthValid (value) {
    if (typeof value === 'number' && value >= this.#minHeightAndWidth && value <= this.#maxHeightAndWidth) {
      return true
    }
    return false
  }

  clearChart () {
    this._dataPoints = {}

    this.#updateChart()
  }

  /**
   * @returns {HTMLCanvasElement}
   */
  getCanvasElement () {
    return this._canvasElement
  }

  /**
   * @returns {Object}
   */
  getDataPoints () {
    return this._dataPoints
  }

  #clearCanvasContext () {
    const canvasContext = this._canvasElement.getContext('2d')

    if (canvasContext) {
      canvasContext.clearRect(0, 0, this._canvasElement.width, this._canvasElement.height)
    } else {
      throw this._errorHandler.createErrorObject('Unable to get the canvas element context ', 500)
    }
  }

  #updateChart() {
    try {
      this.#clearCanvasContext()
      this._drawChart()
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #insertWidthAndHeight () {
    if (this._globalOptions.height) {
      this._canvasElement.height = this._globalOptions.height
    }

    if (this._globalOptions.width) {
      this._canvasElement.width = this._globalOptions.width
    }
  }

  #createColorThemes() {
    this.#colorThemes = { 
      blue: {
        background: '#cddaff',
        lines: '#002184',
        data: [ '#8ca8ff', '#4d79ff', '#3b6bff', '#3163ff', '#0f4aff', '#1c2fff' ]
      },
      green: {
        background: '#ddffdb',
        lines: '#033700',
        data: [ '#078500', '#0ab400', '#0ef400', '#37ff2b', '#6cff64', '#9dff97' ]
      },
      red: {
        background: '#ffeaed',
        lines: '#56000c',
        data: [ '#ad0019', '#e10020', '#ff0f31', '#ff4e68', '#ff7488', '#ffa5b2' ]
     },
      yellow: {
        background: '#fffff4',
        lines: '#464600',
        data: [ '#969600', '#cece00', '#ffff05', '#ffff34', '#ffff6f', '#ffffa3' ]
      }
    }
  }

  _getMaxDataValue () {
    return Math.max(...Object.values(this._dataPoints))
  }

  _getTheme () {
    return this.#colorThemes[this._globalOptions.color]
  }

  _drawChart () { /* Overridden in sub classes (unique to each type of chart) */}
}