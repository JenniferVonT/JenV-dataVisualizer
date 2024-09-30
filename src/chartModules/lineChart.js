/**
 * A module that creates line charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/lineChart.js
 * @version 1.0.0
 */

import { Chart } from './chart.js'

export class LineChart extends Chart {
  constructor (globalOptions, dataPoints) {
    super(globalOptions, dataPoints) 

    this._canvasElement.classList.add('lineChart')
  }

  _drawChart () {
    try {
      this._drawLineGraph(Object.keys(this._dataPoints).length)
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  _drawLineGraph (amountOfDataPoints) {
    try {
      const chart = this._canvasElement.getContext('2d')
      const theme = this._getTheme()

      const pointSpacing = this._canvasElement.width / amountOfDataPoints
      const maxValue = this._getMaxDataValue() + 20

      chart.strokeStyle = theme.lines || 'black'
      chart.lineWidth = 2

      chart.fillStyle = theme.background
      chart.fillRect(0, 0, this._canvasElement.width, this._canvasElement.height)

      chart.beginPath()

      Object.entries(this._dataPoints).forEach(([ name, data ], index) => {
        const dataPointYPosition = this._canvasElement.height - (data / maxValue) * this._canvasElement.height
        const dataPointXPosition = index * pointSpacing

        chart.fillStyle = theme.lines || 'black'
        chart.textAlign = 'center'
        chart.font = '0.6rem "Roboto", sans-serif'

        const dataTextY = dataPointYPosition - 5

        // Move the line depending on if its the first, middle or last data point.
        // Fill in the data text on the graph aswell depending on position.
        if (index === 0) {
          chart.moveTo(0, dataPointYPosition)

          chart.lineTo(dataPointXPosition, dataPointYPosition)

          chart.fillText(data, (dataPointXPosition + 5), dataTextY)
        } else if (index === Object.keys(this._dataPoints).length - 1) {

          chart.lineTo(dataPointXPosition, dataPointYPosition)
          chart.lineTo(this._canvasElement.width, dataPointYPosition)

          chart.fillText(data, dataPointXPosition, dataTextY)
        } else {
          chart.lineTo(dataPointXPosition, dataPointYPosition)

          chart.fillText(data, dataPointXPosition, dataTextY)
        }
      })

      chart.stroke()
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }
}