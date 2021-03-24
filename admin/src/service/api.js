import React from 'react';
import axios from 'axios';

// import { Container } from './styles';

const api = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL,
});

export default api;
