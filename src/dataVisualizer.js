/**
 * A module that creates line-, column- and piecharts to visualize data.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/dataVisualizer.js
 * @version 1.0.0
 */

import { ErrorHandler } from './errorHandler.js'
import { ColumnChart } from './chartModules/columnChart.js'
import { LineChart } from './chartModules/lineChart.js'
import { PieChart } from './chartModules/pieChart.js'

export class DataVisualizer {
  #globalOptions
  #errorHandler

  constructor () {
    // Set a standard to use if no options are set.
    this.#globalOptions = {}

    this.#errorHandler = new ErrorHandler()
  }

  /**
   * Sets the global options used when creating charts.
   * Width and heigth are measured in pixels.
   *
   * @param {Object} options - { color: 'blue/green/red/yellow', width: number, height: number }
   */
  setGlobalOptions (options) {
    try {
      if (this.#isOptionsCorrect(options)) {
        this.#globalOptions = options
      }
    } catch (error) {
      this.#errorHandler.consoleError(error)
    }
  }

  #isOptionsCorrect (options) {
    const { color, width, height } = options

    if (!this.#isColorCorrectTypeAndValue(color)) {
      throw this.#errorHandler.createErrorObject('#isOptionsCorrect: That color theme does not exist, choose: blue, green, red or yellow', 400)
    }

    if (!this.#isWidthCorrectTypeAndValue(width)) {
      throw this.#errorHandler.createErrorObject('#isOptionsCorrect: The width is not correctly formatted or missing, please provide a string with integers not starting with 0', 400)
    }

    if (!this.#isHeigthCorrectTypeAndValue(height)) {
      throw this.#errorHandler.createErrorObject('#isOptionsCorrect: The height is not correctly formatted or missing, please provide a string with integers not starting with 0', 400)
    }

    return true
  }

  #isColorCorrectTypeAndValue (color) {
    if (typeof color === 'string' && /blue|green|red|yellow/.test(color)) {
      return true
    } else {
      return false
    }
  }

  #isWidthCorrectTypeAndValue (width) {
    if (typeof width === 'number' && /^[1-9]\d*$/.test(width.toString())) {
      return true
    } else {
      return false
    }
  }

  #isHeigthCorrectTypeAndValue (height) {
    if (typeof height === 'number' && /^[1-9]\d*$/.test(height.toString())) {
      return true
    } else {
      return false
    }
  }

  /**
   * @param {Object} [dataPoints] - Optional. An object containing data points in the format { key: intValue, ... }. Can contain multiple data points in the same object.
   * @returns {LineChart}
   */
  createLineChart (dataPoints) {
    try {
      return this.#createChart('line', dataPoints)
    } catch (error) {
      this.#errorHandler.consoleError(error)
    }
  }

  /**
   * @param {Object} [dataPoints] - Optional. An object containing data points in the format { key: intValue, ... }. Can contain multiple data points in the same object.
   * @returns {ColumnChart}
   */
  createColumnChart (dataPoints) {
    try {
      return this.#createChart('column', dataPoints)
    } catch (error) {
      this.#errorHandler.consoleError(error)
    }
  }

  /**
   * @param {Object} [dataPoints] - Optional. An object containing data points in the format { key: intValue, ... }. Can contain multiple data points in the same object.
   * @returns {PieChart}
   */
  createPieChart (dataPoints) {
    try {
      return this.#createChart('pie', dataPoints)
    } catch (error) {
      this.#errorHandler.consoleError(error)
    }
  }

  #createChart (typeofChart, dataPoints) {
    let chart

    try {
      switch (typeofChart.toLowerCase()) {
        case 'line':
          chart = new LineChart(this.#globalOptions, dataPoints)
          break
        case 'pie':
          chart = new PieChart(this.#globalOptions, dataPoints)
          break
        case 'column':
          chart = new ColumnChart(this.#globalOptions, dataPoints)
          break
        default:
          throw this.#errorHandler.createErrorObject('Chart type does not exist.', 400)
      }

      return chart
    } catch (error) {
      this.#errorHandler.consoleError(error)          
    }
  }
}
