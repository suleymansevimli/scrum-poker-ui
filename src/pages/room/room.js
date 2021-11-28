import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import Layout from "../../components/layout/layout";
import LoginForm from "../../components/auth/login/login-form/login-form";
import { authContext } from "../../hooks/useAuth";

/**
 * Kişilerin scrum room'larını görüntüler.
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Room = () => {
    // states
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    // router
    const { roomId } = useParams();

    // hooks
    const { authed } = useContext(authContext);

    /**
     * Room'a giriş yapıldığında burası çalışır.
     * Kişi login olmamış ise login sayfasına yönlendirilir.
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    useEffect(() => {
        if (!authed) {
            setMessage("Lütfen giriş yapınız..");
        } else {
            // login olunmuş ise loading false yapılır.
            setLoading(false);

            // mesaj kaldırılır.
            setMessage(null);
        }
    }, [roomId, authed]);

    return (
        <Layout>
            {loading
                ? <Text>{message}</Text>
                : <h1>Room {roomId}</h1>}
            {message && <LoginForm redirectTo={`/room/${roomId}`} />}
        </Layout>
    );
}

export default Room;