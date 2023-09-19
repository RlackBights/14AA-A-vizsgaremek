import { useState } from "react";
import { useCookies } from "react-cookie";


export default states => {
    const [cookies, setCookies, getCookies] = useCookies(["user"])
    const [key, setKey] = useState(0);
    const [save1, setSave1] = useState(save1data);
    const [save2, setSave2] = useState(save2data);
    const [save3, setSave3] = useState(save3data);

    return {
        cookies,
        key, setKey,
        save1, setSave1,
        save2, setSave2,
        save3, setSave3
    }
}