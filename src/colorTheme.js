/**
 * A module that stores and handles different color themes.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/colorTheme.js
 * @version 1.0.0
 */

import { ErrorHandler } from "./errorHandler"

export class ColorTheme {
  #currentColorTheme
  #colorThemes
  #errorHandler

  constructor () {
    this.#currentColorTheme = 'blue'
    this.#errorHandler = new ErrorHandler()

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

  isColorValidType (color) {
    if (typeof color === 'string' && /blue|green|red|yellow/.test(color)) {
      return true
    } else {
      return false
    }
  }

  /**
   * @param {string} color
   */
  setColorTheme (color) {
    if (this.isColorValidType(color)) {
      this.#currentColorTheme = color
    } else {
      throw this.#errorHandler.createErrorObject('That color is not valid, valid colors are: blue, green, red and yellow', 400)
    }
  }

  /**
   * @returns {Object} - The object containing all colors in the current theme.
   */
  getColorTheme () {
    return this.#colorThemes[this.#currentColorTheme]
  }

  /**
   * @returns {string} - The hex code for the current background color.
   */
  getCurrentBackgroundColor () {
    return this.#colorThemes[this.#currentColorTheme].background
  }

  /**
   * @returns {string} - The hex code for the current line color.
   */
  getCurrentLineColor () {
    return this.#colorThemes[this.#currentColorTheme].lines
  }

  /**
   * @returns {string[]} - An array of hex codes for data colors.
   */
  getCurrentDataColors () {
    return this.#colorThemes[this.#currentColorTheme].data
  }
}
