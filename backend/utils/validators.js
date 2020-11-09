module.exports.validateRegisterInput = (
	username,
	email,
	password,
	confirmPassword
) => {
	const errors = {};

	if (username && username.trim() === '') {
		errors.username = 'Username must not be empty';
	}

	if (email && email.trim() === '') {
		errors.email = 'Email must not be empty';
	} else {
		const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
		if (email && !email.match(regEx)) {
			errors.email = 'Email must be a valid email address';
		}
	}

	if (password && password === '') {
		errors.password = 'Password must not empty';
	} else if (password !== confirmPassword) {
		errors.confirmPassword = 'Passwords must match';
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

module.exports.validateLoginInput = (username, password) => {
	const errors = {};

	if (username.trim() === '') {
		errors.username = 'Username must not be empty';
	}

	if (password.trim() === '') {
		errors.password = 'Password must not be empty';
	}

	return { errors, valid: Object.keys(errors).length < 1 };
};

module.exports.checkIfTaken = (currentUserInfo, username, email) => {
	const errors = {};

	const emailTaken = currentUserInfo.email === email;
	const usernameTaken = currentUserInfo.username === username;

	if (emailTaken && usernameTaken) {
		throw new UserInputError('Both username and email is taken', {
			errors: {
				email: 'This email is already taken',
				username: 'This username is already taken',
			},
		});
	} else if (usernameTaken) {
		throw new UserInputError('Username is taken', {
			errors: {
				username: 'This username is already taken',
			},
		});
	} else if (emailTaken) {
		throw new UserInputError('Email is taken', {
			errors: {
				email: 'This email is already taken',
			},
		});
	}
};
