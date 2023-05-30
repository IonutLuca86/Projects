/* eslint-disable no-prototype-builtins */
export default function ImageCheck(props) {
   
    if(props.image === "" || !props.hasOwnProperty("image"))
        return false
    else
        return true

}