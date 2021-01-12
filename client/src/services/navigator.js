import React, {Component} from 'react';
import history from 'browser-history';

// import { Container } from './styles';

export default class Navigation extends Component {
  
  static To(route){
    if(route){
      return history(route)
    }else{
      return history('/');
    }
  }
  
  
  
  
}

 