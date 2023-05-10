# Dublin Bus Journey Planner Data Overview

In order to make a prediction for any stop along a journey, the model needs the time the bus departed its first stop at. In hindsight, this is not the most practical way of making predictions as multiple departure times need to be input, with each estimated arrival time being compared, choosing the closest one to the user’s input time. An alternative may have been to create a new categorical feature that indicates the hour of arrival as opposed to using departure times.

## Datasets 

The dataset provided to us for this project was Dublin Bus travel data from 2018 in the form of three plain text documents: RT Leavetimes, RT Trips and RT Vehicles. Below is an independent breakdown of each file and its features, giving an overview of the data, while outlining data quality issues found and how they were addressed.

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

For more information the data quality report can be found [here](Data_Quality_Report.pdf).

## Modelling

Three different models were used to estimate bus arrival time: Linear Regression, Decision Tree and Random Forest. Data was randomly separated into 70% training and 30% and 10 fold cross validation was performed where the MAE, RMSE and R2 scores were measured. Initially, only predictions for the full journey duration were made, which involved using only the RT_Trips dataset. The Random Forest performed the best with an R2 score of 0.621. This was unsatisfactory and so Stop-to-stop predictions using each model were then made using the full, joined dataset, which meant using sub samples of the data based on route name and direction. The results mirrored those of full journey predictions in that Random Forest performed the best, however the error metrics improved drastically. 

The mean results from 10 fold cross-validation were used to measure the model’s accuracy. Based on a subset of the data whose ‘LINEID’ is 46A and ‘DIRECTION’ is 1, the performance of the three models are summarised below:
-----|------------|--------------|--------------|
     | LinearReg  |Decision Tree | Random Forest|
-----|------------|--------------|--------------|
MAE  |  399.0     | 398.0        |  176.3       |              
-----|------------|--------------|--------------|
RMSE |  526.9     | 541.0        |  264.7       |              
-----|------------|--------------|--------------|
R2   |  0.861     | 0.854        |  0.965       |              
-----|------------|--------------|--------------|

The Random Forest was the most accurate out of each model tested across all datasets. For stop- to-stop modelling, PROGRNUMBER had the most importance (0.863) highlighting that where a stop is along a route makes a large difference in predicting arrival time. However, users may be more likely to know the stop number of their desired location rather than where that stop falls along a bus route, and so it could be considered impractical to ask the user to input a stop’s sequence number to make a prediction. To combat this, a JSON object was made containing a list of each stop number along every route, paired to its sequence number along that route. This made it easy for the user to input a stop number and look up the PROGRNUMBER for the model. The drawback to this is that bus routes change over time and stops would need to be updated regularly.

## Pickling

In order for predictions to work quickly with the backend, trained models were pickled. At first, joblib.dumps() was used to pickle each trained model to the disk, which resulted in all files taking up 109GB of storage space (This was before hyperparameter tuning and 100 estimators were used). This was quite large so in an effort to reduce the size the pickle.dumps() function was used instead, serialising a trained RF model for each direction for each bus route, which was then optimised using pickletools.optimize(). This removed unused opcodes within the pickle file, reducing the storage space and improving unpickling efficiency. From here, the gzip module was used to further compress the file and save it. This resulted in a smaller overall size of 26GB (After hyperparameter tuning with 32 estimators). Once all the files were pickled, a Python function was developed to take user defined parameters and load the specific pickle file to make predictions.

Despite the reduction in pickle file size (due to hyperparameter tuning, pickletools, file compres- sion), files were still too large to be hosted on the virtual machine, which only had 5GB. In order to develop a working application, accuracy was traded for accessibility and so linear regression models were used instead of RF. While less accurate than RF, the file sizes were considerably smaller, totaling 189KB. Given the chance to further develop this application into a professional service, more memory would be purchased in order to use RF to make better predictions.