import axios, { AxiosError } from "axios";


function triggerSuccessEvent(response, event) {

    let data = response.data.data ? { ...response.data, status: response.status } : { data: response.data, status: response.status }
    
    if(event.onSuccess) {
        return event.onSuccess(data);
    }
    
    return data;
}
function triggerFailureEvent (error, event) {

    if( error instanceof AxiosError && event.onError ){
        return event.onError({...error.response.data, status: error.response.status });    
    }
    return error;
}

export const router  = {

    get : async (url, events = {}) => {

        try {
            let response = await axios.get(url);  

            return triggerSuccessEvent(response, events);

        } catch (error) {

            return triggerFailureEvent(error, events);
            
        }
    },

    post : async (url, data, events = {}) => {

        try {
            let response = await axios.post(url, data);  

            return triggerSuccessEvent(response, events);

        } catch (error) {

            return triggerFailureEvent(error, events);
            
        }
    },
    postForm : async (url, data, events = {}) => {

        try {

            let response = await axios.post(url, data, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });  

            return triggerSuccessEvent(response, events);

        } catch (error) {

            return triggerFailureEvent(error, events);
            
        }
    },
    put : async (url, data, events = {}) => {

        try {
            let response = await axios.put(url, data);  

            return triggerSuccessEvent(response, events);

        } catch (error) {

            return triggerFailureEvent(error, events);
            
        }
    },
}