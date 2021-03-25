export const post = async(endPoint, content) => {
    let url = `http://localhost:5000/api/v1/${endPoint}`;
    try{
        const result = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({...content})
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}

export const patch = async(endPoint, content) => {
    let url = `http://localhost:5000/api/v1/${endPoint}`;
    try{
        const result = await fetch(url, {
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({...content})
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}

export const get = async(endPoint) =>{
    let url = `http://localhost:5000/api/v1/${endPoint}`;
    try{
        const result = await fetch(url, {
            method: 'GET',
            credentials:'include',
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}
export const remove = async(endPoint) =>{
    let url = `http://localhost:5000/api/v1/${endPoint}`;
    try{
        const result = await fetch(url, {
            method: 'DELETE',
            credentials:'include',
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}


export const postWithFile = async(endPoint, content) => {
    let url = `http://localhost:5000/api/v1/${endPoint}`;
    try{
        const result = await fetch(url, {
            method: 'POST',
            credentials:'include',
            body:content
        });
        const data = await result.json();
        return [result, data];
    }catch(err){
        console.log(err);
    }
}