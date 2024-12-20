# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Instructions to run

- Clone the repo down to your machine.
- If using yarn, run `yarn` and `yarn start`
- If using npm, run `npm i` and `npm start`
- It should either automatically bring up the app in a tab in your default browser, or you can manually navigate to [localhost:3000](http://localhost:3000/)

### Deveoper Notes

- I chose to use create-react-app as I find it reasonably good for small proof-of-concepts or to play around with some react code.
- I chose to add material to the project - I appreciate I am not graded on design, however I am comfortable with the components from the library and I feel it makes it easier to interact and use the app.
- I have kept testing fairly minimal. I generally believe in the 'Trophy' testing approach detailed by Kent C Dodds, and I believe my small tests show examples of that.
- I went for a column approach as opposed to a horizontal approach as it is simpler to map to desktop and mobile.

#### Convert API 500 error

![500 Error](image.png)

Whilst developing the application, I was attempting to get the /v1/convert API to return, having provided it with the parameters expected in the api documentation.

The server returned a 500 error, which according to the documentation is out-with my control to fix. Due to this, I was not able to get the latter half the of the expected requirements done.

#### Improvements:

- Loading state for the convert button - as with any API call, there is a chance the user will not have great connection, the application should display some form of loading while the API call is being made.
- Change the state management to useReducer instead of multiple useStates. As a general rule, when you have multiple useStates, I find that the state code becomes bloated, switching to useReducer helps simplify the state and makes the code more readable (in my opinion)
- I have done some preparation work for errors, however they are relatively basic. The user should be informed especially in the case of API failures, and be presented with an appropriate error message.
- As noted above, the project is linier in a column. One potential improvement for desktop would be to have the components horizontal, with the From select and From Amount together, and the To select and To output together.
