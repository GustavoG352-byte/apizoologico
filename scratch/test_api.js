async function test() {
    try {
        console.log('--- Testing Animals GET ---');
        const resAnimals = await fetch('http://localhost:3000/api/animals');
        const animals = await resAnimals.json();
        console.log('Animals count:', animals.length);

        console.log('\n--- Testing User Signup ---');
        const resSignup = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario: 'admin' + Date.now(),
                correo: 'admin' + Date.now() + '@zoo.com',
                clave: 'password123'
            })
        });
        const signup = await resSignup.json();
        console.log('Signup success:', signup.usuario);

        console.log('\n--- Testing User Login ---');
        const resLogin = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                correo: signup.correo,
                clave: 'password123'
            })
        });
        const login = await resLogin.json();
        console.log('Login success! Auth:', login.auth, 'Token:', login.token ? login.token.substring(0, 10) + '...' : 'NONE');

        console.log('\n--- Testing User CRUD (GET ALL) ---');
        const resUsers = await fetch('http://localhost:3000/api/users');
        const users = await resUsers.json();
        console.log('Users count:', users.length);

    } catch (error) {
        console.error('Error during test:', error);
    }
}

test();
