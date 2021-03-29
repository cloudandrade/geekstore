import React from 'react';
import api from './api';

// import { Container } from './styles';

export function getServerOnline() {
	return api.get();
}

export function loginRequest(email, senha) {
	return api.post('api/auth', { email, senha });
}

export function getAllProdutos() {
	return api.get('api/produtos');
}
