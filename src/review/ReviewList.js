import { Link } from "react-router-dom";


function ReviewList({a}) {

    const styles = {
        wrapper: {
            display: '',
            flexDirection: 'row',
            border: '1px solid #4643f496',
            borderRadius: 16,
            padding: 8,
            margin: 8,
            background:'white',
        },

        contentContainer: {
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            position: "relative"
        },
        nameText: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 15
        },
        commentText: {
            color: 'black',
            fontSize: 16
        },
        countText: {
            fontSize: 13,
            color: '#666',
            position: "absolute",
            right: 20
        }

    };


    return (
        <>
           
            <div style={styles.wrapper}>

                <div style={styles.contentContainer}>
                    <Link to={`reviewdetail/${a.reviewIdx}`}>
                    <div style={styles.nameText}> {a.writer}</div>
                    <div style={styles.commentText}>{a.title}</div>
                    </Link>
                </div>
                
            </div>
        </>
    );
}

export default ReviewList;