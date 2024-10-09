/**
 * A module that creates column charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/columnChart.js
 * @version 1.0.0
 */

import { Chart } from './chart.js'

export class ColumnChart extends Chart {
  constructor (globalOptions, dataPoints) {
    super(globalOptions, dataPoints)

    this._canvasElement.classList.add('columnChart')
  }

  _drawChart () {
    try {
      const chart = this._canvasElement.getContext('2d')
      const theme = this._getTheme()

      chart.fillStyle = theme.getCurrentBackgroundColor()
      chart.fillRect(0, 0, this._canvasElement.width, this._canvasElement.height)

      const amountOfColumns = this._data.getAmountOfDataPoints()
      this._drawColumns(amountOfColumns)
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  _drawColumns (amountOfColumns) {
    try {
      const chart = this._canvasElement.getContext('2d')
      const theme = this._getTheme()

      const columnWidth = this._canvasElement.width / amountOfColumns
      const maxValue = this._getMaxDataValue() + 5

      const dataPoints = this._data.getDataPoints()

      Object.entries(dataPoints).forEach(([ name, data ], index) => {
        const columnHeight = (data / maxValue) * this._canvasElement.height
        const position = index * columnWidth

        // Cycle through all the data colors in the theme.
        const dataColors = theme.getCurrentDataColors()
        chart.fillStyle = dataColors[index % dataColors.length]

        // Draw the column.
        chart.fillRect(position, this._canvasElement.height - columnHeight, columnWidth - 1, columnHeight)

        chart.fillStyle = theme.getCurrentLineColor() || 'black'
        chart.textAlign = 'center'
        chart.font = '"Roboto", sans-serif'

        const dataTextX = position + columnWidth / 2
        const dataTextY = this._canvasElement.height - columnHeight + 10

        chart.fillText(data, dataTextX, dataTextY)

        const nameTextX = position + columnWidth / 2
        const nameTextY = this._canvasElement.height - 3

        chart.fillText(name, nameTextX, nameTextY)
      }) 
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }
}