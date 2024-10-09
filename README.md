# DataVisualizer

A Module for JavaScript on the client side.

This module can create three different customizable charts to visualize your data by creating and manipulating a `<canvas>` element. Making it easy to quickly present your data on your site using client side JavaScript.

#### The charts that you can currently create are:
- line charts
- column charts / bar graphs
- pie charts

#### Dependencies
No dependencies except default built in node functions.
*During dev testing there is dependencies to vite and jest but these are not neccessary in production.*

This is a project specifically created for the course `1DV610 - Intro to software quality` at the Linnaeus University (Sweden) which means I cannot guarantee that this module will be updated in the future.

#### Quick example
```javascript
    // Create an instance of the DataVisualizer class.
    const dataVisualizer = new DataVisualizer()

    // The default options are "color: 'blue', width: '300', height: '200'"
    // This sets the default height and width of the canvas element to 450x450 pixels and the color theme to red.
    dataVisualizer.setGlobalOptions({ color: 'red', width: 450, height: 450 })

    // Create a column chart, inserting data points at this stage is optional (can be inserted after aswell).
    const dataPoints = { one: 5, two: 10, three: 15, four: 20, five: 40, six: 22 }
    const columnChart = dataVisualizer.createColumnChart(dataPoints)

    // Get the canvas element...
    const canvasElement = columnChart.getCanvasElement()

    // ... and insert it into the DOM.
    document.querySelector('body').append(canvasElement)
```
The code example creates this:

