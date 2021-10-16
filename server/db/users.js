const client = require('./client');

async function createUser({
    email,
    password,
    name,
    address,
    billingInfo
}) {
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(email, password, name, address, "billingInfo") 
            VALUES($1, $2, $3, $4, $5) 
            ON CONFLICT (email) DO NOTHING
            ON CONFLICT (name) DO NOTHING 
            RETURNING id, email, password, name, address, "billingInfo";
      `, [email, password, name, address, billingInfo]);

        return user;
    } catch (error) {
        throw error;
    }
}

async function getUser({
    email,
    password,
}) {
    if(!email || !password){
        return;
    }
    try {
     const user = await getUserByEmail(email);
     
     if(password === user.password){
         delete user.password
         return user
     }else{
         return;
     }
    } catch (error) {
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT id
            FROM users
            WHERE id = ${userId}
      `);

        if (!user) {
            return null
        }

        return user;
    } catch (error) {
        throw error;
    }
};

async function getUserByEmail(email) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE email=$1;
        `, [email]);

        return user;
    } catch (error) {
        throw error;
    }
};

async function getAllUsers() {
    try {
        const { rows : users } = await client.query(`
            SELECT *
            FROM users
        `)
        return users;
    } catch (err) {
        throw err;
    }
};

async function deleteUser(userId) {
    try {
        const {rows: [user]} = await client.query(`
            DELETE FROM users
            WHERE id=$1
            RETURNING *;
        `, [userId]);
        return user;
    } catch (error) {
        throw error;
    }
}

async function updateUserInfo ({ id, ...fields}) {

    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ user ]} = await client.query(`
        UPDATE users
        SET ${ setString }
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields));
      return user;
  
    } catch (error) {
      throw error;
    }
  };

async function updatePassword ({ id, password}) {

    if (!password) {
      return;
    }
  
    try {
      const { rows: [ user ]} = await client.query(`
        UPDATE users
        SET password = $1
        WHERE id=${id}
        RETURNING *;
      `, [password]);
      return user;
  
    } catch (error) {
      throw error;
    }
  };

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    deleteUser,
    updateUserInfo,
    updatePassword
}