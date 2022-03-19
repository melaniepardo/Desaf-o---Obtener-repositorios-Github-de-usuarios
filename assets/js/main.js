// ejercicio  propuesto  7
const isCorrect = false;
const answer = (data) => {
    return new Promise((resolve, reject) => {
        if (!data.isCorrect) {// si la respuesta (data) es distinta entonces sera incorrecta segun la promesa realizada
            reject('La respuesta no es correcta :(')
        } else {
            resolve('Correcto!')
        }
    })// si se ejecuta el reject se ejecuta el catch y si se ejecuta el resolve se ejecuta el then
}
answer({ isCorrect })
    .then(resp => {// no se ejecutra esto pq se esta declarando un error previo
        console.log(resp);
    })
    .catch(err => {
        console.log(err);
    })

//Ejercicio guiado: Try… catch.. finally
const json = {
    "articles": [{// array de objetos
        "id": "1",
        "title": "Mi primer artículo",
        "body": "Nunca había escrito un artículo."
    }, {
        "id": "2",
        "title": "Mi segundo artículo",
        "body": "Este es mi segundo artículo."
    }]
}
try {
    console.log(json.articles[0].title);
    console.log(json.articles[1].title);
    console.log(json.articles[2].title);// este indice no existe entonces arroja error
}
catch (e) {
    console.log('Errores');
    console.log(e.name, e.message);
}
finally {//  esto siempre se ejecuta
    console.log('Finalizado el try...catch. Este mensaje aparece siempre.');
}
//Ejercicio guiado: Depurando errores
function trace() {
    try {
        throw new Error('miErrorpersonalizado');//declara error
    }
    catch (e) {//(e)  se refiere al error
        console.log(e.stack);
    }
}
function b() {// le pasa argumentoss y emite la pila
    trace();
}
function a() {
    b(1, 'texto', undefined, {}); //no le pasa los argumentos
}
a();

// Ejercicio guiado: Publicaciones de un usuario, utilizando la información
const baseUrl = 'https://jsonplaceholder.typicode.com';
const request = async (url) => {
    const results = await fetch(url)
    const response = await results.json()
    return response;
}
const getUser = async (id) => {
    const url = `${baseUrl}/users/${id}`;
    return request(url);
}
const getPosts = async (id) => {
    const url = `${baseUrl}/posts?userId=${id}`;
    return request(url);
}
const userId = 1;

Promise.all([getUser(userId), getPosts(userId)])
    .then(resp => {
        const posts = resp[1];
        const user = resp[0];
        const name = user.name;
        const address = user.address;
        const email = user.email;
        const city = address.city;
        console.log('name', name);
        console.log('address', address.suite, address.street);
        console.log('geo', `${address.geo.lat},${address.geo.lng}`);
        console.log('email', email);
        console.log('city', city);
        posts.forEach(element => {
            const title = element.title;
            const body = element.body;
            console.log('title', title);
            console.log('body', body);
        });
    })
    .catch(err => console.log('err', err))