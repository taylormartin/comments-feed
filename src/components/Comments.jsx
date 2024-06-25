import React from 'react'
import { Avatar, Card, CardBody, Stack } from '@chakra-ui/react'
import { DateTime } from 'luxon';

export const Comments = ({ comments }) => {
    return (
        <>
            {comments.map(comment => {
                const date = DateTime.fromSQL(comment.created).toLocaleString(DateTime.DATETIME_MED);
                return (
                    <Card role="article" key={comment.id} aria-describedby={`comment-${comment.id}`}>
                        <CardBody>
                            <div role="heading" aria-level="2" className="avatar-name">
                                <Avatar src='https://bit.ly/broken-link' alt={`Avatar of ${comment.name}`} />
                                <strong>{comment.name}</strong>
                            </div>
                            <div className="message" id={`comment-${comment.id}`}>{comment.message}</div>
                            <div className="message-time" aria-label="Comment date">{date}</div>
                        </CardBody>
                    </Card>
                )
            })}
        </>
    )
};
