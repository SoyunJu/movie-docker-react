import ReviewList from "./ReviewList";
import { useEffect } from "react";
const styles = {
   
    wrapper: {
        textAlign: 'left',
        display: 'inline-block',
        boxShadow: '0px 0px 10px #4643f496',
        borderRadius: 16,
        padding: '20px 8px',
        margin: ' 40px 180px' ,
        width: '800px',
        height: 'auto',
        background: 'white',

    },

        movieText: {
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Noto Sans Korea'
    }
}
function ReviewParts({review,n}) {
  
    return (
        <>
            <div style={styles.wrapper}>

                <div style={styles.movieText}>{n.title}</div>
                {
                   
                    review.map(a => {
                        // console.log(a.movieIdx);
                        console.log(a)
                        // console.log(n.movieIdx)
                        if(n.movieIdx == a.movieIdx){
                            return(<ReviewList a={a}/>)
                    }
                })
                }
            </div>

        </>
    );
}

export default ReviewParts;