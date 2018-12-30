import React from 'react';
import './App.scss';
import Header from './components/Header';
import FormContainer from './components/FormContainer';
import Footer from './components/Footer';

const App = () => (
  <div className="App container">
    <Header/>
    <FormContainer/>
    <Footer/>
  </div>
) 

export default App;
