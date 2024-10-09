/**
 * A module that sets the parent class for the creation of charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/chart.js
 * @version 1.0.0
 */

import { ErrorHandler } from '../errorHandler.js'
import { ColorTheme } from '../colorTheme.js'
import { Data } from '../data.js'

export class Chart {
  _errorHandler
  _data
  _globalOptions
  _canvasElement
  #colorTheme
  #maxHeightAndWidth
  #minHeightAndWidth

  /**
   * @param {Object} globalOptions { color: 'red/green/blue/yellow', width: int, height: int }
   * @param {Object} dataPoints { key: value, key: value, ... }
   */
  constructor (globalOptions, dataPoints) {

    this._errorHandler = new ErrorHandler()
    this._data = new Data()
    this._globalOptions = { color: 'blue', width: '300', height: '200' }
    this._canvasElement = document.createElement('canvas')

    this.#colorTheme = new ColorTheme()
    this.#colorTheme.setColorTheme(this._globalOptions.color)
    this.#maxHeightAndWidth = 2000
    this.#minHeightAndWidth = 20

    if (globalOptions && Object.keys(globalOptions).length > 0) {
      this.#saveGlobalOptions(globalOptions)
    }
    if (dataPoints) {
      this.#saveDataPoints(dataPoints)
    }
    this.#buildChart()
  }

  #buildChart() {
    try {
      this.#insertWidthAndHeight()
      this.#clearCanvasContext()

      if (Object.keys(this._data.getDataPoints()).length !== 0) {
        this._drawChart()
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #saveDataPoints (dataPoints) {
    try {
      this._data.setMultipleDataPoints(dataPoints)
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #saveGlobalOptions (options) {
    try {
      if(this.#isOptionsValid(options))  {
        if (this.#colorTheme.isColorValidType(options.color)) {
          this._globalOptions.color = options.color
          this.#colorTheme.setColorTheme(options.color)
        }
        if (this.#isHeightOrWidthValid(options.width)) {
          this._globalOptions.width = options.width
        }
        if (this.#isHeightOrWidthValid(options.height)) {
          this._globalOptions.height = options.height
        }
      }
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  #isOptionsValid (options) {
    const validOptions = ['color', 'width', 'height']
    let validState = true
  
    if (typeof options !== 'object' || options === null) {
      validState = false
    }

    for (const [option, value] of Object.entries(options)) {
      if (!validOptions.includes(option)) {
        validState = false
      }
    }

    return validState
  }

  /**
   * @param {String} color
   */
  setColorTheme (color) {
    try {
      this.#colorTheme.setColorTheme(color)
      this._globalOptions.color = color

      this.#updateChart()
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  /**
   * @param {String} key 
   * @param {Number} value 
   */
  insertDataPoint (key, value) {
    try {
      this._data.setDataPoint(key, value)
      this.#updateChart()
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
      this._data.updateDataPoint(key, oldValue, newValue)
      this.#updateChart()
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }


  /**
   * @param {String} key
   * @param {Number} value
   */
  deleteDataPoint (key, value) {
    try {
      this._data.deleteDataPoint(key, value)
      this.#updateChart()
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
    this._data.clearChart()

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
    return this._data.getDataPoints()
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

  _getMaxDataValue () {
    return this._data.getMaxDataValue()
  }

  _getTheme () {
    return this.#colorTheme
  }

  _drawChart () { /* Overridden in sub classes (unique to each type of chart) */}
}