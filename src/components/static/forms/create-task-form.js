import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Textarea,
    Flex
} from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik';
import { isRequired } from '../../../utils/form/validation-utils';

/**
 * Create Task Form - Static
 * 
 * @param {Function} {onSubmit: Function} 
 * @returns JSX.Element
 */
const CreateTaskForm = ({ onSubmit }) => {
    // initial form values object
    const initialFormValues = {
        name: '',
        description: ''
    }

    // validations
    const validate = (type, value) => {
        switch (type) {
            case 'name':
                return isRequired(value, type);
            default:
                break;
        }
    }

    // when form submited 
    const onFormSubmit = (values, actions) => {
        actions.setSubmitting(false);
        onSubmit(values, actions);
    }

    return (
        <Formik
            initialValues={{ ...initialFormValues }}
            onSubmit={onFormSubmit}>

            {(props) => (
                <Form>
                    <Field name='name' validate={(value) => validate('name', value)}>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                <FormLabel htmlFor='name'>Task Name</FormLabel>
                                <Input {...field} id='name' placeholder='name' />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <Field name='description'>
                        {({ field, form }) => (
                            <FormControl mt={5} isInvalid={form.errors.description && form.touched.description}>
                                <FormLabel htmlFor='description'>Description</FormLabel>
                                <Textarea {...field} id='description' placeholder='description' />
                                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>

                    <Flex justifyContent={"flex-end"}>
                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={props.isSubmitting}
                            type='submit'>
                            Create
                        </Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    )
}

export default CreateTaskForm;