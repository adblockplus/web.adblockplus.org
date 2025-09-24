
export class EmailHelper {

	static async createNewEmail(emailString) {
		const email = emailString + Date.now() + '@email.com';
		return email;
	}

}
