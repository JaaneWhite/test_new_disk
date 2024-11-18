import axios from "axios";

export async function test() {
    try {
        let logData = {
            "email": "user@example.com",
            "password": "1234",
        }
        const response = await apiLogin(logData);
        console.log(response)
    } catch (e) {
        console.log('error')
        console.log(e.status)
    }

}

export async function test2() {
    const response = await axios.post(`https://dist.nd.ru/api/auth`, {
        "email": "user@example.com",
        "password": "12345",
    });
    console.log(response)
}


export async function register(regData) {
    try {
        const response = await axios.post(`https://dist.nd.ru/api/reg`, regData)

    } catch (e) {
        console.log(e.status)
    }
}
export async function apiLogin(logData) {
    console.log('api login')
    try {
        console.log(logData);

        const response = await axios.post(`https://dist.nd.ru/api/auth`, logData)
        return response
    } catch (e) {
        console.log(e)
        /*
        return {
            type: 'error',
            message: e.response.data.message,
            status: e.response.status,
            fullText: e
        }

         */
    }


    /*
    try {
        const response = await axios.post(`https://dist.nd.ru/api/auth`, logData)
        console.log(response)
    } catch (e) {
        console.log('catchedError', e)
    }

     */
}