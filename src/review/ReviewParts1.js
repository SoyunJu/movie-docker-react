import ReviewParts from "./ReviewParts";
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ReviewParts1() {
    const [movie, setMovie] = useState([]);
    const [review,setReview] = useState([]);
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/movie/review/list/`,)
            .then(response => {
                console.log(response.data)
                setMovie(response.data.movieDto);
                setReview(response.data.reviewDto);
            })
            .catch(error => console.log(error));
    }, []);


   const a={
        contentContainer: {
            marginLeft: 5,
            display: 'flex',
            flexDirection: 'column',
            width: '1180px',
             margin: '0 auto',
            position: 'relative',
        }
    }

    const styles = {
        reviewParts: {
            textAlign: 'center'
        }
    };
    const abc ={
        marginLeft:'900px',
        width: '100px',
        height: '30px',
        background: '#8f86bb',
        color: 'snow',
        fontSize: '17px',
        borderRadius: '10px',
        marginTop: '50px',
        textAlign: 'center',
        lineHeight: '30px'
    }
    return (
        <>
      
            <div style={a.contentContainer}>
            <Link to="/reviewwrite" style={abc}className="reviewWrite-btn">리뷰 쓰기</Link>      
                <div className={styles.reviewParts}>
                    {movie.map((n) => <ReviewParts n={n} review={review}  />)}
                </div>
            </div>
        </>
    );
}

export default ReviewParts1;