/**
 * A module that creates pie charts.
 * 
 * @author Jennifer von Trotta-Treyden <jv222th@student.lnu.se>
 * @module src/chartModules/pieChart.js
 * @version 1.0.0
 */

import { Chart } from './chart.js'

export class PieChart extends Chart {
  constructor (globalOptions, dataPoints) {
    super(globalOptions, dataPoints)

    this._canvasElement.classList.add('pieChart')
  }

  _drawChart () {
    try {
      this._drawPieChart()
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }

  _drawPieChart () {
    try {
      const chart = this._canvasElement.getContext('2d')
      const theme = this._getTheme()

      const height = this._canvasElement.height
      const width = this._canvasElement.width

      let shortSide
      let longSide

      if (height > width) {
        longSide = height
        shortSide = width
      } else {
        longSide = width
        shortSide = height
      }


      chart.fillStyle = theme.background
      chart.fillRect(0, 0, width, height)

      const totalSumOfAllData = Object.values(this._dataPoints).reduce((acc, value) => acc + value, 0)
      let startAngle = 0

      Object.entries(this._dataPoints).forEach(([ name, data ], index) => {
        const dataSliceAngle = (data / totalSumOfAllData) * 2 * Math.PI
        const endAngle = startAngle + dataSliceAngle
        const radius = shortSide / 2 - 30
    
        chart.beginPath()
        chart.moveTo(width / 2, height / 2)
        chart.arc((width / 2), (height / 2), radius, startAngle, endAngle)
        chart.closePath()

        // Loop all the colors to fill the data slices with.
        chart.fillStyle = theme.data[index % theme.data.length]
        chart.fill()

        chart.lineWidth = 1
        chart.stroke()

        const angleAtTheCenterOfSlice = (startAngle + endAngle) / 2
        const textPositionX = (width / 2) + radius * Math.cos(angleAtTheCenterOfSlice) * 1.35
        const textPositionY = (height / 2) + radius * Math.sin(angleAtTheCenterOfSlice) * 1.1

        chart.strokeStyle = theme.lines || 'black'
        chart.fillStyle = theme.lines || 'black'
        chart.textAlign = 'center'
        chart.font = '1rem "Roboto", sans-serif'
        chart.fillText(`${name}(${data})`, textPositionX, textPositionY)

        startAngle = endAngle
      })
    } catch (error) {
      this._errorHandler.consoleError(error)
    }
  }
}