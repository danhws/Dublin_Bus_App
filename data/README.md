# Dublin Bus Journey Planner Data Overview

The goal of this project was to produce dynamic and accurate estimates of travel time between stops along a bus route complete route based on historical bus data.

Below is the developmental process which took place.

## Datasets 

The dataset provided to us for this project was Dublin Bus travel data from 2018 in the form of three plain text documents: RT_Leavetimes, RT_Trips and RT_Vehicles. 

An independent breakdown of each file and its features:

RT_Leavetimes - This dataset represents stop to stop information for individual trips throughout the year. It consists of 117 million rows with 18 features, each row corresponding to an individual stop along a specific bus route. 
 
RT_Trips - This dataset contains information for full journeys made throughout the year. There are 2 million rows with 16 features, each row representing data for a single, end-to-end bus journey.

RT_Vehicles - This data represents information regarding the individual buses operating each day during the year. It contains 272,000 rows and 7 features, with each row corresponding to a single bus.

## Cleaned Dataset

Each dataset was investigated and preprocessed individually before being joined to make one large dataset. After cleaning and joining individual datasets, the final dataset contained 8 features. The features are as follows:
- ProgrNumber: Sequential position of stop in the trip
- StopPointID: Unique stop point code
- LineID: Unique line code
- Direction: Route direction
- ActualTime_Dep: Actual departure time of trip, in seconds
- WeekdaysOfService: Day of service
- MonthOfService: Month of service
- TimePassedSince_Dep: Our target feature. How long has passed since the bus started its trip.

For more information on the cleaning process, the data quality report can be found [here](Data_Quality_Report.pdf).

A visualisation tool of the cleaned data in the form of a [Tableau Dashboard](https://public.tableau.com/views/DublinBus_2018/DublinBusTripAnalysis2018?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link) can be found here.

## Modelling

Three different models were used to estimate bus arrival time: Linear Regression, Decision Tree and Random Forest. Data was randomly separated into 70% training and 30% and 10 fold cross validation was performed where the MAE, RMSE and R2 scores were measured. 

Initially, only predictions for the full journey duration were made, which involved using only the RT_Trips dataset. The Random Forest performed the best with an R2 score of 0.621. 

The error metrics improved drastically after stop-to-stop predictions were used with the full, joined dataset instead.

The mean results from 10 fold cross-validation were used to measure the model’s accuracy. Based on a subset of the data whose ‘LINEID’ is 46A and ‘DIRECTION’ is 1, the performance of the three models are summarised below:

|     | LinearReg | Decision Tree | Random Forest |
| --- | --- | --- | --- |
| MAE | 399.0 | 398.0| 176.3 |              
| RMSE | 526.9 | 541.0 | 264.7 |              
| R2 | 0.861 | 0.854 | 0.965 |              

The Random Forest was the most accurate out of each model tested across all datasets. For stop- to-stop modelling, PROGRNUMBER had the most importance (0.863) highlighting that where a stop is along a route makes a large difference in predicting arrival time. 

In order to make a prediction for any stop along a journey, the model needs the time the bus departed its first stop at. In hindsight, this is not the most practical way of making predictions as multiple departure times need to be input, with each estimated arrival time being compared, choosing the closest one to the user’s input time. An alternative may have been to create a new categorical feature that indicates the hour of arrival as opposed to using departure times.

## Pickling

In order for predictions to work quickly with the backend, trained models were compressed and then pickled. Once all the files were pickled, a Python function was developed to take user defined parameters and load the specific pickle file to make predictions.

In order to develop a working application, accuracy was traded for accessibility and so linear regression models were used instead of Random Forest since the file sizes were considerably smaller. 