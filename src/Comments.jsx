import React from 'react'
import { Card, CardBody, CardFooter } from '@chakra-ui/react'

export const Comments = ({ comments }) => {
    return (
        <>
            {comments.map(comment => {
                return (
                    <Card key={comment.id}>
                        <CardBody>{comment.message}</CardBody>
                        <CardFooter>{`${comment.name} on ${comment.created}`}</CardFooter>
                    </Card>
                )
            })}
        </>
    )
};
