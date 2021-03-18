import React from 'react';

export function ensureAuthenticated() {
	if (localStorage.getItem('token')) {
		return true;
	} else {
		return false;
	}
}

export const destroySession = async () => {
	localStorage.removeItem('token');
};