![columnChartExample](https://github.com/JenniferVonT/JenV-dataVisualizer/blob/main/img/columnChartExample.PNG)

## Installation
### npm
```
npm install @jenvont/datavisualizer
```

### yarn
```
yarn add @jenvont/datavisualizer
```

Once the package is installed you can import it using `import` (ES Modules) statement:

```
import DataVisualizer from '@jenvont/datavisualizer'
```

## Documentation
### Visual examples - colors
Here are examples of all the color themes available at the moment for all three types of charts.
![LineChartExamples](https://github.com/JenniferVonT/JenV-dataVisualizer/blob/main/img/colorThemeLineExamples.PNG)
![ColumnChartExamples](https://github.com/JenniferVonT/JenV-dataVisualizer/blob/main/img/colorThemeColumnExamples.PNG)
![PieChartExamples](https://github.com/JenniferVonT/JenV-dataVisualizer/blob/main/img/colorThemePieExample.PNG)

### - setGlobalOptions(obj)
Sets the default options for all the canvas elements created, if nothing is set the default is "color: 'blue', width: '300', height: '200'".

**Input**: {Object} - { color: string, width: int, height: int }
```javascript
    const dataVisualizer = new DataVisualizer()

    dataVisualizer.setGlobalOptions({ color: 'red', width: 450 height: 450 })
```


### - createLineChart(obj:optional) 
### - createColumnChart(obj:optional)
### - createPieChart(obj:optional)
Creates the different types of charts. You can supply all of your data points or not (you can add data points after aswell)

**Input (*optional*)**: {Object} - { key: int, key: int... }
```javascript
    const dataVisualizer = new DataVisualizer()

    // Creates a line chart and pie chart object without any data points (empty).  
    const lineChart = dataVisualizer.createLineChart()
    const pieChart = dataVisualizer.createPieChart()

    // Creates a column chart object with data points to display.
    const dataPoints = { one: 5, two: 10, three: 15, four: 20, five: 40, six: 22 }
    const columnChart = dataVisualizer.createColumnChart(dataPoints)
```


### - setColorTheme
Sets the color theme of the chart after it has been created. default: 'blue'.

**Input**: {String} - red, green, blue or yellow
```javascript
    // Create a chart.
    const dataVisualizer = new DataVisualizer()
    const pieChart = dataVisualizer.createPieChart()

    pieChart.setColorTheme('red')
    pieChart.setColorTheme('green')
    pieChart.setColorTheme('blue')
    pieChart.setColorTheme('yellow')
```


### - insertDataPoint(key, int)
Inserts a data point into the chart.

**Input**: {String, Number} - The data label and value.
```javascript
    // Create a chart.
    const dataVisualizer = new DataVisualizer()
    const lineChart = dataVisualizer.createLineChart()

    lineChart.insertDataPoint('profit', 350)
```


### - updateDataPoint(key, int, int)
Updates an existing data point.
**Input**: {String, Number, Number} - The data label, old value and the new value to change to.

```javascript
    // Create a chart.
    const dataVisualizer = new DataVisualizer()
    const columnChart = dataVisualizer.createColumnChart({ one: 5, two: 10, three: 15 })

    // Change the data point { one: 5 } into { one: 20 }.
    columnChart.updateDataPoint('one', 5, 20) // => { one: 20, two: 10, three: 15 }
```

### - deleteDataPoint(key, int)
Deletes an existing data point.

**Input**: {String, Number} - The data label and value.

```javascript
    // Create a chart.
    const dataVisualizer = new DataVisualizer()
    const columnChart = dataVisualizer.createColumnChart({ one: 5, two: 10, three: 15 })

    // Delete the data point 'one' with a value of 20.
    columnChart.deleteDataPoint('one', 20)
```

### - setHeightTo(int)
### - setWidthTo(int)
Sets the height and width of the canvas element. Default is: height=200, width=300.

**Input**: {Number} - The height/width in pixels.

```javascript
    // Create a chart.
    const dataVisualizer = new DataVisualizer()
    const pieChart = dataVisualizer.createPieChart()

    // Sets the dimensions of the canvas element to 350x350 pixels.
    pieChart.setHeightTo(350)
    pieChart.setWidthTo(350)
```

### - clearChart()
Removes all the data points inserted into the chart.

**Input**: -

```javascript
    // Create a chart.
    const dataVisualizer = new DataVisualizer()
    const columnChart = dataVisualizer.createColumnChart({ one: 5, two: 10, three: 15 })

    // Removes all the data points in the chart.
    columnChart.clearChart()
```

### - getCanvasElement()
Returns the HTMLCanvasElement from the chart object.

**Input**: -

```javascript
    // Create a chart.
    const dataVisualizer = new DataVisualizer()
    const lineChart = dataVisualizer.createLineChart()

    // Extract the canvas element from the chart object.
    const canvasElement = lineChart.getCanvasElement()

    // It can then be inserted into the DOM.
    document.querySelector('body').append(canvasElement)
```

### - getDataPoints()
Returns all the data points currently in the chart object

**Input**: -
**OutPut** - {Object}

```javascript
    // Create a chart.
    const dataVisualizer = new DataVisualizer()
    const columnChart = dataVisualizer.createColumnChart({ one: 5, two: 10, three: 15 })

    const dataPoints = columnChart.getDataPoints()

    console.log(dataPoints) // =>  { one: 5, two: 10, three: 15 }
```

## Contributions / Bugreport

To contribute to this project and to view both the test report and issues visit the github page [HERE](https://github.com/JenniferVonT/JenV-dataVisualizer). Read down below exactly how you can contribute.

The tests for this project is not included in this repo but the dependencies I have used are jest for automated testing and vite to run a local server to test the module in the browser.

I do not have an automated code standard in this project, but I have followed examples from the book "Clean Code: a handbook of agile software craftmanship" by Robert C. Martin (2009) as instructed in my course. Here are some examples to follow:

- Private methods do not need any JSDOC (create a descriptive name instead, if that's not possible JSDOC is ok), public methods need JSDOC though for easier usability (with @input and @return types).
- Try to use descriptive variable names instead of commenting obscure names (so no variable names like `let x = 42`) and try to avoid magic numbers (for example `if (x > 100) { ... }` rather make '100' a variable that describes what it is `const maxAmountOfDataPoints = 100`. 
- Do not be afraid of long names! Rather a long name than an obscure/hard to interpret name. 
- Try to follow the "does one thing" rule. One function does one thing, refactor into multiple functions if is is not possible to do one thing.

### To contribute
```
- Fork the repository.
- Make your changes locally and push them to your forked repo.
- Create a pull request where you specify what you have done and why.
```
It needs to be testet, be it automated or manual so include a test report in your pull request form. **DO NOT** include the test files or dependencies in the actual pull request (I do not want them inside this repo, the gitIgnore file already includes any coverage dirs).

### Structure
Here is a class diagram of the module to easier understand how the different classes interact with eachother.

![ClassDiagram](https://github.com/JenniferVonT/JenV-dataVisualizer/blob/main/img/1DV610_L2_ClassDiagram.png)

LICENSE: MIT