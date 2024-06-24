import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text } from '@chakra-ui/react'

export const Comments = ({ comments }) => {
    return (
        <>
            {comments.map(comment => {
                return (
                    <Card key={comment.id}>
                        <CardHeader>{comment.created}</CardHeader>
                        <CardBody>
                            <Text>{comment.message}</Text>
                        </CardBody>
                        <CardFooter>{comment.name}</CardFooter>
                    </Card>
                )
            })}
        </>

    )
};
