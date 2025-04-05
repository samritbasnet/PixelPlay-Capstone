import bcrypt from 'bcryptjs';

const hash = bcrypt.hashSync('samrit123', 10);
console.log('Hashed password:', hash);