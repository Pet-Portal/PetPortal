import PostUserList from "../components/posts/PostUserList";
import MainLayout from '../components/layouts/MainLayout';

const MyPosts = () => {
    return (
            <MainLayout
                title="Your post list"
                bgImage="/assets/img/photo-1606011334315-025e4baab810.jpg"
            >
            <PostUserList />
            </MainLayout>    
    )
}

export default MyPosts;
