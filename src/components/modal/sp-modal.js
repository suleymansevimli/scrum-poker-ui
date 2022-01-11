import {
    Modal,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    Button
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

/**
 * Scrum Poker Modal Component
 * 
 * @returns 
 */
const SPModal = ({onClose, isOpen, children, isCentered, modalTitle, closeLabel, size}) => {

    return (
        <Modal onClose={onClose} size={size} isOpen={isOpen} isCentered={isCentered}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {modalTitle}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>
                        {closeLabel}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SPModal;

SPModal.propTypes = { 
    isOpen: PropTypes.bool.isRequired, 
    children: PropTypes.node.isRequired, 
    isCentered: PropTypes.bool, 
    modalTitle: PropTypes.string.isRequired, 
    closeLabel: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    size: PropTypes.string
}

SPModal.defaultProps = {
    closeLabel: 'Close',
    isCentered: true,
    size: "xl"
}