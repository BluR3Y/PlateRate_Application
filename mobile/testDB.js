const fetch = require('node-fetch');


function connectDB() {
    console.log('called');
    fetch(`http://localhost:5000/public`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'rey@gmail.com',
            password: 'password@1234',
        })
    })
    .then(async res => {
        try {
            const jsonRes = await res.json();
            if (res.status !== 200) {
                console.log('is err', jsonRes)
            } else {
                console.log('is not err');
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    })
}

function getUser() {
    fetch(`http://localhost:5000/getuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'rey@gmail.com',
            password: 'password@1234',
        })
    })
    .then(async res => {
        try {
            const jsonRes = await res.json();
            console.log(jsonRes);
        }catch(err) {
            console.log(err);
        }
    })
}
getUser();