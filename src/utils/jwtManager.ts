const encoding = process.env.TOKEN_JWT;
const jwt = require('jsonwebtoken');

type jwtClient = {
	uuid: number,
    username: string
}

export function createToken(payload: jwtClient){
	return jwt.sign(payload, encoding, { expiresIn: '8h' })
}

export function verifyToken(token: string): jwtClient{
	return jwt.verify(token, encoding) as jwtClient
}