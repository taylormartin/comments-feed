import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'

export const Comments = ({ comments }) => {
    return (
        <>
            {comments.map(comment => {
                return (<Card>
                    <CardBody>
                        <Text>{comment.message}</Text>
                    </CardBody>
                </Card>)
            })}
        </>

    )
};
