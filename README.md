# Dublin Bus Journey Planner App


This project involves analysing historic Dublin Bus data and weather data in order to create dynamic travel time estimates. Based on data analysis of historic Dublin Bus data, a system which when presented with any bus route, departure time, the day of the week, current weather condition, produces an accurate estimate of travel time for the complete route and sections of the route.

Users should be able to interact with the system via a web-based interface which is optimised for mobile devices. When presented with any bus route, an origin stop and a destination stop, a time, a day of the week, current weather, the system should produce and display via the interface an accurate estimate of travel time for the selected journey.

Information on the data used for this project can be found [here](data/README.md).

## Features

### Journey Planner

The journey planner feature provides dynamic travel time estimates for the next seven days. 

![Journey Planner](frontend/src/data/Journey_Planner.gif)

### Stops Search

The stops search feature aims to provide real-time information about buses that will arrive at a selected stop within the next hour, including line names, arrival times, and delays. In addition to selecting stops through the combo box, users can also select stops by clicking the stop icon on the map.

![Stops Search](frontend/src/data/Stop_Search.gif)

### Lines Search

The lines search feature aims to provide stop names and stop sequences in a selected bus line. And also the selected line and the stops in it will be displayed on the map

![Lines Search](frontend/src/data/Line_Search.gif)

### Explore Nearby

The explore nearby feature can provide information about restaurants, hotels, and attractions near the user's current location. The blue location icon represents the user's current location on the map. Users can filter and display them by star rating. The display on the map will change according to the user's operation, and the user can also select the restaurant or hotel, or attraction they want to view through the map.

![Explore Nearby](frontend/src/data/Explore_Nearby.gif)

### Weather Forecast

The weather forecast feature can provide weather information for today and the next four days 

![Weather Forecast](frontend/src/data/Weather_Forecast.jpg)

### Feedback

The feedback feature allows users to give the operator  feedback on their experience of using this app and their suggestions for its improvement. After the user fills in the form and clicks submit, the authors will receive the corresponding feedback email as an alert and all the feedback is available on getform.io website.

![Feedback](frontend/src/data/Feedback.jpg)

### News about Dublin Bus

The news feature can provide news about Dublin Bus using google search and Twitter.

![News about Dublin Bus](frontend/src/data/News.png)

### Built With
- [React](https://react.dev/)
- [Django](https://www.djangoproject.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind_CSS](https://tailwindcss.com/)
- [Jupyter_Notebooks](https://jupyter.org/)

### Contributors
- <b>Marcus West</b> - Coordination Lead, Database
- <b>Daniel Howes</b> - Data Analytics, Machine Learning
- <b>Zhilin Yang</b> - Frontend
- <b>Mengxin Zhong</b> - Backend

