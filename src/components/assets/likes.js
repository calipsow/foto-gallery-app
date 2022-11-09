




export default async function Like( params ){
    let url = ''
    if( params.liked ){

        url = 'http://localhost:3588/api/user/authenticated/photo/like?photo_id='+params.photo_id+'&token='+params.token

    } else {
        url = 'http://localhost:3588/api/user/authenticated/photo/like?photo_id='+params.photo_id+'&token='+params.token

    }

    return await fetch(url).then(res => res.json()).then( res => res.status ).catch(err => {console.log(err); return false})
}