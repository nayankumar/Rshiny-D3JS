library(datasets)
WorldPhones = data.frame(WorldPhones)
WorldPhones$Year = rownames(WorldPhones)

# Define a server for the Shiny app
function(input, output,session) {
    
  observe({
    
	# here type = 'phonedata' will be used in /www/d3js.js file in Shiny.addCustomMessageHandler argument
	# session$sendCustomMessage will be used to send the data to /www/d3js.js file
    session$sendCustomMessage(type='phonedata', jsonlite::toJSON(data.frame(cbind("Year"=WorldPhones[,"Year"],"Country"=WorldPhones[,input$region]))))
    
  })
  
}