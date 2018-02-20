const signinHandler = (req,res, db, bcrypt)=>{
	const {email, password} = req.body;

	if(!email||!password){
		res.status(400).json('incorrect form submission');
	}
	db.select('email','hash').from('login')
		.where('email', '=', req.body.email)
		.then(data =>{
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);

			if(isValid){
				return db.select('*').from('users').where('email', '=', req.body.email)
				.then(user=>{
					res.json(user[0])
				})
				.catch(err=>{
					res.status(400).json('unable to get user')
				})
			}else{		
			res.status(400).json('Unable to log in');
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
	
}

module.exports = {
	signinHandler:signinHandler
}