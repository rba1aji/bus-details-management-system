import React from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi'
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';


const Voting = (props) => {

    const [votedType, setVotedType] = useState("zero");
    const [voteColor, setVoteColor] = useState("black");
    const [currentVotes, setCurrentVotes] = useState(props.item.votes);

    useEffect(() => {
        switch (votedType) {
            case "zero":
                setVoteColor("black");
                setCurrentVotes(props.item.votes);
                break;
            case "up":
                setVoteColor("green");
                setCurrentVotes(currentVotes + 1);
                break;
            case "down":
                setVoteColor("red");
                setCurrentVotes(currentVotes - 1);
                break;
        }
    }, [votedType])

    const doVote = useCallback((id, voteType) => {
        // console.log(voteType, votedType);
        if (votedType === voteType) return;

        axios({
            method: 'put',
            url: `https://localhost:7252/api/BusDetails/${id}`,
            data: voteType,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res);

                if ((votedType === "up" && voteType === "down") || (votedType === "down" && voteType === "up"))
                    setVotedType("zero");
                if (votedType === "zero") {
                    setVotedType(voteType);
                }

            })
            .catch((err) => {
                console.log(err.message);
            })

    }, [setVotedType, votedType]);
    return (
        <table>
            <tbody className='td-center voting-btn'>
                <tr><td><button type="button" variant='light' onClick={() => {
                    doVote(props.item.id, "up")
                }}>
                    <BiUpvote size={25} />
                </button></td></tr>
                <tr><td className='h4' style={{ color: voteColor }}>{currentVotes}</td></tr>
                <tr><td><button type="button" variant='light' onClick={() => {
                    doVote(props.item.id, "down")
                }}>
                    <BiDownvote size={25} />
                </button></td></tr>
            </tbody>
        </table>

    );
}

export default Voting;