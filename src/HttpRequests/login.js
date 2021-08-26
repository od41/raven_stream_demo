import axios from "../helpers/axios";


export default async function Login (data){

    try{
        let response = await axios(true).post('/path/to/login',data);
        if (response.status === 200 || response.status  === 404){
            return response;
        }else{
            return false;
        }
    }catch (exception){
        console.log(exception);
        return false;
    }
}
