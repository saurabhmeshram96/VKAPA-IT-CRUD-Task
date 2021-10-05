import React from 'react';
import FormOne from './component/FormOne';
import EditForm from './component/EditForm';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ FormOne}></Route>
          <Route path="/edit/:id" component={EditForm} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
