library(datasets)

# Use a fluid Bootstrap layout
fluidPage(theme="d3style.css",
  
  # Give the page a title
  titlePanel("Telephones by region"),
  
  # Generate a row with a sidebar
  sidebarLayout(      
    
    # Define the sidebar with one input
    sidebarPanel(
      selectInput("region", "Region:", 
                  choices=colnames(WorldPhones)),
      hr(),
      helpText("Data from AT&T (1961) The World's Telephones.")
    ),
    
    # Create a spot for the barplot
    mainPanel(
      tags$head(tags$script(src="https://d3js.org/d3.v5.min.js")),
      tags$script(src="d3js.js"),
      plotOutput("D3Plot")
    )
    
  )
)