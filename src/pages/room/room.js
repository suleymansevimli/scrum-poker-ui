import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Layout from "../../components/layout/layout";
import useAuth from "../../hooks/useAuth";

/**
 * Kişilerin scrum room'larını görüntüler.
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Room = () => {
    // states
    const [loading,setLoading] = useState(true);
    const [message,setMessage] = useState(null);

    // router
    const { roomId } = useParams();
    const navigate = useNavigate();

    // hooks
    const { authed } = useAuth();

    /**
     * Room'a giriş yapıldığında burası çalışır.
     * Kişi login olmamış ise login sayfasına yönlendirilir.
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    useEffect(() => {
        if(!authed) {
            setMessage("Login sayfasına yönlendiriliyorsunuz...");
            /**
             * "la noluyo" tepkisini almamak için setTimeout eklendi :) 
             * @author [suleymansevimli](https://github.com/suleymansevimli)
             * */ 
            setTimeout(() => {
                navigate("/", {state: {from: `/room/${roomId}`}});
            },1000);
        } else {
            // login olunmuş ise loading false yapılır.
            setLoading(false);

            // mesaj kaldırılır.
            setMessage(null);
        }
    }, [roomId,authed]);

    return (
        <Layout>
            {loading 
                ? <Text>Please wait</Text> 
                : <h1>Room {roomId}</h1>}
            {message && <Text>{message}</Text>}
        </Layout>
    );
}

export default Room;