import { Box, Text } from "@chakra-ui/react";

const ScrumPokerCard = ({ isSelected, cardNumber, onSelected, isDisable=false }) => {

    const onClickCard = (cardNumber) => {
        if (cardNumber === 'coffee') {
            // ! TODO: show coffee
        }
    
        onSelected(isSelected ? null : cardNumber);
    }

    return (
        <Box
            w={150}
            h={220}
            borderRadius={8}
            bg={`${isSelected ? 'tomato.100' : 'tomato'}`}
            boxShadow={`${isSelected ? "0 0 10px 2px #2193fd" : "none"}`}
            display={"flex"}
            alignItems={"center"}
            _hover={{ bg: "black", color: "white" }}
            cursor={"pointer"}
            transition={"all 0.3s ease-in-out"}
            justifyContent={"center"}
            pointerEvents={isDisable ? "none" : "auto"}
            onClick={() => onClickCard(cardNumber)}
        >

            <Text fontFamily={"'Fugaz One', cursive"} fontSize={100} color={"white"}>
                {cardNumber === 'coffee' ? '☕' : cardNumber}
            </Text>

        </Box>
    )
};

export default ScrumPokerCard;